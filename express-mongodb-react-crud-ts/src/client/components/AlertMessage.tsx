import { AlertItem, AlertType, useAlertStore } from '../hooks/alert-store';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type Props = {
    alertItem: AlertItem
}

export const AlertMessage = ({ alertItem }: Props) => {

    const [close, setClose] = useState<boolean>(false);

    const { id, alertType, message } = alertItem;

    const { hideAlert } = useAlertStore();

    const onClose = () => {
        setClose(true);
        setTimeout(() => {
            hideAlert(id);
        }, 2000);
    }

    useEffect(() => {
        setTimeout(() => {
            onClose();
        }, 10000);
    }, [])

    return (
        <div className={clsx("alert", alertType === AlertType.ERROR ? "alert-danger" : "alert-success", close && "close")}>
            <p>
                {message}
                <span className="alert-close" onClick={() => onClose()}>&times;</span>
            </p>
        </div>
    )
}
