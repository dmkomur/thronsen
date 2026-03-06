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

// ===modal and form ====

const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModal");
const openBtnFooter = document.getElementById("openModalFooter");
const closeBtn = document.getElementById("closeModal");
const body = document.body;

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const sentMessage = document.getElementById("sentMessage");

// исключаем honeypot
const inputs = form.querySelectorAll("input:not(.honeypot), textarea");

// honeypot
const honeypot = form.querySelector(".honeypot");

let formStart = 0;

// OPEN MODAL
function openModal() {
    modal.style.display = "flex";
    body.style.overflow = "hidden";
    formStart = Date.now(); // старт таймера
}

openBtn.addEventListener("click", openModal);
openBtnFooter.addEventListener("click", openModal);

// CLOSE MODAL
function closeModal() {
    modal.style.display = "none";
    body.style.overflow = "";
    resetFormState();
}

closeBtn.addEventListener("click", closeModal);

// BACKDROP CLICK
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// LIVE VALIDATION
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        validateField(input);
    });

    input.addEventListener("blur", () => {
        validateField(input);
    });
});

function validateField(field) {
    const value = field.value.trim();

    if (value === "") {
        field.classList.remove("valid");
        field.classList.add("invalid");
        return false;
    }

    if (field.type === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {
            field.classList.remove("valid");
            field.classList.add("invalid");
            return false;
        }
    }

    field.classList.remove("invalid");
    field.classList.add("valid");

    return true;
}

// SUBMIT
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Проверка honeypot
    if (honeypot.value !== "") {
        console.log("Bot detected (honeypot)");
        return;
    }

    // Проверка таймера
    if (Date.now() - formStart < 2000) {
        console.log("Bot detected (too fast)");
        return;
    }

    // Проверка валидности полей
    let allValid = true;
    inputs.forEach((input) => {
        if (!validateField(input)) {
            allValid = false;
        }
    });
    if (!allValid) return;

    // Отправка формы через Contact Form 7 REST API
    submitBtn.textContent = "Sender..."; // loading state
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
        const response = await fetch(
            "https://thronsen.no/wp-json/contact-form-7/v1/contact-forms/0292ec2/feedback",
            {
                method: "POST",
                body: formData,
            },
        );

        const result = await response.json();

        if (result.status === "mail_sent") {
            // Показать сообщение об отправке
            sentMessage.style.display = "inline";
            submitBtn.style.display = "none";
        } else {
            // Ошибка на стороне CF7
            alert("Feil ved sending: " + result.message);
            submitBtn.disabled = false;
            submitBtn.textContent = "Send inn";
        }
    } catch (err) {
        // Ошибка сети
        alert("Nettverksfeil: " + err.message);
        submitBtn.disabled = false;
        submitBtn.textContent = "Send inn";
    }
});

// RESET
function resetFormState() {
    form.reset();

    inputs.forEach((input) => {
        input.classList.remove("valid", "invalid");
    });

    honeypot.value = "";

    submitBtn.style.display = "inline-block";
    sentMessage.style.display = "none";
}
