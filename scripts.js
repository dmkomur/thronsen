const buttonOpen = document.getElementById("menu-open-button");
const buttonClose = document.getElementById("menu-close-button");
const mobileMenu = document.querySelector(".mobile-menu");

buttonOpen.addEventListener("click", () => {
    mobileMenu.classList.add("active");
});

buttonClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});
