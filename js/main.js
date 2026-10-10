/* =========================================
   DIM SUM STREET - HEADER JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const currentPagePath = window.location.pathname.endsWith("/")
        ? `${window.location.pathname}index.html`
        : window.location.pathname;

    document.querySelectorAll(
        ".main-navigation a[href], .mobile-navigation a[href]"
    ).forEach((link) => {
        const href = link.getAttribute("href");

        if (!href || href.startsWith("#")) return;

        const linkPath = new URL(href, window.location.href).pathname;

        if (linkPath !== currentPagePath) return;

        link.classList.add("active");
        link.setAttribute("aria-current", "page");

        const dropdown = link.closest(
            ".nav-item.has-dropdown, .mobile-dropdown"
        );

        dropdown?.classList.add("active");

        const parentLink = dropdown?.querySelector(
            ".nav-link, .mobile-dropdown-btn"
        );

        parentLink?.classList.add("active");
    });


    /* =========================================
       MOBILE MENU TOGGLE
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mobileMenu.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute("aria-expanded", isOpen);

        });
    }


    /* =========================================
       MOBILE DROPDOWNS
    ========================================= */

    const mobileDropdowns =
        document.querySelectorAll(".mobile-dropdown");

    mobileDropdowns.forEach((dropdown) => {

        const button =
            dropdown.querySelector(".mobile-dropdown-btn");

        if (!button) return;

        button.addEventListener("click", () => {

            /* Close other dropdowns */
            mobileDropdowns.forEach((otherDropdown) => {

                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove("open");
                }

            });

            /* Open clicked dropdown */
            dropdown.classList.toggle("open");

        });

    });


    /* =========================================
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
    ========================================= */

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-menu a:not(.mobile-dropdown-btn)"
        );

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu?.classList.remove("active");
            menuToggle?.classList.remove("active");

            menuToggle?.setAttribute("aria-expanded", "false");

        });

    });


    /* =========================================
       DARK MODE
    ========================================= */

    const themeToggle =
        document.getElementById("themeToggle");

    const mobileThemeToggle =
        document.getElementById("mobileThemeToggle");

    const savedTheme =
        localStorage.getItem("dim-sum-theme");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
    }


    function toggleDarkMode() {

        document.documentElement.classList.toggle("dark-mode");

        const isDark =
            document.documentElement.classList.contains("dark-mode");

        localStorage.setItem(
            "dim-sum-theme",
            isDark ? "dark" : "light"
        );

        updateThemeIcons();
    }


    function updateThemeIcons() {

        const isDark =
            document.documentElement.classList.contains("dark-mode");

        const icons =
            document.querySelectorAll(
                "#themeToggle i, #mobileThemeToggle i"
            );

        icons.forEach((icon) => {

            icon.classList.remove(
                "fa-moon",
                "fa-sun"
            );

            icon.classList.add(
                isDark ? "fa-sun" : "fa-moon"
            );

        });

    }


    themeToggle?.addEventListener(
        "click",
        toggleDarkMode
    );

    mobileThemeToggle?.addEventListener(
        "click",
        toggleDarkMode
    );

    updateThemeIcons();


    /* =========================================
       RTL MODE
    ========================================= */

    const rtlToggle =
        document.getElementById("rtlToggle");

    const mobileRtlToggle =
        document.getElementById("mobileRtlToggle");

    const savedDirection =
        localStorage.getItem("dim-sum-direction");

    if (savedDirection === "rtl") {
        document.documentElement.setAttribute("dir", "rtl");
    }


    function toggleRTL() {

        const currentDirection =
            document.documentElement.getAttribute("dir");

        if (currentDirection === "rtl") {

            document.documentElement.setAttribute(
                "dir",
                "ltr"
            );

            localStorage.setItem(
                "dim-sum-direction",
                "ltr"
            );

        } else {

            document.documentElement.setAttribute(
                "dir",
                "rtl"
            );

            localStorage.setItem(
                "dim-sum-direction",
                "rtl"
            );

        }

    }


    rtlToggle?.addEventListener(
        "click",
        toggleRTL
    );

    mobileRtlToggle?.addEventListener(
        "click",
        toggleRTL
    );


    /* =========================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ========================================= */

    document.addEventListener("click", (event) => {

        if (
            mobileMenu &&
            menuToggle &&
            !mobileMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            mobileMenu.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =========================================
       RESET MOBILE MENU ON DESKTOP
    ========================================= */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1024) {

            mobileMenu?.classList.remove("active");
            menuToggle?.classList.remove("active");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileDropdowns.forEach((dropdown) => {
                dropdown.classList.remove("open");
            });

        }

    });

});

/* =========================================
   ACTIVE DROPDOWN PAGE
========================================= */

function setActiveDropdownPage() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    /* Desktop dropdown links */
    const desktopDropdownLinks =
        document.querySelectorAll(".dropdown-menu li a");

    /* Mobile dropdown links */
    const mobileDropdownLinks =
        document.querySelectorAll(".mobile-dropdown-menu li a");


    /* Desktop */
    desktopDropdownLinks.forEach((link) => {

        const linkPage =
            link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    /* Mobile */
    mobileDropdownLinks.forEach((link) => {

        const linkPage =
            link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });

}

setActiveDropdownPage();

document.querySelectorAll(".about-faq-question").forEach((question) => {

    question.addEventListener("click", () => {

        const currentItem = question.parentElement;

        document.querySelectorAll(".about-faq-item").forEach((item) => {

            if (item !== currentItem) {
                item.classList.remove("active");
            }

        });

        currentItem.classList.toggle("active");

    });

});