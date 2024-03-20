document.documentElement.className = "js";
var supportsCssVars = function() {
    var e, t = document.createElement("style");
    return t.innerHTML = "root: { --tmp-var: bold; }",
    document.head.appendChild(t),
    e = !!(window.CSS && window.CSS.supports && window.CSS.supports("font-weight", "var(--tmp-var)")),
    t.parentNode.removeChild(t),
    e
};
supportsCssVars() || alert("Please view this demo in a modern browser that supports CSS Variables.");

function toggleMenu() {
    var menu = document.getElementById("menu");
    var sidenav = document.getElementById("mySidenav");
    
    if (window.innerWidth <= 768) {
        if (menu.style.display === "flex") {
            menu.style.display = "none";
            sidenav.style.width = "0";
        } else {
            sidenav.style.width = "30%";
        }
    }
}

function openNav() {
    console.log('openNav called');
    document.getElementById("mySidenav").style.width = "20%";
}

function closeNav() {
    console.log('closeNav called');
    document.getElementById("mySidenav").style.width = "0";
}

var slideIndex = 0;
var maxSlideIndex = 2; 

window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.header'); // replace '.navbar' with your navbar's class or id
    if (window.pageYOffset > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000); // Change slide every 2 seconds
}

function plusSlides(n) {
    var sl = slideIndex += n;
    if (sl < 0){
        slideIndex = maxSlideIndex;
    } else if (sl > maxSlideIndex){
        slideIndex = 0;
    }
    showSlides();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

document.addEventListener('DOMContentLoaded', function () {
    showSlides(); // Start the slideshow
});