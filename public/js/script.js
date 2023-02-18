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
        if(headerNav) {
          headerNav.classList.toggle("header__nav--sticky", window.scrollY > 40);
        }
    }
);

header.classList.toggle("unseen", window.scrollY > 40);
if(headerNav) {
  headerNav.classList.toggle("header__nav--sticky", window.scrollY > 40);
}

/* header opacity animation */
if(headerNavLinks.length > 0) {
  for(let ii = 0; i < headerNavLinks.length; i++){
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
}

/* OBSERVER */

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if(!(entry.target.classList.contains('project'))) { 
        if(!entry.isIntersecting) {
          entry.target.classList.add('active');
          if(headerNavLinks.length > 0) {
            for(let i = 0; i < headerNavLinks.length; i++){
              if((headerNavLinks[i].getAttribute('href') == `#${entry.target.getAttribute('id')}`)){
                headerNavLinks[i].classList.add('unseen');
              }
            }
          }
        } else {
          entry.target.classList.remove('active');
          if(headerNavLinks.length > 0) {
            for(let i = 0; i < headerNavLinks.length; i++){
              if((headerNavLinks[i].getAttribute('href') == `#${entry.target.getAttribute('id')}`)){
                headerNavLinks[i].classList.remove('unseen');
              }
            }
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

var theme = localStorage.getItem('theme');
if(theme) {
  var css = "*{transition: none!important}";
  var style = document.createElement('style');

  style.id = 'transition-none';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
  theme === 'night' ? document.body.classList.add('night') : document.body.classList.remove('night');
  
  setTimeout(() => {document.getElementById('transition-none').remove()}, 100);
}

lightmodeBtn.addEventListener('click', () => {
  document.body.classList.add('night');
  localStorage.setItem('theme', 'night');
});

nightmodeBtn.addEventListener('click', () => {
  document.body.classList.remove('night');
  localStorage.setItem('theme', 'light');
});

/* PORTFOLIO */

const filter_btns = document.querySelectorAll('.filters__btn');
const portfolio_cards = document.querySelectorAll('.portfolio-container .card');
const portfolio_cards_btn = document.querySelectorAll('.portfolio-container .card button');
const project_sections = document.querySelectorAll('section.project');

for(let i = 0; i < filter_btns.length; i++) {
  filter_btns[i].addEventListener('click', (e) => {
    if(e.target.classList.contains('selected')) {
      for(let j = 0; j < portfolio_cards.length; j++) {
        portfolio_cards[j].classList.remove('notshow');
      }

      e.target.classList.remove('selected');
    } else {
      for(let j = 0; j < portfolio_cards.length; j++) {
        let portfolio_card = portfolio_cards[j];
        if(JSON.parse(portfolio_card.dataset.stack.includes(e.target.dataset.filter))) {
          portfolio_card.classList.remove('notshow');
        } else {
          portfolio_card.classList.add('notshow');
        }
      }

      for(let j = 0; j < filter_btns.length; j++) {
        filter_btns[j].classList.remove('selected');
      }

      e.target.classList.add('selected');
    }

    // let filter_btn_selected = document.querySelector('.filters__btn.selected');

    // if(filter_btn_selected) {
    //   if(filter_btn_selected.dataset.filter !== e.target.dataset.filter) {
    //     filter_btn_selected.classList.remove('selected');
    //     e.target.classList.add('selected');
    //   }
    // } else {
    //   e.target.classList.add('selected');
    // }
  })
}