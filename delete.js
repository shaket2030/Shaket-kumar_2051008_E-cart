document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var productId = document.getElementById('productId').value;

    
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
        
        console.log('Product deleted successfully:', deletedProduct.message);
        alert('Product deleted successfully!');
        window.location.href = '/index.html'; 
    })
    .catch(error => {
        
        console.error('Delete failed:', error);
        alert('Failed to delete product. Please try again.');
    });
});
