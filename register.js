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

       
        if (!isValidPassword(password)) {
            alert('Password must be between 8 to 16 characters and include at least two alphanumeric characters, at least two special characters, and at least one uppercase letter.');
            return;
        }

        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        
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
                
                if (userData.users.find(user => user.username === username)) {
                    alert('Username already exists');
                    return;
                }
            }
            if (userData && userData.users) {
                
                if (userData.users.find(user => user.email === email)) {
                    alert('email already exists');
                    return;
                }
            }

            if (userData && userData.users) {
                
                if (userData.users.find(user => user.phone === phone)) {
                    alert('Mobile Number already exists');
                    return;
                }
            }
        
            
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
    
            if (registerResponse.ok) {
                const responseData = await registerResponse.text();
                if (responseData === 'Registration successful.') {
                    alert("registration successful");
                    window.location.href = '/userpage.html';
                } else {
                    alert(responseData); 
                }
            } else {
                const errorMessage = await registerResponse.text();
                alert(errorMessage); 
            }
        } catch (error) {
            
            console.error('Registration error:', error.message);
            alert('Registration failed. Please try again later.');
        }
        
    });
});

function isValidPassword(password) {
    
    if (password.length < 8 || password.length > 16) {
        return false;
    }

    
    const alphanumericCount = (password.match(/[a-zA-Z0-9]/g) || []).length;

   
    const specialCharCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;

   
    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;

    
    if (alphanumericCount < 2 || specialCharCount < 2 || uppercaseCount < 1) {
        return false;
    }

    return true;
}

function isValidCaptcha(inputCaptcha) {
    console.log(inputCaptcha);
    const generatedCaptcha = document.getElementById('captchaImage').textContent.trim(); // Get the captcha text
    console.log(generatedCaptcha);
    return inputCaptcha === generatedCaptcha;
}




