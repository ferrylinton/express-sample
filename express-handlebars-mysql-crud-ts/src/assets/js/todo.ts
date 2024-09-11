import { format } from "date-fns";

export class Todo {

    todoTaskDates: NodeListOf<Element>;

    constructor() {

        this.todoTaskDates = document.querySelectorAll(".todo-list em");

        for(let i=0; i<this.todoTaskDates.length; i++){
            const str = this.todoTaskDates[i].textContent;

            if(str){
                this.todoTaskDates[i].textContent = format(new Date(str), 'dd-LL-yyyy');
            }  
        }
    }

    static init() {
        new this();
    }

}