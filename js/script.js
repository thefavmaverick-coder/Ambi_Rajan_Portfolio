document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SELECTORS
    ===================================================== */

    const loader = document.getElementById("loader");
    const navbar = document.getElementById("navbar");

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    const role = document.getElementById("role");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hide");
            }

        }, 500);

    });


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        document
            .querySelectorAll("#navMenu a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navMenu.classList.remove("open");

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

            });

    }

/* =====================================================
   CHANGING HERO ROLE
===================================================== */

const changingRole = document.getElementById("changingRole");

if (changingRole) {

    const roles = [
        "Aspiring Data Analyst",
        "Data Visualization Learner",
        "Analytics Project Builder",
        "AI-Assisted Web Developer"
    ];

    let roleIndex = 0;

    setInterval(function () {

        changingRole.style.opacity = "0";

        setTimeout(function () {

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

            changingRole.textContent = roles[roleIndex];

            changingRole.style.opacity = "1";

        }, 400);

    }, 2500);

}


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            "#navMenu a"
        );


    if (
        "IntersectionObserver" in window &&
        sections.length > 0
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        navLinks.forEach(link => {

                            const target =
                                link.getAttribute(
                                    "href"
                                );


                            link.classList.toggle(
                                "active",
                                target ===
                                `#${entry.target.id}`
                            );

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }

    
/* =====================================================
   CERTIFICATE MODAL
===================================================== */

const certificateModal =
    document.getElementById("certificateModal");

const modalImage =
    document.getElementById("modalImage");

const modalOpen =
    document.getElementById("modalOpen");

const modalClose =
    document.getElementById("modalClose");

const modalBackdrop =
    document.querySelector(".modal-backdrop");

const certificateButtons =
    document.querySelectorAll("[data-certificate]");


function openCertificate(image) {

    if (!certificateModal || !modalImage) {
        return;
    }

    modalImage.src = image;

    if (modalOpen) {
        modalOpen.href = image;
    }

    certificateModal.classList.add("open");

    certificateModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("modal-open");
}


function closeCertificate() {

    if (!certificateModal) {
        return;
    }

    certificateModal.classList.remove("open");

    certificateModal.setAttribute(
        "aria-hidden",
        "true"
    );

    if (modalImage) {
        modalImage.src = "";
    }

    if (modalOpen) {
        modalOpen.href = "#";
    }

    document.body.classList.remove("modal-open");
}


certificateButtons.forEach(button => {

    button.addEventListener("click", () => {

        const image =
            button.getAttribute("data-certificate");

        if (image) {
            openCertificate(image);
        }

    });

});


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeCertificate
    );

}


if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        closeCertificate
    );

}


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeCertificate();

    }

});


});