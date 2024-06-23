function checkAuthentication() {
    fetch('/checkAuth') 
      .then(response => {
        if (response.ok) {
         
          console.log("working");
          window.location.href = '/index.html';
        } else {
            console.log("working ok");
            
          
        }
      })
      .catch(error => {
        console.error('Error checking authentication status:', error);
      });
  }
  
  
  document.addEventListener('DOMContentLoaded', checkAuthentication);
  
