/* PORTFOLIO */

const filter_btns = document.querySelectorAll(".filters__btn");
const portfolio_cards = document.querySelectorAll(".portfolio-container .card");
const portfolio_cards_btn = document.querySelectorAll(".portfolio-container .card button");
const project_sections = document.querySelectorAll("section.project");

if(filter_btns.length > 0) {
  for (let i = 0; i < filter_btns.length; i++) {
    filter_btns[i].addEventListener("click", (e) => {
      if (e.target.classList.contains("selected")) {
        for (let j = 0; j < portfolio_cards.length; j++) {
          portfolio_cards[j].classList.remove("notshow");
        }
  
        e.target.classList.remove("selected");
      } else {
        for (let j = 0; j < portfolio_cards.length; j++) {
          let portfolio_card = portfolio_cards[j];
          if (
            JSON.parse(
              portfolio_card.dataset.stack.includes(e.target.dataset.filter)
            )
          ) {
            portfolio_card.classList.remove("notshow");
          } else {
            portfolio_card.classList.add("notshow");
          }
        }
  
        for (let j = 0; j < filter_btns.length; j++) {
          filter_btns[j].classList.remove("selected");
        }
  
        e.target.classList.add("selected");
      }
    });
  }
}