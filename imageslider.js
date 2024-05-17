const imageWrapper = document.querySelector('.image-wrapper')
const imageItems = document.querySelectorAll('.image-wrapper > *')
const imageLength = imageItems.length
const perView = 3 // perview --> no.of images to display per view
let totalScroll = 0 //no.of scrolls
const delay = 2000


imageWrapper.style.gridAutoColumns = `calc((100% - (24px * (${perView} - 1))) / ${perView})`;
for(let i = 0; i < perView; i++) {
  imageWrapper.insertAdjacentHTML('beforeend', imageItems[i].outerHTML)
  //beforend specifies point of inserting images as the last in the imageWrapper
  //outerHTML -> image as a string with its opening and closing tags
}

let autoScroll = setInterval(scrolling, delay)
//setIntervals calles function scrolling according to delay


function scrolling() {
  totalScroll++
  if(totalScroll == imageLength + 1) //when gallery ends, completes full cycle
  {
    clearInterval(autoScroll); //clears interval, stops auto-scrolling
    totalScroll = 1; //new cycle
    imageWrapper.style.transition = '0s'; //reset transition
    imageWrapper.style.left = '0'; //transition at beginning of cycle
    autoScroll = setInterval(scrolling, delay); 
  }
  const widthEl = document.querySelector('.image-wrapper > :first-child').offsetWidth + 24; //width of first element plus 24
  imageWrapper.style.left = `-${totalScroll * widthEl}px`; //negative to shift left
  imageWrapper.style.transition = '.3s';
}