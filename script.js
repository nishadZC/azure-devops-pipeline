document.getElementById("learnBtn").addEventListener("click", function () {

    document.getElementById("features").scrollIntoView({
        behavior: "smooth"
    });

});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.boxShadow = "0 10px 25px rgba(25,118,210,.3)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.boxShadow = "0 5px 15px rgba(0,0,0,.1)";

    });

});

window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if (window.scrollY > 50) {
        nav.style.background = "#0d47a1";
    } else {
        nav.style.background = "#1565c0";
    }

});