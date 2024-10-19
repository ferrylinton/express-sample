import { useIntl } from "react-intl";

export const SearchForm = () => {

    const intl = useIntl();

    return (
        <div className="search-form">
            <form method="get" action="/" autoComplete="off" name="search-form">
                <input type="text" name='keyword' autoComplete='off'  maxLength={50} placeholder={intl.formatMessage({id: "keyword"})}/>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
        </div>
    )
}
