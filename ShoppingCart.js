let Cartitems = null;
const storedCart = localStorage.getItem('cart');

// Parse the JSON data back into an array
const cart = storedCart ? JSON.parse(storedCart) : [];

console.log(cart);

Cartitems = cart;
addCartData();

function addCartData() {
    try {
        let listProductHTML = document.querySelector('.cart');

        if (Cartitems != null) {
            Cartitems.forEach(item => {

                let newProduct = document.createElement('div');
                newProduct.classList.add('productRow');
                newProduct.dataset.productId = item.ID;
                newProduct.innerHTML =
                    `<a href='/ItemDetail.html?id=${item.ID}'><img src="${item.Image}" alt="${item.Category} image" width="100px" height="100px"></a>
                    <a href='/ItemDetail.html?id=${item.ID}'><h2 class="ProductName">${item.Name}<br><span>${item.Price}EGP</span><br>ID: ${item.ID}</h2></a>
                <div class="counter">
                    <span class="down" onClick="decreaseCount(event, this)">-</span>
                    <input class="number" type="text" value="${item.quantity}">
                    <span class="up" onClick="increaseCount(event, this)">+</span>     
                </div>`;
                listProductHTML.appendChild(newProduct);
                console.log(newProduct);

            });

        }

        // Ensure this line is placed in the appropriate context
        updateTotalCartPrice();

    }
    catch (error) {
        console.error('An error occurred:', error.message);
    }
}


function increaseCount(event, button) {
    var input = button.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;

    // Get the product ID from the parent div
    var productId = button.closest('.productRow').dataset.productId;

    // Find the corresponding item in the cart array
    var cartItem = cart.find(item => item.ID === productId);

    if (cartItem) {
        // Update the quantity in the cart array
        cartItem.quantity = value;

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        console.log('Updated Cart:', cart);
    }

    // Recalculate and display the total cart price
    updateTotalCartPrice();
}


function decreaseCount(event, button) {
    var input = button.nextElementSibling;
    var value = parseInt(input.value, 10);

    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;

        // Get the product ID from the parent div
        var productId = button.closest('.productRow').dataset.productId;

        // Find the corresponding item in the cart array
        var cartItem = cart.find(item => item.ID === productId);

        if (cartItem) {
            // Update the quantity in the cart array
            cartItem.quantity = value;

            // Update the total price based on the new quantity and price
            cartItem.totalPrice = value * cartItem.Price;

            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            console.log('Updated Cart:', cart);
        }

        // Recalculate and display the total cart price
        updateTotalCartPrice();
    } else {
        // Remove the item from the cart array if the quantity reaches 0
        var updatedCart = cart.filter(item => item.ID !== productId);

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        console.log('Updated Cart:', updatedCart);

        // Remove the corresponding item from the HTML
        button.closest('.productRow').remove();

        // Recalculate and display the total cart price
        updateTotalCartPrice();
    }
}

function calculateTotalPrice() {
    let totalPrice = 0;

    if (Cartitems != null) {
        Cartitems.forEach(item => {
            totalPrice += item.quantity * item.Price;
        });
    }

    return totalPrice;
}

// Function to update and display the total cart price
function updateTotalCartPrice() {
    const totalCartPrice = calculateTotalPrice();
    let total = document.querySelector('#totalPrice');
    total.innerHTML = `${totalCartPrice} EGP`;
    console.log('Total Cart Price:', totalCartPrice);

    // You can update the total price on the page or perform other actions with it
}

// function clearCart() {
//     cart.length = 0; // Set the array length to 0 to empty it
//     localStorage.removeItem('cart'); // Remove the cart key from localStorage
//     console.log('Cart Cleared:', cart);
// } check



function placeOrder() {

    console.log(JSON.stringify(cart));
    fetch('http://localhost/webproject/place_order.php', {
        method: "POST",
        body: JSON.stringify(cart),
    }).then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        if (response.headers.get('content-type') && response.headers.get('content-type').includes('application/json')) {
            return response.json();
        } else {
            // If the response is not JSON, handle it as text
            return response.text();
        } // Return the parsed JSON here
    }).then(function (data) {
        console.log(data); // Now you can work with the parsed JSON data
    }).catch(function (error) {
        console.error('There was a problem with the fetch operation:', error);
    });
    localStorage.removeItem('cart');
    window.location = "shipping.php";
}

