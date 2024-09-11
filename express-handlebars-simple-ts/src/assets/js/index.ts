import { sayHello } from '@src/assets/js/common';

document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        const messageEl = document.getElementById('message');

        if(messageEl){
            messageEl.innerText = sayHello();
        }
        
    }
});