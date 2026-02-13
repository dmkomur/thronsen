const buttonOpen = document.getElementById("menu-open-button");
const buttonClose = document.getElementById("menu-close-button");
const mobileMenu = document.querySelector(".mobile-menu");
const backdrop = document.getElementById("mobile-backdrop");

const mobileNavLinks = document.querySelectorAll(".nav-mobile .nav-item");

mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

function openMenu() {
    mobileMenu.classList.add("active");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    mobileMenu.classList.remove("active");
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
}

buttonOpen.addEventListener("click", openMenu);
buttonClose.addEventListener("click", closeMenu);
backdrop.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeMenu();
    }
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

// mail insert

document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("email");
    if (!link) return;

    const revealEmail = () => {
        const email = "post" + "@" + "thronsen.no";
        link.href = `mailto:${email}`;
        link.textContent = email;
    };

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                revealEmail();
                observer.disconnect();
            }
        },
        {
            rootMargin: "300px 0px",
            threshold: 0,
        },
    );

    observer.observe(link);
});
