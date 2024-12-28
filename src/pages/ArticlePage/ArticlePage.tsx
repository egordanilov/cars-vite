import { useEffect, useState } from "react";
import { useParams } from "react-router";
import cn from "./ArticlePage.module.scss";
import { FormattedDate, HTMLRenderer } from "@/shared";
// @ts-ignore
import type { IArticleData} from "@/entities";
// @ts-ignore
import {fetchArticle} from "@/entities";


const ArticlePage = () => {
    const { "*": urlPath } = useParams<{ "*": string }>();
    const [data, setData] = useState<IArticleData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fullFetchUrl = `https://webapi.autodoc.ru/api/news/item/${urlPath}`;
        setLoading(true);
        setError(null);

        fetchArticle(fullFetchUrl)
            .then((fetchedData: IArticleData) => {
                setData(fetchedData);
            })
            .catch((error: unknown) => {
                console.error("Fetching error:", error); // Log the error for debugging
                setError("An error occurred while loading the article. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [urlPath]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!data) {
        return <p>No article data available.</p>;
    }

    return (
        <div className={cn.wrapper}>
            <div className="article-page-wrapper">
                <h1>{data.title}</h1>
                <FormattedDate date={data.publishedDate} />
                <img className={cn.image} src={data.titleImageUrl} alt={data.title} />
                <HTMLRenderer rawHTML={data.text} />
            </div>
        </div>
    );
};

export default ArticlePage;