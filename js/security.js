/* =====================================================
   PORTFOLIO SECURITY / BASIC CONTENT PROTECTION
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------------------
       1. DISABLE RIGHT CLICK
    ------------------------------------------------- */

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });


    /* -------------------------------------------------
       2. PREVENT IMAGE DRAGGING
    ------------------------------------------------- */

    document.querySelectorAll("img").forEach((image) => {

        image.setAttribute("draggable", "false");

        image.addEventListener("dragstart", (event) => {
            event.preventDefault();
        });

    });


    /* -------------------------------------------------
       3. PREVENT EASY TEXT SELECTION
       Only selected portfolio elements
    ------------------------------------------------- */

    document
        .querySelectorAll(
            ".profile-frame, .about-photo, .certificate-image"
        )
        .forEach((element) => {

            element.style.userSelect = "none";
            element.style.webkitUserSelect = "none";

        });


    /* -------------------------------------------------
       4. BLOCK COMMON COPY SHORTCUT
       Only for image/certificate areas
    ------------------------------------------------- */

    document.addEventListener("copy", (event) => {

        const selection = window.getSelection();

        if (!selection || selection.rangeCount === 0) {
            return;
        }

        const selectedElement =
            selection.anchorNode?.parentElement;

        if (
            selectedElement &&
            selectedElement.closest(
                ".profile-frame, .about-photo, .certificate-image"
            )
        ) {

            event.preventDefault();

        }

    });

});