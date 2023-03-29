/* CONTACT */

const contact_inputs = document.querySelectorAll(".contact-form input, .contact-form textarea");
const contact_inputs_errors = document.querySelectorAll('.contact-form .contact-form__inputs__errors');
const contact_submit = document.querySelector('.contact-form .contact-form__inputs__submit');
const contact_submit_btn = document.querySelector('.contact-form .contact-form__inputs__submit button');
const contact_inputs_arrow = document.querySelector('.contact-form .contact-form__inputs__submit__arrow');
const contact_form = document.getElementById('contact-form');

if(contact_inputs.length > 0 && contact_submit) {
    for (let i = 0; i < contact_inputs.length; i++) {
        contact_inputs[i].addEventListener("focusin", (e) => {
            //remove error
            contact_inputs_errors[i].classList.remove('show');

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

        var formData = new FormData(contact_form);
        var nb_errors = 0;

        //check error form
        for(let input of formData.entries()) {
            let input_name = input[0];
            let input_value = input[1];

            var input_error = document.getElementsByName(input_name)[0].parentNode.children[0];
            var error = false;

            if(!input_value) {
                nb_errors++;
                error = true;
                input_error.classList.add('show');
                input_error.innerHTML = 'Ce champ est requis.';
            }

            if(!error) {
                switch(input_name) {
                    case 'firstname':
                    case 'lastname':
                        if(input_value.length > 46) {
                            nb_errors++;
                            input_error.classList.add('show');
                            input_error.innerHTML = 'Ce champ est trop long.';
                            break;
                        }
                        break;
                    
                    case 'email':
                        if(input_value.length > 80) {
                            nb_errors++;
                            input_error.classList.add('show');
                            input_error.innerHTML = 'Ce champ est trop long.';
                            break;
                        }
    
                        if(!(validateEmail(input_value))) {
                            nb_errors++;
                            input_error.classList.add('show');
                            input_error.innerHTML = 'Email invalide.';
                            break;
                        }
                        break;
    
                    case 'content': 
                        if(input_value.length > 1200) {
                            nb_errors++;
                            input_error.classList.add('show');
                            input_error.innerHTML = 'Ce champ est trop long.';
                            break;
                        }
                        break;
                }
            }
        }

        if(nb_errors > 0) {
            contact_submit.classList.remove('pending');
        } else {
            fetch('./back/contact.php', {
                method: 'POST',
                body: formData,
            }).then((response) => response.json()).then((result) => {
                if(result.success) {
                    setTimeout(() => {
                        contact_submit.classList.remove('pending');
                        contact_submit.classList.add('success');
                        toast('success', 'Votre message m\'a bien été envoyé !');

                        setTimeout(() => {
                            contact_submit.classList.remove('success');
                        }, 4000);
                    }, 400);
                } else {
                    setTimeout(() => {
                        contact_submit.classList.remove('pending');

                        if(result.error) {
                            toast('danger', result.error);
                        } else {
                            toast('danger', 'Une erreur est survenue, veuillez réessayer.');
                        }
                    }, 400);
                }
            });
        }
    });
}

window.addEventListener('resize', () => {
    if(contact_inputs.length > 0) {
        for (let i = 0; i < contact_inputs.length; i++) {
            contact_inputs[i].parentNode.querySelector('label').style = '--left-value: ' + (contact_inputs[i].parentNode.getBoundingClientRect().width - contact_inputs[i].parentNode.querySelector('label').getBoundingClientRect().width - 10) + 'px; transition: none;';
        }
    }
});

function toast(type, message) {
    let toast = document.querySelector('.toast');

    toast.classList.add(`toast--${type}`);
    toast.querySelector('p').innerHTML = message;
    contact_submit_btn.setAttribute("disabled", "");

    setTimeout(() => {
        toast.classList.add('remove');

        setTimeout(() => {
            toast.classList.remove(`toast--${type}`);
            toast.classList.remove('remove');
            contact_submit_btn.removeAttribute("disabled");
        }, 600);
    }, 3000);
}

function validateEmail (email) {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};