document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var productId = document.getElementById('productId').value;

    
    var name = document.getElementById('name').value;
    var productNumber = document.getElementById('product_number').value;
    var color = document.getElementById('color').value;
    var size = document.getElementById('size').value;
    var price = document.getElementById('price').value;

   
    var updateData = {};

    
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

    
    fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update product.');
        }
        return response.json();
    })
    .then(updatedProduct => {
       
        console.log('Product updated successfully:', updatedProduct);
        alert('Product updated successfully!');
        window.location.href = '/admin1.html'; 
    })
    .catch(error => {
        
        console.error('Update failed:', error);
        alert('Failed to update product. Please try again.');
    });
});

