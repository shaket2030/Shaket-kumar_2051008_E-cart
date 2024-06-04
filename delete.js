document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    var productId = document.getElementById('productId').value;

    // Send a DELETE request to delete the product
    fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete product.');
        }
        return response.json();
    })
    .then(deletedProduct => {
        // Handle successful deletion
        console.log('Product deleted successfully:', deletedProduct.message);
        alert('Product deleted successfully!');
        window.location.href = '/index.html'; // Redirect to index.html after successful deletion
    })
    .catch(error => {
        // Handle fetch error or server-side error
        console.error('Delete failed:', error);
        alert('Failed to delete product. Please try again.');
    });
});
