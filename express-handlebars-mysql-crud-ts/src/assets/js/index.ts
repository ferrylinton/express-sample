import { Sidebar } from "@src/assets/js/sidebar";
import { Todo } from "@src/assets/js/todo";

document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        Sidebar.init();
        Todo.init();
    }
});