document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    
    fetch('admin.json')
        .then(response => response.json())
        .then(data => {
            
            var admins = data.admins;
            var loginSuccessful = false;
            for (var i = 0; i < admins.length; i++) {
                if (admins[i].username === username && admins[i].password === password) {
                    loginSuccessful = true;
                    break;
                }
            }

            
            var loginStatus = document.getElementById('loginStatus');
            if (loginSuccessful) {
                localStorage.setItem('isLoggedIn', 'true');
               
                window.location.href = 'admin1.html';
                history.replaceState(null, '', 'admin1.html');
               
            } else {
                loginStatus.textContent = 'Login failed. Please try again.';
                loginStatus.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error fetching admin data:', error); 
        });
});
