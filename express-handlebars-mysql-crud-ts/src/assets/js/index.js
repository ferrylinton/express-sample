document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        common.initTheme();
        common.initMenu();
    }
});