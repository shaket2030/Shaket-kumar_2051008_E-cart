// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('editAddressForm');
//     const addressId = localStorage.getItem('editAddressId');

//     async function fetchAddress() {
//         try {
//             const response = await fetch(`/getAddress/${addressId}`, { credentials: 'same-origin' });
//             const address = await response.json();
//             console.log("jjj"+address);
//             document.getElementById('name').value = address.name;
//             document.getElementById('phone').value = address.phone;
//             document.getElementById('street').value = address.street;
//             document.getElementById('city').value = address.city;
//             document.getElementById('state').value = address.state;
//             document.getElementById('zip').value = address.zip;
//             document.getElementById('country').value = address.country;
//         } catch (error) {
//             console.error('Error fetching address:', error);
//         }
//     }

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault();
//         const formData = new FormData(form);
//         const data = {};
//         formData.forEach((value, key) => data[key] = value);

//         try {
//             const response = await fetch(`/updateAddress/${addressId}`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data),
//                 credentials: 'same-origin'
//             });

//             if (response.ok) {
//                 alert('Address updated successfully!');
//                 window.location.href = 'changeaddress.html';
//             } else {
//                 alert('Failed to update address.');
//             }
//         } catch (error) {
//             console.error('Error updating address:', error);
//         }
//     });

//     fetchAddress();
// });
