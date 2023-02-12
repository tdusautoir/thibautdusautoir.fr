/* CONST */

const header = document.querySelector('header');
const headerNav = document.querySelector('.header__nav');
const headerNavLinks = document.getElementsByClassName('nav__link');
const sections = document.querySelectorAll('section');
const lightmodeBtn = document.getElementById('lightmode_btn');
const nightmodeBtn = document.getElementById('nightmode_btn');

/* HEADER */

window.addEventListener(
    "scroll",
    function () {
        header.classList.toggle("unseen", window.scrollY > 40);
        headerNav.classList.toggle("header__nav--sticky", window.scrollY > 40);
    }
);

header.classList.toggle("unseen", window.scrollY > 40);
headerNav.classList.toggle("header__nav--sticky", window.scrollY > 40);

/* header opacity animation */
for(let i = 0; i < headerNavLinks.length; i++){
    headerNavLinks[i].addEventListener('mouseover', (e) => {
        for(let j = 0; j < headerNavLinks.length; j++){
            headerNavLinks[j].classList.add('disable');
            headerNavLinks[j].classList.remove('active');
        }

        headerNavLinks[i].classList.remove('disable');
        headerNavLinks[i].classList.add('active');
    })

    headerNavLinks[i].addEventListener('mouseleave', (e) => {
        for(let j = 0; j < headerNavLinks.length; j++){
            headerNavLinks[j].classList.remove('disable');
            headerNavLinks[j].classList.remove('active');
        }
    })
}

/* OBSERVER */

let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting){
            entry.target.classList.add('active');
            for(let i = 0; i < headerNavLinks.length; i++){
              if((headerNavLinks[i].getAttribute('href') == `#${entry.target.getAttribute('id')}`)){
                headerNavLinks[i].classList.add('unseen');
              }
            }
        } else {
            entry.target.classList.remove('active');
            for(let i = 0; i < headerNavLinks.length; i++){
              if((headerNavLinks[i].getAttribute('href') == `#${entry.target.getAttribute('id')}`)){
                headerNavLinks[i].classList.remove('unseen');
              }
            }
        }
      });
    },
    {
      threshold: 0.2,
    }
);

sections.forEach(observed => {
    if(observed){
        observer.observe(observed);
    }
});

/* DARKMODE */

lightmodeBtn.addEventListener('click', () => {
  document.body.classList.add('night');
});

nightmodeBtn.addEventListener('click', () => {
  document.body.classList.remove('night');
});
