const buttonOpen = document.getElementById("menu-open-button");
const buttonClose = document.getElementById("menu-close-button");
const mobileMenu = document.querySelector(".mobile-menu");

buttonOpen.addEventListener("click", () => {
    mobileMenu.classList.add("active");
});

buttonClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});

const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
        const openItem = document.querySelector(".accordion-content.open");
        const content = header.nextElementSibling;
        const arrow = header.querySelector(".arrow");

        // Закрываем предыдущий, если это не текущий
        if (openItem && openItem !== content) {
            openItem.style.maxHeight = null;
            openItem.classList.remove("open");
            openItem.previousElementSibling
                .querySelector(".arrow")
                .classList.remove("open");
        }

        // Переключаем текущий
        if (content.classList.contains("open")) {
            content.style.maxHeight = null;
            content.classList.remove("open");
            arrow.classList.remove("open");
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add("open");
            arrow.classList.add("open");
        }
    });
});
