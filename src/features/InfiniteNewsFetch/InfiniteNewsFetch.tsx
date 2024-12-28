import classnames from './InfiniteNewsFetch.module.scss';
import {NewsListItem} from "@/shared";
// @ts-ignore
import type {IArticleFromApi} from "@/entities";
import {useInfiniteNewsFetch} from "../../entities";


export const InfiniteNewsFetch: React.FC = () => {
    const { data, loading } = useInfiniteNewsFetch()

    return (
        <div className={classnames.infiniteNewsWrapper}>
            {data.map((item: IArticleFromApi) => (
                <NewsListItem key={item.id} title={item.title} titleImageUrl={item.titleImageUrl} publishedDate={item.publishedDate} url={item.url} />
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
};
