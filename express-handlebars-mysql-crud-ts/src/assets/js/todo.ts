import { format } from "date-fns";
import apiClient from "./api-client";
import { confirm } from "./confirm";

export class Todo {

    todoTaskDates: NodeListOf<Element>;

    updateButtons: NodeListOf<Element>;

    deleteButton: Element | null;

    confirmElement: Element | null;

    constructor() {

        // convert date
        this.todoTaskDates = document.querySelectorAll('[data-convertToDate]');
        for (let i = 0; i < this.todoTaskDates.length; i++) {
            const str = this.todoTaskDates[i].textContent;
            if (str) {
                this.todoTaskDates[i].textContent = format(new Date(str), 'dd-LL-yyyy');
            } else {
                this.todoTaskDates[i].textContent = "-"
            }
        }

        // add update button events
        this.updateButtons = document.querySelectorAll('[data-update]');
        for (let i = 0; i < this.updateButtons.length; i++) {
            this.updateButtons[i].addEventListener('click', async (event: Event) => {
                const { currentTarget } = event;

                this.confirmElement?.classList.add("show");
                const result = await confirm();
                this.confirmElement?.classList.remove("show");

                if (currentTarget && result) {
                    const id = (currentTarget as HTMLButtonElement).getAttribute("data-update");
                    await Todo.update(id as string);
                }
            });
        }

        this.confirmElement = document.querySelector('.confirm');

        // add delete button event
        this.deleteButton = document.querySelector('[data-delete]');

        if (this.deleteButton) {
            this.deleteButton.addEventListener('click', async (event: Event) => {
                const { currentTarget } = event;

                this.confirmElement?.classList.add("show");
                const result = await confirm();
                this.confirmElement?.classList.remove("show");

                if (currentTarget && result) {
                    const id = (currentTarget as HTMLButtonElement).getAttribute("data-delete");
                    await Todo.remove(id as string);
                }
            });
        }

    }

    static init() {
        new this();
    }

    static async remove(id: string) {
        try {
            await apiClient.delete(`/${id}`);
            window.location.replace('/');
        } catch (error) {
            console.log(error);
        }
    }

    static async update(id: string) {
        try {
            await apiClient.put(`/${id}`);
            window.location.replace('/');
        } catch (error) {
            console.log(error);
        }
    }
}