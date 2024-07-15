const deliveryAddressElement = document.getElementById('deliveryAddress');
const orderTableBody = document.getElementById('orderTableBody');
const orderTotalPriceElement = document.getElementById('orderTotalPrice');


async function fetchDefaultAddress() {
    try {
        
        let selectedAddressId = localStorage.getItem('selectedAddressId');

        
        if (!selectedAddressId) {
            selectedAddressId = '1';
            localStorage.setItem('selectedAddressId', selectedAddressId);
        }
        console.log("sent"+localStorage.getItem('selectedAddressId'));

        
        const response = await fetch(`/getAddresses/${selectedAddressId}`, { credentials: 'same-origin' });
        const defaultAddress = await response.json();

        
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



async function fetchOrderContents() {
    try {
        const response = await fetch('/cart-contents', { credentials: 'same-origin' });
        const cartData = await response.json();

        
        orderTableBody.innerHTML = '';
        let totalPrice = 0;

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


fetchDefaultAddress();
fetchOrderContents();
