const cartTableBody = document.getElementById('cartTableBody');
const totalPriceElement = document.getElementById('totalPrice');


async function fetchCartContents() {
    try {
        const response = await fetch('/cart-contents', { credentials: 'same-origin' });
        const cartData = await response.json();
        
        console.log("ll"+cartData);

       
        cartTableBody.innerHTML = '';
        let totalprice=0;

        
        cartData.forEach(item => {
            const row = createCartItemRow(item);
            cartTableBody.appendChild(row);
            // console.log(item.price);
            // totalprice+=item.price*item.quantity;
            // console.log(totalprice);
            const itemPrice = parseFloat(item.price.replace('$', ''));
            const itemQuantity = parseInt(item.quantity, 10);
            totalprice += itemPrice * itemQuantity;
            totalprice=Math.round(totalprice*100.0)/100.0;
            console.log(totalprice);
            
        });
        console.log(totalprice);
        totalPriceElement.textContent = totalprice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

      
    } catch (error) {
        console.error('Error fetching cart contents:', error);
    }
}


function createCartItemRow(item) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.product_name}</td>
        <td>${item.product_number}</td>
        <td>${item.color}</td>
        <td>${item.size}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td><button onclick="handleRemove('${item.product_number}')">Remove</button></td>
        <td><button onclick="handleAdd('${item.product_number}')">Add</button></td>
    `;
    return row;
}


async function handleRemove(productNumber) {
    try {
        const response = await fetch(`/remove-item/${productNumber}`, { method: 'DELETE', credentials: 'same-origin' });
        const updatedCartData = await response.json();

       
        fetchCartContents();
    } catch (error) {
        console.error('Error removing item:', error);
    }
}
async function handleAdd(productNumber) {
    try {
        const response = await fetch(`/add-item/${productNumber}`, { method: 'POST', credentials: 'same-origin' });
        const updatedCartData = await response.json();
     

        
        fetchCartContents();
    } catch (error) {
        console.error('Error adding item:', error);
    }
}
document.getElementById('placeOrderButton').addEventListener('click', () => {
    window.location.href = 'orderSummary.html';
});


fetchCartContents();
