import { Todo } from '../../types/todo-type';
import clsx from 'clsx';
import { FormattedDate, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useConfirmStore } from '../hooks/confirm-store';
import { CheckIcon } from '../icons/CheckIcon';
import EyeIcon from '../icons/EyeIcon';
import { useAlertStore } from '../hooks/alert-store';

type Props = {
    index: number,
    todo: Todo
}

export const TodoItem = ({ index, todo }: Props) => {

    const intl = useIntl();

    const { hideAlert } = useAlertStore();

    const { showConfirm } = useConfirmStore();

    const onClickUpdate = () => {
        if (todo) {
            showConfirm(intl.formatMessage({ id: "updateData" }), todo, false);
        }
    }

    return (
        <>
            <tr className={clsx(todo.done && "task-done")}>
                <td>{index + 1} </td>
                <td>
                    <span>{todo.task}</span>
                    <em><FormattedDate value={new Date(todo.createdAt)} /></em>
                </td>
                <td>
                    <div className="action">
                        <button className="btn btn-primary" onClick={onClickUpdate}>
                            <CheckIcon />
                        </button>
                        <Link to={"/detail/" + todo.id} className="btn btn-secondary">
                            <EyeIcon />
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    )
}
