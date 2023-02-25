/* CONTACT */

const contact_inputs = document.querySelectorAll(".contact-form input, .contact-form textarea");
const contact_submit = document.querySelector('.contact-form .contact-form__inputs__submit');
const contact_submit_btn = document.querySelector('.contact-form .contact-form__inputs__submit button');
const contact_inputs_arrow = document.querySelector('.contact-form .contact-form__inputs__submit__arrow');

if(contact_inputs.length > 0 && contact_submit) {
    for (let i = 0; i < contact_inputs.length; i++) {
        contact_inputs[i].addEventListener("focusin", (e) => {
            e.target.parentNode.querySelector('label').style = '--left-value: ' + (e.target.parentNode.getBoundingClientRect().width - e.target.parentNode.querySelector('label').getBoundingClientRect().width - 10) + 'px;';
            e.target.parentNode.classList.add("focus");
        });
    
        contact_inputs[i].addEventListener("keyup", (e) => {
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

    function arrowIn() {
        contact_submit.classList.add('hover');
        
        window.resizeArrow = setTimeout(() => {
            contact_inputs_arrow.style = 'max-width: 40px; left: 140px';
        }, 300);
    }

    function arrowOut() {
        contact_submit.classList.remove('hover');

        if(resizeArrow) {
            window.clearTimeout(resizeArrow);
        }

        contact_inputs_arrow.style = '';
    }

    contact_submit_btn.addEventListener("mouseenter", () => {
        arrowIn();
    });

    contact_submit_btn.addEventListener("mouseleave", () => {
        arrowOut();
    });

    contact_submit_btn.addEventListener("focusin", () => {
        arrowIn();
    });

    contact_submit_btn.addEventListener("focusout", () => {
        arrowOut();
    });

    contact_submit_btn.addEventListener("click", (e) => {
        e.preventDefault();
        contact_submit.classList.add('pending');

        fetch('./back/contact.php').then((response) => response.json()).then((result) => {
            if(result.success) {
                setTimeout(() => {
                    contact_submit.classList.remove('pending');
                    contact_submit.classList.add('success');

                    setTimeout(() => {
                        contact_submit.classList.remove('success');
                    }, 4000);
                }, 400);
            } else {
                setTimeout(() => {
                    contact_submit.classList.remove('pending');
                }, 400);
            }
        });
    });
}

window.addEventListener('resize', () => {
    if(contact_inputs.length > 0) {
        for (let i = 0; i < contact_inputs.length; i++) {
            contact_inputs[i].parentNode.querySelector('label').style = '--left-value: ' + (contact_inputs[i].parentNode.getBoundingClientRect().width - contact_inputs[i].parentNode.querySelector('label').getBoundingClientRect().width - 10) + 'px; transition: none;';
        }
    }
});