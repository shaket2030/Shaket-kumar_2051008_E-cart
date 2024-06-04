document.getElementById('createProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    var productName = document.getElementById('productName').value;
    var productNumber = document.getElementById('productNumber').value;
    var color = document.getElementById('color').value;
    var size = document.getElementById('size').value;
    var price = document.getElementById('price').value;

    // Send data to the server to add new product
    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_name: productName,
            product_number: productNumber,
            color: color,
            size: size,
            price: price
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Product added successfully!');
            // Redirect to admin panel (admin.html) after successful addition
            window.location.href = '/admin1.html';
        } else {
            throw new Error('Failed to add product');
        }
    })
    .catch(error => {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
    });
});
