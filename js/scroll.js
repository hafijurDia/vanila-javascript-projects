//scroll page
//********* set date *********/
const date = document.querySelector("#date");
date.innerHTML = new Date().getFullYear();

//nav icon toggle
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");




navToggle.addEventListener("click", function () {
  //linksContainer.classList.toggle("show-links");
  const linksContainerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;
  if (linksContainerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }

});

//smooth scroll
const pagelink = document.querySelectorAll('.scroll-link');
pagelink.forEach(function (linkitem) {
  linkitem.addEventListener('click', function(e){
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    let position = element.offsetTop;
    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
  
});

//fixed navbar
const navbar = document.querySelector("#nav");
const toplink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollYHeight = window.pageYOffset;

  if (scrollYHeight > 300) {
    navbar.classList.add("fixed-nav");
    toplink.classList.add("show-top-link");
  } else {
    navbar.classList.remove("fixed-nav");
    toplink.classList.remove("show-top-link");
  }
});
