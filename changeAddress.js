document.addEventListener('DOMContentLoaded', () => {
    const addressListElement = document.getElementById('addressList');
    const deliverHereButton = document.getElementById('deliverHereButton');
    const addaddress=document.getElementById('addAddressButton');
    let selectedAddressId = null;

    // Fetch and display existing addresses
    async function fetchAddresses() {
        try {
            const response = await fetch('/getAddresses', { credentials: 'same-origin' });
            const addresses = await response.json();
            
            addresses.forEach(address => {
                const addressItem = document.createElement('div');
                addressItem.classList.add('address-item');
                addressItem.innerHTML = `
                    <div>
                        <input type="radio" name="selectedAddress" value="${address.id}" id="address-${address.id}">
                        <label for="address-${address.id}">
                            ${address.name}, ${address.phone}, ${address.street}, ${address.city}, 
                            ${address.state}, ${address.zip}, ${address.country}
                        </label>
                    </div>
                    <button class="btn edit-button">Edit</button>
                `;
                addressListElement.appendChild(addressItem);

                // Add event listener to radio button
                addressItem.querySelector(`input[type="radio"]`).addEventListener('change', (e) => {
                    selectedAddressId = e.target.value;
                });

                // Add event listener to edit button
                addressItem.querySelector('.edit-button').addEventListener('click', () => {
                    // Code to handle editing address
                    localStorage.setItem('editAddressId', address.id);
                    window.location.href = 'editaddress1.html';
                });
            });
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    }

    addaddress.addEventListener('click',()=>{
        window.location.href = 'address1.html';


    });

    // Handle "Deliver Here" button click
    deliverHereButton.addEventListener('click', () => {
        if (!selectedAddressId) {
            alert('Please select an address');
            return;
        }

        // Save the selected address ID to localStorage
        localStorage.setItem('selectedAddressId', selectedAddressId);
        console.log("sent"+localStorage.getItem('selectedAddressId'));

        // Redirect to the order summary page
        window.location.href = 'ordersummary.html';
    });

    // Fetch addresses on page load
    fetchAddresses();
});
