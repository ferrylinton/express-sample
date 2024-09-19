import { Sidebar } from "@src/assets/js/sidebar";
import { Todo } from "@src/assets/js/todo";
import { ThemeToggle } from "./theme-toggle";

document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        Sidebar.init();
        ThemeToggle.init();
        Todo.init();
    }
});