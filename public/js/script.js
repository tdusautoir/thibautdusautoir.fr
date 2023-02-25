/* HEADER */

const header = document.querySelector("header");
const headerNav = document.querySelector(".header__nav");
const headerNavLinkContainer = document.querySelector(".header__nav__link__container");
const headerNavHighlight = document.getElementById('nav-highlight');
const headerNavLinks = document.getElementsByClassName("nav__link");

window.addEventListener("scroll", function () {
  if(header) {
    header.classList.toggle("unseen", window.scrollY > 40);
    if (headerNav) {
      headerNav.classList.toggle("header__nav--sticky", window.scrollY > 40);
    }
  }
});

if(header) {
  header.classList.toggle("unseen", window.scrollY > 40);
  if (headerNav) {
    headerNav.classList.toggle("header__nav--sticky", window.scrollY > 40);
  }
}

/* header opacity animation */
if (headerNavLinks.length > 0) {
  for (let i = 0; i < headerNavLinks.length; i++) {
    headerNavLinks[i].addEventListener("mouseover", (e) => {
      headerNavHighlight.style.left = (e.currentTarget.getBoundingClientRect().left - headerNavLinkContainer.getBoundingClientRect().left) + 'px';
      headerNavHighlight.style.width = (e.currentTarget.getBoundingClientRect().width) + 'px';

      for (let j = 0; j < headerNavLinks.length; j++) {
        headerNavLinks[j].classList.add("disable");
        headerNavLinks[j].classList.remove("active");
      }

      e.currentTarget.classList.remove("disable");
      e.currentTarget.classList.add("active");
    });

    headerNavLinks[i].addEventListener("mouseleave", () => {
      for (let j = 0; j < headerNavLinks.length; j++) {
        headerNavLinks[j].classList.remove("disable");
        headerNavLinks[j].classList.remove("active");
      }
    });
  }

  headerNavLinkContainer.addEventListener("mouseleave", () => {
    headerNavHighlight.style.width = '0px';
  });
}

/* OBSERVER */

const sections = document.querySelectorAll("section");

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.target.classList.contains("project")) {
        if (!entry.isIntersecting) {
          entry.target.classList.add("active");
          if (headerNavLinks.length > 0) {
            for (let i = 0; i < headerNavLinks.length; i++) {
              if (
                headerNavLinks[i].getAttribute("href") ==
                `#${entry.target.getAttribute("id")}`
              ) {
                headerNavLinks[i].classList.add("unseen");
              }
            }
          }
        } else {
          entry.target.classList.remove("active");
          if (headerNavLinks.length > 0) {
            for (let i = 0; i < headerNavLinks.length; i++) {
              if (
                headerNavLinks[i].getAttribute("href") ==
                `#${entry.target.getAttribute("id")}`
              ) {
                headerNavLinks[i].classList.remove("unseen");
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

sections.forEach((observed) => {
  if (observed) {
    observer.observe(observed);
  }
});

/* DARKMODE */

const lightmodeBtn = document.getElementById("lightmode_btn");
const nightmodeBtn = document.getElementById("nightmode_btn");

var theme = localStorage.getItem("theme");
if (theme) {
  var css = "*{transition: none!important}";
  var style = document.createElement("style");

  style.id = "transition-none";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
  theme === "night"
    ? document.body.classList.add("night")
    : document.body.classList.remove("night");

  setTimeout(() => {
    document.getElementById("transition-none").remove();
  }, 100);
}

lightmodeBtn.addEventListener("click", () => {
  document.body.classList.add("night");
  localStorage.setItem("theme", "night");
});

nightmodeBtn.addEventListener("click", () => {
  document.body.classList.remove("night");
  localStorage.setItem("theme", "light");
});
