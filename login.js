document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

   
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    
    fetch('user.json')
        .then(response => response.json())
        .then(data => {
            
            var users = data.users;
            var loginSuccessful = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password) {
                    loginSuccessful = true;
                    break;
                }
            }

            
            var loginStatus = document.getElementById('loginStatus');
            if (loginSuccessful) {
                localStorage.setItem('isLoggedIn', 'true');
                
               
                
                window.location.href = 'index.html';
              history.replaceState(null, '', 'index.html');
               
            } else {
                loginStatus.textContent = 'Login failed. Please try again.';
                loginStatus.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
});



