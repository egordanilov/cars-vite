import { useState, useEffect, useCallback } from 'react';
// @ts-ignore
import type { IArticleFromApi } from "@/entities";

export const useInfiniteNewsFetch = () => {
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

    // Check localStorage for user-created news
    useEffect(() => {
        const storedData = localStorage.getItem('myDataArray');

        if (storedData != null && storedData !== '') {
            const dataArray = JSON.parse(storedData);
            console.log(dataArray);
            setData(prevData => [...dataArray, ...prevData]);
        }
        console.log('fired once');
    }, []);

    const handleScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500 && hasMore && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    }, [loading, hasMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return { data, loading, hasMore };
};