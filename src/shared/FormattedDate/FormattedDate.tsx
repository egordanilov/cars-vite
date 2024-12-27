import cn from "./FormattedDate.module.scss";
import {dateFormatter} from "./utils/dateFormatter";

export const FormattedDate = ({date}: {date: string}) => {
    return (
        <div className={cn.date_wrapper}>
            {dateFormatter(date)}
        </div>
    )
}
