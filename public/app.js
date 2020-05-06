// M.Tabs.init(document.querySelectorAll(".tabs"));
const menu = document.querySelector(".menu");
const burg = document.querySelector(".sidenav-trigger");

burg.addEventListener("click", () => {
    menu.classList.toggle("show");
});
