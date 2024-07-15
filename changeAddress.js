document.addEventListener('DOMContentLoaded', () => {
    const addressListElement = document.getElementById('addressList');
    const deliverHereButton = document.getElementById('deliverHereButton');
    const addaddress=document.getElementById('addAddressButton');
    let selectedAddressId = null;

    
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

               
                addressItem.querySelector(`input[type="radio"]`).addEventListener('change', (e) => {
                    selectedAddressId = e.target.value;
                });

                
                addressItem.querySelector('.edit-button').addEventListener('click', () => {
                    
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

    
    deliverHereButton.addEventListener('click', () => {
        if (!selectedAddressId) {
            alert('Please select an address');
            return;
        }

        
        localStorage.setItem('selectedAddressId', selectedAddressId);
        console.log("sent"+localStorage.getItem('selectedAddressId'));

        
        window.location.href = 'ordersummary.html';
    });

    
    fetchAddresses();
});
