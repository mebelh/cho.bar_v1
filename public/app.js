// M.Tabs.init(document.querySelectorAll(".tabs"));
setTimeout(function () {
    let viewheight = $(window).height();
    let viewwidth = $(window).width();
    let viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute(
        "content",
        "height=" +
            viewheight +
            "px, width=" +
            viewwidth +
            "px, initial-scale=1.0"
    );
}, 300);

const menu = document.querySelector(".menu");
const burg = document.querySelector(".sidenav-trigger");

burg.addEventListener("click", () => {
    menu.classList.toggle("show");
});
