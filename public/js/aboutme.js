/* ABOUT ME */

var slideshow_img = document.querySelectorAll('.slideshow__imgs__img');
var slideshow_locations = document.querySelectorAll('.slideshow__locations__location');

const slideshow = document.querySelector('.slideshow__imgs');
const slideshow_location = document.querySelector('.slideshow__locations');
const slideshow_length = slideshow_img.length;

const disableScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
};

//disable scroll for imgs
slideshow.addEventListener('wheel', disableScroll, { passive: false });
slideshow.addEventListener('touchmove', disableScroll, { passive: false });

//disable scroll for location
slideshow_location.addEventListener('wheel', disableScroll, { passive: false });
slideshow.addEventListener('touchmove', disableScroll, { passive: false });

setTimeout(() => {
    slide_show();
}, 500);

function slide_show() {
    slideshow_img = document.querySelectorAll('.slideshow__imgs__img');
    let img_count = 0;
    let location_count = 1;
    let replay;
    let location_replay;
    let scroll_value;

    let slide_show_interval = setInterval(() => {
        //images
        replay = img_count == slideshow_img.length / 2;

        scroll_value = 0;
        for(let i = 0; i < img_count + 1; i++) {
            scroll_value += slideshow_img[i].getBoundingClientRect().width + 20;
        }
        
        slideshow.scroll({
            left:  replay ? 0 : scroll_value,
            behavior: replay ? 'auto' : 'smooth'
        });

        img_count = replay ? 0 : img_count + 1;

        //locations
        if(!replay) {
            location_replay = location_count + 1 == slideshow_img.length / 2;
    
            //locations
            for (let j = 0; j < slideshow_locations.length; j++) {
                slideshow_locations[j].classList.remove('visible');
            }
    
            slideshow_location.style = `max-width: ${slideshow_locations[location_count].getBoundingClientRect().width}px;`;
            slideshow_location.scroll({
                top: location_count ? slideshow_location.scrollTop + slideshow_locations[location_count].getBoundingClientRect().height + 20 : 0,
                behavior: 'smooth'
            });
            slideshow_locations[location_count].classList.add('visible');
    
            location_count = location_replay ? 0 : location_count + 1;
        }
    }, 6000)
}
