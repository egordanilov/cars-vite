import  { useState, useEffect, useCallback } from 'react';
import classnames from './InfiniteNewsFetch.module.scss';
import {NewsListItem} from "@/shared";
// @ts-ignore
import type {IArticleFromApi} from "@/entities";


export const InfiniteNewsFetch: React.FC = () => {
    const [data, setData] = useState<IArticleFromApi[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://webapi.autodoc.ru/api/news/${page}/10`);
            const result = await response.json();
            setData(prevData => [...prevData, ...result.news]);
            setHasMore(result.news.length > 0);
            setLoading(false);
            console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500 && hasMore && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    }, [loading, hasMore]);

    //see if there are any news created by user stored in localStorage
    useEffect(() => {
        const storedData = localStorage.getItem('myDataArray');

        if (storedData != null && storedData !== '') {
            const dataArray = JSON.parse(storedData);
            console.log(dataArray);
            setData(prevData => [...dataArray, ...prevData]);
        }
        console.log('fired once')
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className={classnames.infiniteNewsWrapper}>
            {data.map((item: IArticleFromApi) => (
                <NewsListItem key={item.id} title={item.title} titleImageUrl={item.titleImageUrl} publishedDate={item.publishedDate} url={item.url} />
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
};
