
let mybutton = document.getElementById("topbutton");

function topFunction() {
    document.documentElement.scrollTop = 0;
}

let products = null;
// get datas from file json
fetch('http://localhost/Products/SingleItem.php', {
    method: "POST"
})
    .then(response => response.json())
    .then(data => {
        products = data;
        showDetail();
    })
    .catch(error => {
        console.error('Error:', error);
    });

function showDetail() {
    // remove datas default from HTML
    let detail = document.querySelector('.detail');
    let listProduct = document.querySelector('.listProduct');
    let productId = new URLSearchParams(window.location.search).get('id');
    let thisProduct = products.filter(value => value.Product_ID == productId)[0];
    console.log(thisProduct);

    //if there is no product with id = productId => return to home page
    if (!thisProduct) {
        window.location.href = "/";
    }

    detail.querySelector(".image img").src = thisProduct.Product_Image;
    detail.querySelector('.name').innerText = thisProduct.Product_Name;
    detail.querySelector('.price').innerText = thisProduct.Product_Price + " EGP";
    detail.querySelector('.description').innerText = thisProduct.Product_Description;
    detail.querySelector('.addcart-button').onclick = function () {
        CartData(thisProduct.Product_ID, thisProduct.Product_Image, thisProduct.Product_CategoryName, thisProduct.Product_Name, thisProduct.Product_Price);
    };



    //to display only 4 products in similar products from the same category as current product

    //to find id of the current product from the array
    const product = products.find(value => value.Product_ID == productId);

    if (product) {

        //to filter products array with only products of same category as current
        const productsInSameCategory = products.filter(value => value.Product_CategoryNum === product.Product_CategoryNum);

        //to display RANDOMLY products from same category
        const shuffledProducts = shuffleArray(productsInSameCategory);

        //to display only 4 from the shuffled outcome
        const productsToDisplay = shuffledProducts.slice(0, 4);

        productsToDisplay.forEach(product => {
            let newProduct = document.createElement('a');
            newProduct.href = 'http://localhost/webproject/ItemDetail.html?id=' + product.Product_ID;
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<img src="${product.Product_Image}" alt="">
                         <h2 class="productName">${product.Product_Name}</h2>
                         <div class="price">${product.Product_Price} EGP</div>`;
            listProduct.appendChild(newProduct);
        });
    }


    function shuffleArray(array) {
        // Loop through the array in reverse order
        for (let i = array.length - 1; i > 0; i--) {

            //j is a random index from 0 to i
            //math.floor makes the decimal value from math.random into integer(javascript functions)
            const j = Math.floor(Math.random() * (i + 1));

            // Swap the elements at indices i and j to shuffle uniformally and ensure randomness
            let temp = [array[j], array[i]];
            [array[i], array[j]] = temp;
        }
        return array;
    }


}


function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
}

function decreaseCount(a, b) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;
    }
}

// document.addEventListener('DOMContentLoaded', function () {
//     const addToCartButtons = document.querySelectorAll('.cart-button');
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



const storedCart = localStorage.getItem('cart');

// Parse the JSON data back into an array or create a new array if no data exists
const cart = storedCart ? JSON.parse(storedCart) : [];

console.log('Initial Cart:', cart);

function CartData(productId, productImage, productCat, productName, productPrice,) {

    const existingProduct = cart.find(item => item.ID === productId);

    if (existingProduct) {
        // If the product exists, update the quantity
        existingProduct.quantity++;
    } else {
        const data = {
            ID: productId,
            Image: productImage,
            Category: productCat,
            Name: productName,
            Price: productPrice,
            quantity: 1,
        };

        cart.push(data);
    }
    console.log('Updated Cart:', cart);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

}
function clearCart() {
    cart.length = 0; // Set the array length to 0 to empty it
    localStorage.removeItem('cart'); // Remove the cart key from localStorage
    console.log('Cart Cleared:', cart);
}
// // Log the final cart after page load
// window.onload = function clearCart() {
//     cart.length = 0; // Set the array length to 0 to empty it
//     localStorage.removeItem('cart'); // Remove the cart key from localStorage
//     console.log('Cart Cleared:', cart);
// };


