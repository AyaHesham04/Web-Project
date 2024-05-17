// document.addEventListener('DOMContentLoaded', function () {
//     const addToCartButtons = document.querySelectorAll('.add-to-cart');
//     const cartCountElement = document.getElementsByClassName('cart-number');
//     let cartCount = 0;

//     function updateCartCount() {
//         if (cartCountElement && cartCountElement.length > 0) {
//             cartCountElement[0].textContent = cartCount;
//         }
//     }

//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', function (event) {

//             cartCount++;
//             updateCartCount();

//             const buttonRect = button.getBoundingClientRect();
//             const buttonCenterX = buttonRect.left + buttonRect.width / 2;
//             const buttonCenterY = buttonRect.top + buttonRect.height / 2;

//             const svgCart = createSvgCart();
//             document.body.appendChild(svgCart);

//             svgCart.style.left = `${buttonCenterX}px`;
//             svgCart.style.top = `${buttonCenterY}px`;

//             const cartIcon = document.querySelector('.material-symbols-outlined');
//             const cartIconRect = cartIcon.getBoundingClientRect();
//             const cartIconCenterX = cartIconRect.left + cartIconRect.width / 2;
//             const cartIconCenterY = cartIconRect.top + cartIconRect.height / 2;

//             const animation = svgCart.animate(
//                 [
//                     { transform: `translate(0, 0)` },
//                     { transform: `translate(${cartIconCenterX - buttonCenterX}px, ${cartIconCenterY - buttonCenterY}px)` }
//                 ],
//                 {
//                     duration: 2500,
//                     easing: 'ease-out'
//                 }
//             );
//             animation.onfinish = () => {
//                 svgCart.remove();
//             };
//         });
//     });

//     function createSvgCart() {
//         const svgNS = 'http://www.w3.org/2000/svg';
//         const svgCart = document.createElementNS(svgNS, 'svg');
//         svgCart.setAttribute('width', '16');
//         svgCart.setAttribute('height', '16');
//         svgCart.setAttribute('fill', 'currentColor');
//         svgCart.setAttribute('class', 'bi bi-cart');
//         svgCart.setAttribute('viewBox', '0 0 16 16');
//         svgCart.innerHTML = '<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>';
//         svgCart.style.position = 'fixed';
//         svgCart.style.zIndex = '1000';
//         svgCart.style.pointerEvents = 'none';
//         return svgCart;
//     }

// });


let mybutton = document.getElementById("myBtn");

function topFunction() {
    document.documentElement.scrollTop = 0;
}

