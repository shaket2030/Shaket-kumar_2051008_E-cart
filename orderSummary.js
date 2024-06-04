// const deliveryAddressElement = document.getElementById('deliveryAddress');
// const orderTableBody = document.getElementById('orderTableBody');
// const orderTotalPriceElement = document.getElementById('orderTotalPrice');

// // Function to fetch and display the default delivery address
// async function fetchDefaultAddress() {
//     try {
//         const response = await fetch('/addressdetails', { credentials: 'same-origin' });
//         const defaultAddress = await response.json();
//         console.log(defaultAddress);

//         deliveryAddressElement.textContent = `
//             ${defaultAddress.name}, ${defaultAddress.phone}, 
//             ${defaultAddress.street}, ${defaultAddress.city}, 
//             ${defaultAddress.state}, ${defaultAddress.zip}, 
//             ${defaultAddress.country}
//         `;
//     } catch (error) {
//         console.error('Error fetching address:', error);
//     }
// }

// // Function to fetch and display the cart contents
// async function fetchOrderContents() {
//     try {
//         const response = await fetch('/cart-contents', { credentials: 'same-origin' });
//         const cartData = await response.json();

//         // Clear previous table content
//         orderTableBody.innerHTML = '';
//         let totalPrice = 0;

//         // Populate table with cart contents
//         cartData.forEach(item => {
//             const row = document.createElement('tr');
//             const itemPrice = parseFloat(item.price.replace('$', ''));
//             const itemQuantity = parseInt(item.quantity, 10);
//             const itemTotal = itemPrice * itemQuantity;

//             row.innerHTML = `
//                 <td>${item.product_name}</td>
//                 <td>${item.product_number}</td>
//                 <td>${item.color}</td>
//                 <td>${item.size}</td>
//                 <td>${item.price}</td>
//                 <td>${item.quantity}</td>
//                 <td>${itemTotal.toFixed(2)}</td>
//             `;
//             orderTableBody.appendChild(row);
//             totalPrice += itemTotal;
//         });

//         orderTotalPriceElement.textContent = totalPrice.toFixed(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
//     } catch (error) {
//         console.error('Error fetching order contents:', error);
//     }
// }
// document.getElementById('changeAddressButton').addEventListener('click', () => {
//     window.location.href = 'changeAddress.html';
//     console.log("redirecting");
// });


// // Call fetch functions when the page is loaded
// fetchDefaultAddress();
// fetchOrderContents();
const deliveryAddressElement = document.getElementById('deliveryAddress');
const orderTableBody = document.getElementById('orderTableBody');
const orderTotalPriceElement = document.getElementById('orderTotalPrice');

// Function to fetch and display the default delivery address
async function fetchDefaultAddress() {
    try {
        // Retrieve the selected address ID from localStorage
        let selectedAddressId = localStorage.getItem('selectedAddressId');

        // If no address ID is found in localStorage, set it to 1
        if (!selectedAddressId) {
            selectedAddressId = '1';
            localStorage.setItem('selectedAddressId', selectedAddressId);
        }
        console.log("sent"+localStorage.getItem('selectedAddressId'));

        // Fetch the default address from the server based on the selected address ID
        const response = await fetch(`/getAddresses/${selectedAddressId}`, { credentials: 'same-origin' });
        const defaultAddress = await response.json();

        // Display the fetched address information
        deliveryAddressElement.textContent = `
            ${defaultAddress.name}, ${defaultAddress.phone}, 
            ${defaultAddress.street}, ${defaultAddress.city}, 
            ${defaultAddress.state}, ${defaultAddress.zip}, 
            ${defaultAddress.country}
        `;
    } catch (error) {
        console.error('Error fetching default address:', error);
    }
}

// Function to fetch and display the cart contents
async function fetchOrderContents() {
    try {
        const response = await fetch('/cart-contents', { credentials: 'same-origin' });
        const cartData = await response.json();

        // Clear previous table content
        orderTableBody.innerHTML = '';
        let totalPrice = 0;

        // Populate table with cart contents
        cartData.forEach(item => {
            const row = document.createElement('tr');
            const itemPrice = parseFloat(item.price.replace('$', ''));
            const itemQuantity = parseInt(item.quantity, 10);
            const itemTotal = itemPrice * itemQuantity;

            row.innerHTML = `
                <td>${item.product_name}</td>
                <td>${item.product_number}</td>
                <td>${item.color}</td>
                <td>${item.size}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${itemTotal.toFixed(2)}</td>
            `;
            orderTableBody.appendChild(row);
            totalPrice += itemTotal;
        });

        orderTotalPriceElement.textContent = totalPrice.toFixed(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } catch (error) {
        console.error('Error fetching order contents:', error);
    }
}

document.getElementById('changeAddressButton').addEventListener('click', () => {
    window.location.href = 'changeAddress.html';
    console.log("redirecting");
});

// Call fetch functions when the page is loaded
fetchDefaultAddress();
fetchOrderContents();
