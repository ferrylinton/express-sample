import { Todo } from '../../types/todo-type';
import { create } from 'zustand';

type AlertType = "success" | "danger";

type AlertState = {
    show: boolean,
    message: string,
    alertType?: AlertType,
    todo?: Todo,
    showAlert: (message: string, alertType?: AlertType, todo?: Todo) => void,
    hideAlert: () => void
}

const DEFAULT_VALUE: Partial<AlertState> = {
    show: false,
    message: "",
    alertType: "success",
    todo: undefined
}

export const useAlertStore = create<AlertState>((set) => ({
    show: false,

    message: "",

    alertType: "success",

    todo: undefined,

    showAlert: (message: string, alertType?: AlertType, todo?: Todo) => {
        
        set(() => ({ show: true, message, alertType, todo }));

        setTimeout(() => {
            set(() => (DEFAULT_VALUE));
        }, 10000);
    },

    hideAlert: () => {
        set(() => (DEFAULT_VALUE));
    }

}));