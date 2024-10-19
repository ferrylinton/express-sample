import { Pageable } from '@src/types/common-type'
import { RequestInfo } from '@src/types/request-info'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { RequestInfoItem } from './RequestInfoItem'

type Props = {
    result?: Pageable<RequestInfo>
}

type SortType = {
    column: string,
    isAsc: boolean
}

export const RequestInfoList = ({ result }: Props) => {

    const [sorted, setSorted] = useState<SortType>({
        column: "createdAt",
        isAsc: false
    });

    const getColumnClass = (column: string) => {
        if (sorted.column === column) {
            return `sort ${sorted.isAsc ? "asc" : "desc"}`;
        }

        return "sort";
    }

    const handleColumnClick = (column: string) => {
        if (sorted.column === column) {
            setSorted({
                column,
                isAsc: !sorted.isAsc
            })
        } else {
            setSorted({
                column,
                isAsc: true
            })
        }

    }

    return (
        <>
            <div className="responsive-table">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>
                                <div className={getColumnClass("createdAt")} onClick={() => handleColumnClick("createdAt")}>
                                    <FormattedMessage id="createdAt" />
                                </div>
                            </th>
                            <th>
                                <div className={getColumnClass("app")} onClick={() => handleColumnClick("app")}>
                                    <FormattedMessage id="app" />
                                </div>
                            </th>
                            <th>
                                <div className={getColumnClass("ip")} onClick={() => handleColumnClick("ip")}>
                                    <FormattedMessage id="createdAt" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            result && result.data.map((reqestInfo, index) => {
                                const page =  result.pagination.page || 0;
                                const pageSize = result.pagination.pageSize || 1;
                                return <RequestInfoItem
                                    key={index}
                                    index={page * pageSize + index + 1}
                                    reqestInfo={reqestInfo}
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
