// document.addEventListener('DOMContentLoaded', () => {
//     const registerForm = document.getElementById('registerForm');

//     registerForm.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
        

//         const response = await fetch('/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
//         });

//         const responseData = await response.text();

//         if (response.ok) {
//          //   window.location.href = `/user/${username}`;
//          window.location.href ='/userpage.html';
//         } else {
//             alert(responseData);
//         }
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const registerForm = document.getElementById('registerForm');

//     registerForm.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         const response = await fetch('/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
//         });

//         if (response.ok) {
//             const responseData = await response.text();
//             if (responseData === 'Registration successful.') {
//                 window.location.href = '/userpage.html';
//             } else {
//                 alert(responseData); // Display any other response message
//             }
//         } else {
//             const errorMessage = await response.text();
//             alert(errorMessage); // Display error message from the server
//         }
//     });
// });


// document.addEventListener('DOMContentLoaded', () => {
//     const registerForm = document.getElementById('registerForm');

//     registerForm.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
//         const confirmPassword = document.getElementById('confirmPassword').value;

//         // Check if password and confirm password match
//         if (password !== confirmPassword) {
//             alert('Passwords do not match');
//             return;
//         }

//         // Fetch user data from user.json
//         try {
//             const response = await fetch('/user.json');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch user data');
//             }

//             const userData = await response.json();

//             // Check if username already exists in user.json
//             if (userData.hasOwnProperty(username)) {
//                 alert('Username already exists');
//                 return;
//             }

//             // Proceed with registration if username is available
//             const registerResponse = await fetch('/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 },
//                 body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
//             });

//             if (registerResponse.ok) {
//                 const responseData = await registerResponse.text();
//                 if (responseData === 'Registration successful.') {
//                     window.location.href = '/userpage.html';
//                 } else {
//                     alert(responseData); // Display any other response message
//                 }
//             } else {
//                 const errorMessage = await registerResponse.text();
//                 alert(errorMessage); // Display error message from the server
//             }
//         } catch (error) {
//             console.error('Registration error:', error.message);
//             alert('Registration failed. Please try again later.');
//         }
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const registerForm = document.getElementById('registerForm');

//     registerForm.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
//         const confirmPassword = document.getElementById('confirmPassword').value;

//         // Validate password
//         if (!isValidPassword(password)) {
//             alert('Password must be between 8 to 16 characters and include at least two alphanumeric characters, at least two special characters, and at least one uppercase letter.');
//             return;
//         }

//         // Check if password and confirm password match
//         if (password !== confirmPassword) {
//             alert('Passwords do not match');
//             return;
//         }

//         // Fetch user data from user.json
//         try {
//             const response = await fetch('/user.json');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch user data');
//             }

//             const userData = await response.json();

//             // Check if username already exists in user.json
//             if (userData.hasOwnProperty(username)) {
//                 alert('Username already exists');
//                 return;
//             }

//             // Proceed with registration if username is available
//             const registerResponse = await fetch('/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 },
//                 body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
//             });

//             if (registerResponse.ok) {
//                 const responseData = await registerResponse.text();
//                 if (responseData === 'Registration successful.') {
//                     window.location.href = '/userpage.html';
//                 } else {
//                     alert(responseData); // Display any other response message
//                 }
//             } else {
//                 const errorMessage = await registerResponse.text();
//                 alert(errorMessage); // Display error message from the server
//             }
//         } catch (error) {
//             console.error('Registration error:', error.message);
//             alert('Registration failed. Please try again later.');
//         }
//     });
// });

// // Function to validate password based on custom rules
// function isValidPassword(password) {
//     // Password must be between 8 to 16 characters
//     if (password.length < 8 || password.length > 16) {
//         return false;
//     }

//     // Count alphanumeric characters
//     const alphanumericCount = (password.match(/[a-zA-Z0-9]/g) || []).length;

//     // Count special characters (non-alphanumeric)
//     const specialCharCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;

//     // Count uppercase letters
//     const uppercaseCount = (password.match(/[A-Z]/g) || []).length;

//     // Validate requirements
//     if (alphanumericCount < 2 || specialCharCount < 2 || uppercaseCount < 1) {
//         return false;
//     }

//     return true;
// }


document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!isEmailVerified) {
            alert('Please verify your email before proceeding.');
            return;
        }

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const captcha = document.getElementById('captcha').value;

        // Validate password
        if (!isValidPassword(password)) {
            alert('Password must be between 8 to 16 characters and include at least two alphanumeric characters, at least two special characters, and at least one uppercase letter.');
            return;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Validate captcha
        if (!isValidCaptcha(captcha)) {
            alert('Captcha verification failed. Please try again.');
            return;
        }

        
        try {
            const response = await fetch('/user.json');
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
        
            const userData = await response.json();
        
            if (userData && userData.users) {
                // Check if username already exists in user.json
                if (userData.users.find(user => user.username === username)) {
                    alert('Username already exists');
                    return;
                }
            }
            if (userData && userData.users) {
                // Check if username already exists in user.json
                if (userData.users.find(user => user.email === email)) {
                    alert('email already exists');
                    return;
                }
            }

            if (userData && userData.users) {
                // Check if username already exists in user.json
                if (userData.users.find(user => user.phone === phone)) {
                    alert('Mobile Number already exists');
                    return;
                }
            }
        
            // Proceed with registration if username is available
            const registerResponse = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    username: username,
                    password: password
                })
            });
        
            // if (registerResponse.ok) {
            //     const responseData = await registerResponse.json();
            //     if (responseData.success) {
            //         window.location.href = '/userpage.html';
            //     } else {
            //         alert(responseData.message); // Display any other response message
            //     }
            // } else {
            //     const errorMessage = await registerResponse.text();
            //     alert(errorMessage); // Display error message from the server
            // }
            if (registerResponse.ok) {
                const responseData = await registerResponse.text();
                if (responseData === 'Registration successful.') {
                    alert("registration successful");
                    window.location.href = '/userpage.html';
                } else {
                    alert(responseData); // Display any other response message
                }
            } else {
                const errorMessage = await registerResponse.text();
                alert(errorMessage); // Display error message from the server
            }
        } catch (error) {
            // Handle non-JSON responses (e.g., plain text error messages)
            console.error('Registration error:', error.message);
            alert('Registration failed. Please try again later.');
        }
        
    });
});

function isValidPassword(password) {
    // Password must be between 8 to 16 characters
    if (password.length < 8 || password.length > 16) {
        return false;
    }

    // Count alphanumeric characters
    const alphanumericCount = (password.match(/[a-zA-Z0-9]/g) || []).length;

    // Count special characters (non-alphanumeric)
    const specialCharCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;

    // Count uppercase letters
    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;

    // Validate requirements
    if (alphanumericCount < 2 || specialCharCount < 2 || uppercaseCount < 1) {
        return false;
    }

    return true;
}

function isValidCaptcha(inputCaptcha) {
    console.log(inputCaptcha);
    const generatedCaptcha = document.getElementById('captchaImage').textContent.trim(); // Get the captcha text
    console.log(generatedCaptcha);
    return inputCaptcha === generatedCaptcha; // Compare user input with generated captcha
}




