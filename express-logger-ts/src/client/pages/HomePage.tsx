import { Pageable, Pagination, RequestParams } from '@src/types/common-type';
import { RequestInfo } from '@src/types/request-info';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { RequestInfoList } from '../components/RequestInfoList';
import { SearchForm } from '../components/SearchForm';
import { useAlertStore } from "../hooks/alert-store";
import * as requestInfoService from "../services/request-info-service";
import { Pager } from '../components/Pager';


export const HomePage = () => {

    const intl = useIntl();

    const location = useLocation();

    const [result, setResult] = useState<Pageable<RequestInfo>>();

    const [pagination, setPagination] = useState<Pagination>({ total: 0, totalPage: 0, page: 0, pageSize: 0 });

    const goToPage = (page: number) => {
        loadRequestInfos({ page })
    };

    const { alert } = useAlertStore();

    const loadRequestInfos = (params: RequestParams) => {
        setResult(undefined);
        requestInfoService.find(params)
            .then(({ status, data }) => {
                setTimeout(() => {
                    if (status === 200) {
                        console.log(data);
                        setResult(data);
                        setPagination(data.pagination);
                    }
                }, 500);
            }).catch(err => {
                console.error(err);
                const error = err as any;

                if (error.response?.data?.code) {
                    alert.error(intl.formatMessage({ id: error.response.data.code }))
                } else {
                    alert.error(error.response.data.message || error.message);
                }
            });
    }

    useEffect(() => {
        loadRequestInfos({});
    }, [location]);

    return (
        <>
            <SearchForm />
            <RequestInfoList result={result} />
            <Pager pagination={pagination} goToPage={goToPage} />
        </>
    )
}
