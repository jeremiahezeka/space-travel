const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".hamburger");

navToggle.addEventListener("click", () => {
    console.log("Toggle clicked");
    const visiblity = nav.getAttribute("data-visible");
    if (visiblity === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
})