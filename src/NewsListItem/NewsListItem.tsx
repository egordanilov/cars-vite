import cn from './NewsListItem.module.scss';
import {dateFormatter} from "../shared/FormattedDate/utils/dateFormatter";
import {Link} from "react-router";
import {trimString} from "./utils/trimUrlString";
import {FormattedDate} from "../shared/FormattedDate/FormattedDate";

interface NewsListItemProps {
    title: string;
    url: string;
    titleImageUrl: string;
    publishedDate: string;
}

const NewsListItem = (props: NewsListItemProps) => {
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

export default NewsListItem;