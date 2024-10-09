import { useAlertStore } from '../hooks/alert-store';
import { AlertMessage } from './AlertMessage';

export const AlertMessageContainer = () => {

    const { alertList } = useAlertStore();

    return (
        <div className='alert-container'>
            {alertList.map((alertItem) => {
                return <AlertMessage key={alertItem.id} alertItem={alertItem} />
            })}
        </div>
    )
}
