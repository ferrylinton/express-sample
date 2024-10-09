import { useConfirmStore } from '../hooks/confirm-store';
import * as todoService from "../services/todo-service";
import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useAlertStore } from '../hooks/alert-store';

export const ConfirmDialog = () => {

    const intl = useIntl();

    const navigate = useNavigate();

    const { alert } = useAlertStore();

    const { isDelete, message, todo, show, hideConfirm } = useConfirmStore();

    const okHandler = async () => {
        try {
            if (isDelete) {
                await todoService.deleteById(todo?.id as string);
                alert.success(intl.formatMessage({ id: "dataIsDeleted" }, { task: todo?.task }) as string)
            } else {
                await todoService.update(todo?.id as string);
                alert.success(intl.formatMessage({ id: "dataIsUpdated" }, { task: todo?.task }) as string)
            }

            hideConfirm();
            navigate("/", { replace: true });
        } catch (error: any) {
            console.log(error);
            hideConfirm();
            alert.error(error.response.data.message);
        }
    }

    return (
        <div className={clsx("confirm", show && "show")}>
            <div className="confirm-content">
                <p>{message}</p>
                <section>
                    <button className="btn btn-secondary" onClick={() => hideConfirm()}>
                        <FormattedMessage id="cancel" />
                    </button>
                    <button className="btn btn-primary" onClick={() => okHandler()}>
                        <FormattedMessage id="ok" />
                    </button>
                </section>
            </div>
        </div>
    )
}