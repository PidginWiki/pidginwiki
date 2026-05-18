var hamburger = document.querySelector(".hamburger");
var nav = document.querySelector("header");
var ham1 = document.querySelector(".ham-1");
var ham2 = document.querySelector(".ham-2");
var ham3 = document.querySelector(".ham-3");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("show");
    ham1.classList.toggle("on");
    ham2.classList.toggle("on");
    ham3.classList.toggle("on");
})