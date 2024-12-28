import {useEffect, useState} from 'react';
import { useParams } from "react-router";
import HTMLRenderer from "../../NewsListItem/HTMLRenderer/HTMLRenderer";
import {FormattedDate} from "../../shared/FormattedDate/FormattedDate";
import cn from './ArticlePage.module.scss';

const ArticlePage = () => {

    let params = useParams();
// params["*"] will contain the remaining URL after files/
    let filePath = params["*"];

    const { segment, newsUrl } = useParams<{ segment: string, newsUrl: string }>();
    const [data, setData] = useState<{ title: string; publishedDate: string; titleImageUrl: string; text: string } | null>(null);
    const [error, setError] = useState(null);

    let fullFetchUrl = `https://webapi.autodoc.ru/api/news/item/` + filePath;


    useEffect(() => {




        fetch(fullFetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // or response.text() if you expect a plain text response
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                setError(error.toString());
            });
    }, [segment, newsUrl]);

    return <div className={cn.wrapper}>
        {error && <p>Error: {error}</p>}
        {data ? (
            <div className="article-page-wrapper">
                <h1>{data.title}</h1>
                <FormattedDate date={data.publishedDate} />
                <img className={cn.image} src={data.titleImageUrl} alt={data.title} />
                <HTMLRenderer rawHTML={data.text} />
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
};

export default ArticlePage;