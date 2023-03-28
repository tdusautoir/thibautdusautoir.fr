/* ABOUT ME */

var slideshow_img = document.querySelectorAll('.slideshow__imgs__img');
var slideshow_locations = document.querySelectorAll('.slideshow__locations__location');

const slideshow = document.querySelector('.slideshow__imgs');
const slideshow_location = document.querySelector('.slideshow__locations');
const slideshow_length = slideshow_img.length;

slide_show();

function slide_show() {
    slideshow_img = document.querySelectorAll('.slideshow__imgs__img');

    //images
    if(slideshow_img.length > slideshow_length) {
        for(let i = 0; i < slideshow_length; i++) {
            slideshow_img[i].remove();    
            slideshow.scrollLeft = 0;
        }
    }

    slideshow_img = document.querySelectorAll('.slideshow__imgs__img');

    //quotes 
    slideshow_location.style = `max-width: ${slideshow_locations[0].getBoundingClientRect().width}px;`;
    for(let j = 0; j < slideshow_locations.length; j++) {
        slideshow_locations[j].classList.remove('visible');
    }
    slideshow_locations[0].classList.add('visible');

    for(let i = 0; i < slideshow_img.length; i++) {
        setTimeout(() => {

            //images
            slideshow.scroll({
                left: slideshow.scrollLeft + slideshow_img[i].getBoundingClientRect().width + 20,
                behavior: "smooth",
            });
        
            slideshow.appendChild(slideshow_img[i].cloneNode());

            //quotes
            for(let j = 0; j < slideshow_locations.length; j++) {
                slideshow_locations[j].classList.remove('visible');
            }

            let location_index = slideshow_locations[i + 1] !== undefined ? i + 1 : 0;          
            slideshow_location.style = `max-width: ${slideshow_locations[location_index].getBoundingClientRect().width}px;`;

            slideshow_location.scroll({
                top: location_index !== 0 ? slideshow_location.scrollTop + slideshow_locations[location_index].getBoundingClientRect().height + 20 : 0,
                behavior: "smooth",
            });

            for(let j = 0; j < slideshow_locations.length; j++) {
                slideshow_locations[j].classList.remove('visible');
            }
            slideshow_locations[location_index].classList.add('visible');
            
            if(i + 1 == slideshow_img.length) {
                setTimeout(() => {
                    slide_show();
                }, 800);
            }
        }, (i + 1) * 6000);
    }
}
