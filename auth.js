// Check authentication status
function checkAuthentication() {
    fetch('/checkAuth') // Send a GET request to the server to check authentication
      .then(response => {
        if (response.ok) {
          // User is authenticated, redirect to index.html
          console.log("working");
          window.location.href = '/index.html';
        } else {
            console.log("working ok");
            
          // User is not authenticated, do nothing (continue on the current page)
        }
      })
      .catch(error => {
        console.error('Error checking authentication status:', error);
      });
  }
  
  // Execute checkAuthentication when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', checkAuthentication);
  