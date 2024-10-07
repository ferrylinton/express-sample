import { Todo } from '../../types/todo-type';
import { create } from 'zustand';

type ConfirmState = {
    isDelete?: boolean,
    todo?: Todo,
    message?: string,
    show: boolean,
    showConfirm: (message: string, todo: Todo, isDelete: boolean) => void,
    hideConfirm: () => void
}

const DEFAULT_VALUE: Partial<ConfirmState> = {
    isDelete: undefined,
    todo: undefined,
    message: undefined,
    show: false
}

export const useConfirmStore = create<ConfirmState>((set) => ({
    show: false,
    showConfirm: (message: string, todo: Todo, isDelete: boolean) => {
        set(() => ({ show: true, message, todo, isDelete }));
    },
    hideConfirm: () => {
        set(() => (DEFAULT_VALUE));
    }
}));