export class Sidebar {

    sidebarOpenButton: HTMLElement | null;

    sidebarCloseButton: HTMLElement | null;

    constructor() {

        this.sidebarOpenButton = document.querySelector(".sidebar-open");

        if (this.sidebarOpenButton) {
            this.sidebarOpenButton.addEventListener('click', () => {
                document.body.classList.add('showSidebar');
            });
        }

        this.sidebarCloseButton = document.querySelector(".sidebar-close");

        if (this.sidebarCloseButton) {
            this.sidebarCloseButton.addEventListener('click', () => {
                document.body.classList.remove('showSidebar');
            });
        }

    }

    static init() {
        new this();
    }

}