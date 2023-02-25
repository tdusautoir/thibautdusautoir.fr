/* CONTACT */

const contact_inputs = document.querySelectorAll(".contact-form input, .contact-form textarea");

if(contact_inputs.length > 0) {
  for (let i = 0; i < contact_inputs.length; i++) {
    contact_inputs[i].addEventListener("focusin", (e) => {
      e.target.parentNode.querySelector('label').style = '--left-value: ' + (e.target.parentNode.getBoundingClientRect().width - e.target.parentNode.querySelector('label').getBoundingClientRect().width - 10) + 'px;';
      e.target.parentNode.classList.add("focus");
    });
  
    contact_inputs[i].addEventListener("keyup", (e) => {
      console.log(e.target.value);
      e.target.parentNode.classList.add("not-empty");
    });
  
    contact_inputs[i].addEventListener("focusout", (e) => {
      e.target.parentNode.classList.remove("focus");
  
      if (e.target.value != "") {
        e.target.parentNode.classList.add("not-empty");
      } else {
        e.target.parentNode.classList.remove("not-empty");
      }
    });
  }
}

window.addEventListener('resize', () => {
  if(contact_inputs.length > 0) {
    for (let i = 0; i < contact_inputs.length; i++) {
      contact_inputs[i].parentNode.querySelector('label').style = '--left-value: ' + (contact_inputs[i].parentNode.getBoundingClientRect().width - contact_inputs[i].parentNode.querySelector('label').getBoundingClientRect().width - 10) + 'px; transition: none;';
    }
  }
});