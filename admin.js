document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Fetch admin data from JSON file
    fetch('admin.json')
        .then(response => response.json())
        .then(data => {
            // Check if username and password match any admin in the JSON data
            var admins = data.admins;
            var loginSuccessful = false;
            for (var i = 0; i < admins.length; i++) {
                if (admins[i].username === username && admins[i].password === password) {
                    loginSuccessful = true;
                    break;
                }
            }

            // Display login status
            var loginStatus = document.getElementById('loginStatus');
            if (loginSuccessful) {
                localStorage.setItem('isLoggedIn', 'true');
                // Redirect to admin panel on successful login
                window.location.href = 'admin1.html';
                history.replaceState(null, '', 'admin1.html');
               // window.history.replaceState({}, document.title, 'admin1.html');
            } else {
                loginStatus.textContent = 'Login failed. Please try again.';
                loginStatus.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error fetching admin data:', error); 
        });
});
