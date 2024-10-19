import { Pagination } from '@src/types/common-type';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { LastIcon } from '../icons/LastIcon';
import { NextIcon } from '../icons/NextIcon';
import { FirstIcon } from '../icons/FirstIcon';
import { PreviousIcon } from '../icons/PreviousIcon';

type Props = {
    pagination: Pagination
    goToPage: (page: number) => void
}
export const Pager = ({ pagination, goToPage }: Props) => {

    const [numbers, setNumbers] = useState([1]);

    const generateNumbers = (start: number, end: number) => {
        let newNumbers = [];
        for (let i = start; i < end; i++) {
            newNumbers.push(i);
        }
        setNumbers(newNumbers);
    }

    const handlePageChange = (page: number) => {
        console.log(page);
        console.log(pagination);
        if (page === pagination.page || page < 0 || (page + 1) > pagination.totalPage) {
            return false;
        }

        goToPage(page)
    }

    useEffect(() => {
        console.log(pagination);

        let start = 0;
        let end = 0;

        if (pagination.totalPage <= 5) {
            end = pagination.totalPage;
        } else if (pagination.page < 3) {
            end = 5;
        } else if (pagination.totalPage - pagination.page < 3) {
            start = pagination.totalPage - 5;
            end = pagination.totalPage
        } else {
            start = pagination.page - 2;
            end = pagination.page + 3;
        }

        generateNumbers(start, end);
    }, [pagination])

    return (
        <>
            <div className='pagination'>
                <button onClick={() => handlePageChange(0)} disabled={pagination.page === 0}><FirstIcon /></button>
                <button onClick={() => handlePageChange(pagination.page - 1)} disabled={pagination.page === 0}><PreviousIcon /></button>
                <ul>
                    {
                        numbers.map((num, index) => {
                            return <li key={index}>
                                <button onClick={() => handlePageChange(num)} className={clsx(pagination.page === num && "active")}>{num + 1}</button>
                            </li>
                        })
                    }
                </ul>
                <button onClick={() => handlePageChange(pagination.page + 1)} disabled={pagination.page === (pagination.totalPage - 1)}><NextIcon /></button>
                <button onClick={() => handlePageChange(pagination.totalPage - 1)} disabled={pagination.page === (pagination.totalPage - 1)}><LastIcon /></button>
            </div>
        </>
    )
}
