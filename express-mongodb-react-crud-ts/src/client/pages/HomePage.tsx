import * as todoService from "../services/todo-service";
import { Todo } from '../../types/todo-type';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { TodoItem } from '../components/TodoItem';

export const HomePage = () => {

    const location = useLocation();

    const [todoes, setTodoes] = useState<Todo[]>();

    const [total, setTotal] = useState<number>(0);

    const loadTodoes = () => {
        todoService.find()
            .then(({ status, data }) => {
                setTimeout(() => {
                    if (status === 200) {
                        setTotal(data.total);
                        setTodoes(data.todoes);
                    }
                }, 500);
            }).catch(error => {
                console.log(error);
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
