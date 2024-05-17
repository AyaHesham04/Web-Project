let Grooming = null;
fetch('http://localhost/webproject/Products/Groomingitems.php', {
    method: "POST"
})
    .then(response => response.json())
    .then(data => {
        Grooming = data;
        addDataToHTML();
    })
    .catch(error => {
        console.error('Error:', error);
    });

function addDataToHTML() {
    // remove datas default from HTML
    let listProductHTML = document.querySelector('.productcont');
    listProductHTML.innerHTML = '';

    // add new datas
    if (Grooming != null) // if has data
    {
        Grooming.forEach(item => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('productRow');
            newProduct.classList.add('product-col');
            newProduct.innerHTML =
                `<a href='http://localhost/webproject/ItemDetail.html?id=${item.Product_ID}'><img src="${item.Product_Image}" alt="${item.Product_CategoryName} image" width="200px" height="200px"></a>
            <a href='http://localhost/webproject/ItemDetail.html?id=${item.Product_ID}'><h2 class="ProductName">${item.Product_Name}</h2></a>
            <a href='http://localhost/webproject/ItemDetail.html?id=${item.Product_ID}'><h3 class="Price">${item.Product_Price} EGP</h3></a>
                     <div class="Productbutton">
                        <button class="cart-button" onclick="CartData('${item.Product_ID}','${item.Product_Image}','${item.Product_CategoryName}','${item.Product_Name}', '${item.Product_Price}')">
                            <span class="AddToCart">Add to Cart</span>
                            <span class="material-symbols-outlined">
                             add_shopping_cart
                            </span>
                        </button>
                     </div>`;
            listProductHTML.appendChild(newProduct);

        });
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
// Log the final cart after page load
window.onload = function clearCart() {
    cart.length = 0; // Set the array length to 0 to empty it
    localStorage.removeItem('cart'); // Remove the cart key from localStorage
    console.log('Cart Cleared:', cart);
};


