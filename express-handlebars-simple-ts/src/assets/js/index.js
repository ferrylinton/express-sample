const { sayHello } = require('./common');

document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        document.getElementById('message').innerText = sayHello();
    }
});