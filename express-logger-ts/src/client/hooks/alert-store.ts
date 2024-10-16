import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

export enum AlertType {
    SUCCESS, ERROR
};

export type AlertItem = {
    id: string,
    message: string,
    alertType: AlertType
}

type AlertState = {
    alertList: AlertItem[]
    alert: {
        success: (message: string) => void,
        error: (message: string) => void,
    }
    hideAlert: (id: string) => void
}

export const useAlertStore = create<AlertState>((set) => ({
    alertList: [],

    alert: {
        success: (message: string) => {

            set((state) => ({
                alertList: [
                    {
                        id: uuidv4(),
                        message,
                        alertType: AlertType.SUCCESS
                    },
                    ...state.alertList,
                ]
            }));

        },

        error: (message: string) => {

            set((state) => ({
                alertList: [
                    ...state.alertList,
                    {
                        id: uuidv4(),
                        message,
                        alertType: AlertType.ERROR
                    }
                ]
            }));

        }
    },

    hideAlert: (id: string) => {
        set((state) => ({
            alertList: state.alertList.filter((alertItem) => alertItem.id !== id),
        }));
    }

}));