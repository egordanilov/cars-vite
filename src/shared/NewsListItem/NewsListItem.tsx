import cn from './NewsListItem.module.scss';
import {Link} from "react-router";
import {FormattedDate} from "../index";

interface NewsListItemProps {
    title: string;
    url: string;
    titleImageUrl: string;
    publishedDate: string;
}

export const NewsListItem = (props: NewsListItemProps) => {
    return (
        <Link to={props.url}>
            <div className={cn.newsCardWrapper}>
                <img src={props.titleImageUrl} alt={props.title} className={cn.image}/>
                <FormattedDate date={props.publishedDate} />
                <p className={cn.card_title}>{props.title}</p>
            </div>
        </Link>
    );
};
