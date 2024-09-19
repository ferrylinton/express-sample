export class ThemeToggle {

    themeToggleButton: HTMLElement | null;

    constructor() {

        this.themeToggleButton = document.querySelector(".theme-toggle");

        if (this.themeToggleButton) {
            this.themeToggleButton.addEventListener('click', () => {
                if(document.body.classList.contains("dark")){
                    window.location.replace("?theme=light");
                }else{
                    window.location.replace("?theme=dark");
                }

            });
        }
    }

    static init() {
        new this();
    }

}