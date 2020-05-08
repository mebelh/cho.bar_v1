const like = document.getElementById("search_like");
const next = document.getElementById("search_next");
const id = document.getElementById("id").value;
// console.log(like, next);

const modal_alert = document.createElement("div");
modal_alert.classList.add("modall", "modal_good");
modal_alert.innerHTML = `<div class="alert">Ок! Будем ждать взаимную симпатию))</div>`;

like.addEventListener("click", async (e) => {
    fetch("/search/like/" + document.querySelector("#id").dataset.id, {
        method: "POST",
    })
        .then((res) => res.json())
        .then((c) => {
            document.querySelector(".imgBlock_name").textContent = c.name;
            document.querySelector(".imgBlock_age").textContent = c.age;
            document.querySelector(
                ".imgBlock_img"
            ).style.backgroundImage = `url(${c.img})`;
            document.querySelector(".descriptionBloc_text").textContent =
                c.description;

            document.querySelector("#id").dataset.id = c.id;
        });
    e.preventDefault();

    document.querySelector(".mypage").appendChild(modal_alert);
});

next.addEventListener("click", async (e) => {
    // console.log(e);

    fetch("/search/next", { method: "POST" })
        .then((res) => res.json())
        .then((c) => {
            document.querySelector(".imgBlock_name").textContent = c.name;
            document.querySelector(".imgBlock_age").textContent = c.age;
            document.querySelector(
                ".imgBlock_img"
            ).style.backgroundImage = `url(${c.img})`;
            document.querySelector(".descriptionBloc_text").textContent =
                c.description;
            document.querySelector("#id").dataset.id = c.id;
        });

    e.preventDefault();
});
