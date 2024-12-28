import {useEffect, useState} from 'react';
import { useParams } from "react-router";
import cn from './ArticlePage.module.scss';
import {FormattedDate, HTMLRenderer} from "@/shared";
// @ts-ignore
import {fetchArticle} from "@/entities";


const ArticlePage = () => {

    let params = useParams();
// params["*"] will contain the remaining URL after files/
    let filePath = params["*"];

    const { segment, newsUrl } = useParams<{ segment: string, newsUrl: string }>();
    const [data, setData] = useState<{ title: string; publishedDate: string; titleImageUrl: string; text: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    let fullFetchUrl = `https://webapi.autodoc.ru/api/news/item/` + filePath;

    useEffect(() => {
        fetchArticle(fullFetchUrl)
            .then((data: { title: string; publishedDate: string; titleImageUrl: string; text: string }) => {
                setData(data);
            })
            .catch((error: unknown) => {
                if (error) {
                    setError((error as Error).toString());
                }
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