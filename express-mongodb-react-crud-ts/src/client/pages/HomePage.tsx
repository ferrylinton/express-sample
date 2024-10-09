import * as todoService from "../services/todo-service";
import { Todo } from '../../types/todo-type';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { TodoItem } from '../components/TodoItem';
import { useAlertStore } from "../hooks/alert-store";

export const HomePage = () => {

    const intl = useIntl();

    const location = useLocation();

    const [todoes, setTodoes] = useState<Todo[]>();

    const [total, setTotal] = useState<number>(0);

    const {alert} = useAlertStore();

    const loadTodoes = () => {
        todoService.find()
            .then(({ status, data }) => {
                setTimeout(() => {
                    if (status === 200) {
                        setTotal(data.total);
                        setTodoes(data.todoes);
                    }
                }, 500);
            }).catch(err => {
                console.error(err);
                const error = err as any;

                if(error.response?.data?.code){
                    alert.error(intl.formatMessage({id : error.response.data.code}))
                }else{
                    alert.error(error.message);
                }
            });
    }

    useEffect(() => {
        loadTodoes();
    }, [location]);

    return (
        <>
            <div className="todo-list-toolbar">
                <div className="total">
                    <FormattedMessage id="total" values={{ total }} />
                </div>
                <Link to={"/add"} className="btn btn-primary">
                    <FormattedMessage id="newTask" />
                </Link>
            </div>
            <div className="todo-list">
                <table>
                    <tbody>
                        {
                            todoes && todoes.map((todo, index) => {
                                return <TodoItem
                                    key={index}
                                    index={index}
                                    todo={todo}
                                />
                            })
                        }
                        {
                            !todoes && ["1", "2", "3"].map((num) => {
                                return <tr key={num}>
                                    <td>{num}</td>
                                    <td>
                                        <span className="skeleton-line"></span>
                                        <em className="skeleton-line" style={{ width: 100 }}></em>
                                    </td>
                                    <td>
                                        <div className="action">
                                            <div className="skeleton-square"></div>
                                            <div className="skeleton-square"></div>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
