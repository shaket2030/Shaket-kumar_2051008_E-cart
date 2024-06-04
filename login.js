// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     // Get input values
//     var username = document.getElementById('username').value;
//     var password = document.getElementById('password').value;

//     // Fetch user data from JSON file
//     fetch('user.json')
//         .then(response => response.json())
//         .then(data => {
//             // Check if username and password match any user in the JSON data
//             var users = data.users;
//             var loginSuccessful = false;
//             for (var i = 0; i < users.length; i++) {
//                 if (users[i].username === username && users[i].password === password) {
//                     loginSuccessful = true;
//                     break;
//                 }
//             }

//             // Display login status
//             var loginStatus = document.getElementById('loginStatus');
//             if (loginSuccessful) {
//                 loginStatus.textContent = 'Login successful!';
//                 loginStatus.style.color = 'green';
//             } else {
//                 loginStatus.textContent = 'Login failed. Please try again.';
//                 loginStatus.style.color = 'red';
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching user data:', error);
//         });
// });


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Fetch user data from JSON file
    fetch('user.json')
        .then(response => response.json())
        .then(data => {
            // Check if username and password match any user in the JSON data
            var users = data.users;
            var loginSuccessful = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password) {
                    loginSuccessful = true;
                    break;
                }
            }

            // Display login status
            var loginStatus = document.getElementById('loginStatus');
            if (loginSuccessful) {
                localStorage.setItem('isLoggedIn', 'true');
                
               
                // Redirect to index.html on successful login
                window.location.href = 'index.html';
              history.replaceState(null, '', 'index.html');
               // window.history.replaceState({}, document.title, 'index.html');
            } else {
                loginStatus.textContent = 'Login failed. Please try again.';
                loginStatus.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
});

// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     // Get input values
//     var username = document.getElementById('username').value;
//     var password = document.getElementById('password').value;

//     // Fetch user data from JSON file
//     fetch('user.json')
//         .then(response => response.json())
//         .then(data => {
//             // Check if username and password match any user in the JSON data
//             var users = data.users;
//             var loginSuccessful = false;
//             var loggedInUser = null;
//             for (var i = 0; i < users.length; i++) {
//                 if (users[i].username === username && users[i].password === password) {
//                     loginSuccessful = true;
//                     loggedInUser = users[i].username;
//                     break;
//                 }
//             }

//             // Display login status
//             var loginStatus = document.getElementById('loginStatus');
//             if (loginSuccessful) {
//                 // Set logged-in state in session storage
//                 sessionStorage.setItem('loggedInUser', loggedInUser);

//                 // Redirect to index.html on successful login
//                 window.location.href = 'index.html';
//             } else {
//                 loginStatus.textContent = 'Login failed. Please try again.';
//                 loginStatus.style.color = 'red';
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching user data:', error);
//         });
// });

// // Check if user is logged in on page load
// document.addEventListener('DOMContentLoaded', function() {
//     var loggedInUser = sessionStorage.getItem('loggedInUser');
//     if (loggedInUser) {
//         // User is logged in, display logout button
//         displayLogout(loggedInUser);
//     }
// });

// function displayLogout(username) {
//     var loginContainer = document.querySelector('.login-container');
//     loginContainer.innerHTML = `
//         <h2>Welcome, ${username}!</h2>
//         <button id="logoutButton">Logout</button>
//     `;

//     // Add event listener to logout button
//     document.getElementById('logoutButton').addEventListener('click', function() {
//         // Clear session storage (logout)
//         sessionStorage.removeItem('loggedInUser');

//         // Redirect to login page
//         window.location.href = 'login.html';
//     });
// }

