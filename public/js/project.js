const navigation_images = document.querySelectorAll('.project-info__site__images img');
const navigation_buttons = document.querySelectorAll('.project-info__site__navigation button');

function navigation(element, value) {
    for(let i = 0; i < navigation_buttons.length; i++) {
        navigation_buttons[i].classList.remove('selected');
    }

    for(let i = 0; i < navigation_images.length; i++) {
        navigation_images[i].classList.remove('show');

        if(value == navigation_images[i].dataset.nav) {
            navigation_images[i].classList.add('show');
        }
    }

    element.classList.add('selected');
}