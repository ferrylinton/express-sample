import { useEffect, useState } from 'react';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { Todo } from '../../types/todo-type';
import { useAlertStore } from "../hooks/alert-store";
import { useConfirmStore } from '../hooks/confirm-store';
import * as todoService from "../services/todo-service";

export const DetailPage = () => {

  const intl = useIntl();

  const { showConfirm } = useConfirmStore();

  const {alert} = useAlertStore();

  const { id } = useParams();

  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    loadTodo(id);
  }, [id]);

  const loadTodo = (id: string | undefined) => {
    todoService.findById(id as string)
      .then(({ status, data }) => {

        setTimeout(() => {
          if (status === 200) {
            setTodo(data);
          }
        }, 500);

      }).catch(err => {
        console.error(err);
        const error = err as any;

        if (error.response?.data?.code) {
          alert.error(intl.formatMessage({ id: error.response.data.code }))
        } else {
          alert.error(error.message);
        }
      });
  }

  const onClickDelete = () => {
    if (todo) {
      showConfirm(intl.formatMessage({ id: "deleteData" }), todo, true);
    }
  }

  return (
    <>
      <div className="todo-detail">
        <table>
          {
            !todo && <tbody>
              {
                ["id", "task", "done", "createdAt", "updatedAt"].map((txt) => {
                  return <tr key={txt}>
                    <th>
                      <FormattedMessage id={txt} />
                    </th>
                    <td>
                      <div className="skeleton-line"></div>
                    </td>
                  </tr>
                })
              }
            </tbody>
          }
          {
            todo && <tbody>
              <tr>
                <th><FormattedMessage id="id" /></th>
                <td>{todo.id}</td>
              </tr>
              <tr>
                <th><FormattedMessage id="task" /></th>
                <td className="break">{todo.task}</td>
              </tr>
              <tr>
                <th><FormattedMessage id="done" /></th>
                <td>{intl.formatMessage({ id: todo.done ? "yes" : "no" })}</td>
              </tr>
              <tr>
                <th><FormattedMessage id="createdAt" /></th>
                <td><FormattedDate value={new Date(todo.createdAt)} /></td>
              </tr>
              <tr>
                <th><FormattedMessage id="updatedAt" /></th>
                <td>{todo.updatedAt ? intl.formatDate(todo.updatedAt) : '-'}</td>
              </tr>
            </tbody>
          }
        </table>
      </div>

      <section className="buttons">
        <Link to={"/"} className='btn btn-secondary'>
          <FormattedMessage id="back" />
        </Link>
        {todo && <button type="button" className="btn btn-danger" onClick={onClickDelete}>
          <FormattedMessage id="delete" />
        </button>}

      </section>

    </>
  )
}
