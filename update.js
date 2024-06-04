// document.getElementById('updateForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     const productId = document.getElementById('productId').value;
//     const name = document.getElementById('name').value;
//     const product_number = document.getElementById('product_number').value;
//     const color = document.getElementById('color').value;
//     const size = document.getElementById('size').value;
//     const price = document.getElementById('price').value;

//     const updateData = {
//         name: name,
//         product_number: product_number,
//         color: color,
//         size: size,
//         price: price
//     };

//     fetch(`/api/products/${productId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updateData)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to update product.');
//         }
//         return response.json();
//     })
//     .then(updatedProduct => {
//         const updateStatus = document.getElementById('updateStatus');
//         updateStatus.textContent = `Product updated successfully: ${updatedProduct.name} (ID: ${updatedProduct.id})`;
//         updateStatus.style.color = 'green';
//     })
//     .catch(error => {
//         console.error('Update failed:', error);
//         const updateStatus = document.getElementById('updateStatus');
//         updateStatus.textContent = 'Failed to update product. Please try again.';
//         updateStatus.style.color = 'red';
//     });
// });
// document.getElementById('updateForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     var productId = document.getElementById('productId').value;
//     var name = document.getElementById('name').value;
//     var product_number = document.getElementById('product_number').value;
//     var color = document.getElementById('color').value;
//     var size = document.getElementById('size').value;
//     var price = document.getElementById('price').value;

//     // const updateData = {
//     //     product_name: name,
//     //     product_number: product_number,
//     //     color: color,
//     //     size: size,
//     //     price: price
//     // };
//     // console.log(updateData);

//     fetch(`/api/products/${productId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         // body: JSON.stringify(updateData)
//         body: JSON.stringify({
//             product_name: productName,
//             product_number: productNumber,
//             color: color,
//             size: size,
//             price: price
//         })
        
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to update product.');
//         }
//         return response.json();
//     })
//     .then(updatedProduct => {
//         // Handle successful update
//         console.log('Product updated successfully:', updatedProduct);
//         alert('Product updated successfully!');
//         window.location.href = '/index.html'; // Redirect to index.html or desired page
//     })
//     .catch(error => {
//         // Handle fetch error or server-side error
    
//         console.error('Update failed:', error);
//         alert('Failed to update product. Please try again.');
//     });
// });

// document.getElementById('updateForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     var productId = document.getElementById('productId').value;
//     var name = document.getElementById('name').value;
//     var productNumber = document.getElementById('product_number').value; // Corrected variable name
//     var color = document.getElementById('color').value;
//     var size = document.getElementById('size').value;
//     var price = document.getElementById('price').value;

//     // Prepare the update data object
//     var updateData = {
//         product_name: name, // Use product_name instead of name
//         product_number: productNumber, // Use product_number instead of product_number
//         color: color,
//         size: size,
//         price: price
//     };

//     // Send a PUT request to update the product
//     fetch(`/api/products/${productId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updateData) // Send the updateData object as JSON in the request body
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to update product.');
//         }
//         return response.json();
//     })
//     .then(updatedProduct => {
//         // Handle successful update
//         console.log('Product updated successfully:', updatedProduct);
//         alert('Product updated successfully!');
//         window.location.href = '/admin1.html'; // Redirect to index.html after successful update
//     })
//     .catch(error => {
//         // Handle fetch error or server-side error
//         console.error('Update failed:', error);
//         alert('Failed to update product. Please try again.');
//     });
// });

document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    var productId = document.getElementById('productId').value;

    // Get all form input values
    var name = document.getElementById('name').value;
    var productNumber = document.getElementById('product_number').value;
    var color = document.getElementById('color').value;
    var size = document.getElementById('size').value;
    var price = document.getElementById('price').value;

    // Prepare the update data object
    var updateData = {};

    // Add fields to updateData only if they are filled out in the form
    if (name.trim() !== '') {
        updateData.product_name = name;
    }
    if (productNumber.trim() !== '') {
        updateData.product_number = productNumber;
    }
    if (color.trim() !== '') {
        updateData.color = color;
    }
    if (size.trim() !== '') {
        updateData.size = size;
    }
    if (price.trim() !== '') {
        updateData.price = price;
    }

    // Send a PUT request to update the product
    fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData) // Send the updateData object as JSON in the request body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update product.');
        }
        return response.json();
    })
    .then(updatedProduct => {
        // Handle successful update
        console.log('Product updated successfully:', updatedProduct);
        alert('Product updated successfully!');
        window.location.href = '/admin1.html'; // Redirect to admin1.html after successful update
    })
    .catch(error => {
        // Handle fetch error or server-side error
        console.error('Update failed:', error);
        alert('Failed to update product. Please try again.');
    });
});

