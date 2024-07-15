const express = require('express');
//const twilio = require('twilio');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require('path');
const fs = require('fs');
var session = require('express-session');
const accountSid = 'ACdc42231e0ea8503b399e8db841e0f1e0';
const authToken = '2f0215b8ae73987cda19b0ec4375d0f2';
const client = require('twilio')(accountSid, authToken);

const app = express();
app.use(
    session({
      secret: "TOPSECRETWORD",
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());


app.use(express.static(path.join(__dirname, '')));
const jsonFilePath = path.join(__dirname, 'product.json');
const userDataFilePath = path.join(__dirname, 'user.json');
app.use(passport.initialize());
app.use(passport.session());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'shaketjh123@gmail.com',
      pass: 'gqvd kxja bvkl ayho'
  }
});
const otpStore = new Map();

function isAuth(req,res,next){
    console.log("hello"+" "+req.originalUrl);
    console.log(req.isAuthenticated() +" "+req.path);
    if(req.isAuthenticated() && req.originalUrl==='/login'){
      console.log("working");
      
      res.redirect('/index.html');
  
    }else{
      next();
    }
  }
  app.use(isAuth);








app.get('/', (req, res) => {
    console.log("hello");
     res.sendFile(path.join(__dirname, 'index.html'));
    // res.sendFile(path.join(__dirname, 'landing.html'));
    
});
app.get('/checkAuth', (req, res) => {
  if (req.isAuthenticated()) {
    console.log("i am ok");
    res.sendStatus(200); 
  } else {
    res.sendStatus(401); 
  }
});


app.post('/submit-address', (req, res) => {
    const addressFile = path.join(__dirname, 'address.json');
    const userAddress = req.body;
    
   
    const username = req.user.username; 

    fs.readFile(addressFile, (err, data) => {
        let users = {};

        if (!err) {
            try {
                users = JSON.parse(data);
            } catch (parseErr) {
                
                users = {};
            }
        }

        if (!users[username]) {
            users[username] = [];
        }
        const id = users[username].length + 1;
        userAddress.id = id;
        console.log(userAddress.id);

        users[username].push(userAddress);

        fs.writeFile(addressFile, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error saving address.');
            } else {
                res.status(200).send('Address saved successfully.');
            }
        });
    });
});
app.delete('/deleteAddress/:id', (req, res) => {
    const addressFile = path.join(__dirname, 'address.json');
    const addressId = parseInt(req.params.id);
    
    fs.readFile(addressFile, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading address file.');
        }

        let addresses = {};

        try {
            addresses = JSON.parse(data);
        } catch (parseErr) {
           
            addresses = {};
        }

       
        const username = req.user.username; 

        if (!addresses[username]) {
            return res.status(404).send('User not found');
        }

        const userAddresses = addresses[username];
        const index = userAddresses.findIndex(address => address.id === addressId);

        if (index !== -1) {
            userAddresses.splice(index, 1);

            
            fs.writeFile(addressFile, JSON.stringify(addresses, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error deleting address.');
                } else {
                    res.sendStatus(200); 
                }
            });
        } else {
            res.status(404).send('Address not found'); 
        }
    });
});
app.put('/updateAddress/:id', (req, res) => {
    const addressFilePath = path.join(__dirname, 'address.json');
    const addressId = parseInt(req.params.id, 10);
    const updatedAddress = req.body;
  
    fs.readFile(addressFilePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Failed to read addresses');
      }
  
      const addresses = JSON.parse(data);
      const userAddresses = addresses[req.user.username] || [];
  
      const addressIndex = userAddresses.findIndex(addr => addr.id === addressId);
      if (addressIndex === -1) {
        return res.status(404).send('Address not found');
      }
  
      userAddresses[addressIndex] = { ...userAddresses[addressIndex], ...updatedAddress };
      addresses[req.user.username] = userAddresses;
  
      fs.writeFile(addressFilePath, JSON.stringify(addresses, null, 2), (writeErr) => {
        if (writeErr) {
          return res.status(500).send('Failed to write addresses');
        }
  
        res.send('Address updated successfully');
      });
    });
  });
  app.get('/getAddresses/:id', (req, res) => {
    const addressFilePath = path.join(__dirname, 'address.json');
    const addressId = parseInt(req.params.id, 10);
  
    fs.readFile(addressFilePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Failed to read addresses');
      }
  
      const addresses = JSON.parse(data);
      const userAddresses = addresses[req.user.username] || [];
      const address = userAddresses.find(addr => addr.id === addressId);
  
      if (!address) {
        return res.status(404).send('Address not found');
      }
  
      res.json(address);
    });
  });
app.get('/getLoggedInUser',(req, res) => {
    
    console.log(req.user);
    console.log(req.user.username);
    const loggedInUsername = req.user.username;
    res.send(loggedInUsername);
});
app.get('/user.json', (req, res) => {
    const usersFilePath = path.join(__dirname, 'user.json');
    res.sendFile(usersFilePath);
});
app.post('/updateUserProfile', (req, res) => {
    const { username, phone, email } = req.body;
    const usersFilePath = path.join(__dirname, 'user.json');

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading user file');
            return;
        }

        let users = JSON.parse(data);
        let user = users.users.find(user => user.username === username);

        if (user) {
            
            const existingUser = users.users.find(user => 
                (user.phone === phone || user.email === email) && user.username !== username
            );

            if (existingUser) {
                res.status(400).send('Phone number or email already exists for another user.');
                return;
            }

            user.phone = phone;
            user.email = email;

            fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error updating user file');
                    return;
                }

                res.json({ message: 'Profile updated successfully!' });
            });
        } else {
            res.status(404).send('User not found');
        }
    });
});

app.get('/getAddresses', (req, res) => {
    
    const addressesFilePath = path.join(__dirname, 'address.json');
    const username = req.user.username;

    fs.readFile(addressesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading address file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        let addresses;
        try {
            addresses = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing address file:', parseError);
            addresses = {};
        }

        const userAddresses = addresses[username] || [];
        
        res.json(userAddresses);
    });
});


app.delete('/remove-item/:productNumber',  async (req, res) => {
  const username = req.user.username; 

  const { productNumber } = req.params;
  const cartFilePath = path.join(__dirname, 'cart1.json');

  try {
      
      let cartData = await fs.readFileSync(cartFilePath, 'utf8');
      cartData = JSON.parse(cartData);

      
      const userCart = cartData[username];
     // console.log(userCart);

      if (!userCart) {
          return res.status(404).send('User not found or cart is empty');
      }

      
      const index = userCart.findIndex(item => item.product_number === parseInt(productNumber));
      console.log(index);

      if (index === -1) {
          return res.status(404).send('Item not found in user\'s cart');
      }

     
      if (userCart[index].quantity > 1) {
          userCart[index].quantity -= 1;
      } else {
          userCart.splice(index, 1);
      }
      console.log(userCart);

      console.log("hello world");

      
      await fs.writeFileSync(cartFilePath, JSON.stringify(cartData, null, 2), 'utf8'); 

      
      res.json(userCart);
  } catch (error) {
      console.error('Error removing item:', error);
      res.status(500).send('Internal Server Error');
  }
});


app.get('/addressdetails/:addressId', (req, res) => {
    const username = req.user.username;
    const addressId = parseInt(req.params.id, 10); 
    const addressFilePath = path.join(__dirname, 'address.json');
    console.log("dd"+addressId);

    fs.readFile(addressFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading address file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const addressData = JSON.parse(data);
        const userAddresses = addressData[username];
        const addresss = userAddresses.find(addr => addr.id === addressId);
        console.log("add"+addresss);
        console.log("bb"+userAddresses);
        
        if (userAddresses && userAddresses.length > 0) {
            
            const address = userAddresses.find(address => address.id === addressId);
            console.log("ff"+address);
            if (address) {
                console.log("ff"+address);
                res.json(address);
            } else {
                res.status(404).json({ error: 'Address not found' });
            }
        } else {
            res.status(404).json({ error: 'User addresses not found' });
        }
    });
});


app.post('/add-item/:productNumber',  async (req, res) => {
    const username = req.user.username; 
  
    const { productNumber } = req.params;
    const cartFilePath = path.join(__dirname, 'cart1.json');
  
    try {
       
        let cartData = await fs.readFileSync(cartFilePath, 'utf8');
        cartData = JSON.parse(cartData);
  
       
        const userCart = cartData[username];
       // console.log(userCart);
  
        if (!userCart) {
            return res.status(404).send('User not found or cart is empty');
        }
  
        
        const index = userCart.findIndex(item => item.product_number === parseInt(productNumber));
        console.log(index);
  
        if (index === -1) {
            return res.status(404).send('Item not found in user\'s cart');
        }
  
       
        if (userCart[index].quantity > 1) {
            console.log("secondtime");
            userCart[index].quantity += 1;
            console.log(userCart[index].quantity);
        } else {
            userCart.splice(index, 1);
       }
        console.log(userCart);
  
        console.log("hello world");
  
       
        await fs.writeFileSync(cartFilePath, JSON.stringify(cartData, null, 2), 'utf8'); 
  
       
        res.json(userCart);
    } catch (error) {
        console.error('Error removing item:', error);
        res.status(500).send('Internal Server Error');
    }
  });






app.get('/login/home', (req, res) => {
    
    res.redirect('/landing.html');
});


app.post('/add-to-cart', (req, res) => {
 // console.log(req.user);
  const productToAdd = req.body; 
  console.log(productToAdd);
  const loggedInUsername = req.user.username;
 
  
  fs.readFile('cart1.json', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          res.status(500).send('Internal Server Error');
          return;
      }

      let cartData = JSON.parse(data);
      

      
      if (cartData[loggedInUsername]) {
          
          console.log("exist");
          cartData[loggedInUsername].push(productToAdd);
      } else {
         
          console.log("notexist");
          cartData[loggedInUsername] = [productToAdd];
      }

      
      fs.writeFile('cart1.json', JSON.stringify(cartData), (err) => {
          if (err) {
              console.error('Error writing file:', err);
              res.status(500).send('Internal Server Error');
              return;
          }
          res.status(200).send('Product added to cart!');
      });
  });
});

app.get('/cart-contents',  (req, res) => {
  const username = req.user.username;

  
  fs.readFile('cart1.json', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading cart data:', err);
          res.status(500).send('Internal Server Error');
          return;
      }

      try {
          const cartData = JSON.parse(data);
          console.log("c"+cartData);
          const userCart = cartData[username] || [];
          console.log("h"+userCart);

         
          const cartContents = [];
          const productCountMap = {};

          userCart.forEach(item => {
              const key = `${item.product_name}-${item.product_number}-${item.color}-${item.size}`;
              if (productCountMap[key]) {
                  productCountMap[key]++;
              } else {
                  productCountMap[key] = 1;
                  cartContents.push({ ...item, quantity: 1 });
              }
          });

          
          cartContents.forEach(item => {
              const key = `${item.product_name}-${item.product_number}-${item.color}-${item.size}`;
              item.quantity = productCountMap[key];
          });

          res.json(cartContents);
      } catch (error) {
          console.error('Error parsing cart data:', error);
          res.status(500).send('Internal Server Error');
      }
  });
});

app.get('/cart', (req, res) => {
  const username = req.user.username;

  fs.readFile('cart1.json', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading cart data:', err);
          res.status(500).send('Internal Server Error');
          return;
      }

      const cartData = JSON.parse(data);
      const userCart = cartData[username] || [];

      res.json({ cartCount: userCart.length });
  });
});


app.get('/login/user', (req, res) => {
    
    res.redirect('/login.html');
});







app.get('/login/admin', (req, res) => {
    
    res.redirect('/admin.html');
});


app.get('/products', (req, res) => {
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(JSON.parse(data));
    });
});
app.post('/api/products', (req, res) => {
    const { product_name, product_number, color, size, price } = req.body;
    console.log(product_name);

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        let products = JSON.parse(data);
        const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
        const newProductId = lastProductId + 1;
        
        const newProduct = {
            id: newProductId,
            product_name: product_name,
            product_number: product_number,
            color: color,
            size: size,
            price: price
        };

        products.push(newProduct);

        
        fs.writeFile(jsonFilePath, JSON.stringify(products, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json(newProduct); 
        });
    });
});

app.get("/logout", (req, res) => {
  console.log("logout");
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/userpage.html");
    });
  });


app.post('/register', (req, res) => {
  const { name, email, phone, username, password } = req.body;

  console.log(req.body);

  
  if (!name || !email || !phone || !username || !password) {
      return res.status(400).send('All fields are required.');
  }



 
  
  fs.readFile('user.json', (err, data) => {
      if (err) {
          return res.status(500).send('Error reading user data.');
      }

      let users = JSON.parse(data);

      
      if (users.users.some(user => user.username === username)) {
          return res.status(400).send('Username already exists.');
      }

      
      users.users.push({ name, email, phone, username, password });

      

      
      client.verify.v2.services("VAe2e316c8308973d9104238e55a027d48")
      .verifications
      .create({to: '+917257067085', channel: 'sms',customCode: phone.toString()})
      .then(verification => console.log(verification.sid));
      fs.writeFile('user.json', JSON.stringify(users, null, 2), (err) => {
        
          if (err) {
            
              return res.status(500).send('Error updating user data.');
          }
          const mailOptions = {
            
            from: 'shaketjh123@gmail.com',
            to: email,
            subject: 'Registration Confirmation',
            text: `Hello ${name},\n\nYou have successfully registered with username: ${username}.\n\nThank you!`
        };

        console.log(mailOptions);
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
          } else {
              console.log('Email sent:', info.response);
          }
      });

        
          
          res.status(200).send('Registration successful.');
      });
  });
});

app.post('/reset-password', (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  console.log("hello world");
  console.log(username);
  
  
  const userFilePath = path.join(__dirname, 'user.json');

  try {
     
      const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));

    
      const userToUpdate = userData.users.find(user => user.username === username);
      if (!userToUpdate) {
                  return res.status(404).send('User not found');
              }
      console.log(userToUpdate);

      
      if (userToUpdate) {
        console.log(userToUpdate);
        if (userToUpdate.password !== oldPassword) {
                     return res.status(401).send('Incorrect old password');
                 }
        
        userToUpdate.password = newPassword;
        

         
          fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 4), 'utf8');

          

          res.status(200).json({ message: 'Password updated successfully' });
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Failed to update password' });
  }
});

app.post('/verifyOTP', (req, res) => {
  const { username, enteredOTP } = req.body;
  console.log(req.body);

 
  const storedOTPData = otpStore.get(username);
  console.log(storedOTPData);

  if (!storedOTPData) {
      return res.status(400).json({ error: 'Invalid username or OTP expired. Please try again.' });
  }

  const { email, otp } = storedOTPData;
  console.log(otp);

 
  console.log(otp.toString()+" "+enteredOTP.toString());
  if (otp.toString() === enteredOTP.toString()) {
     
      console.log("hello11");
      res.status(200).json({ message: 'OTP verified successfully', email });
  } else {
      
      console.log("world22");
      res.status(400).json({ error: 'Invalid OTP. Please try again.' });
  }
});

app.post('/sendOTP', (req, res) => {
  const { username, email } = req.body;
  console.log(req.body);

  
  const otp = Math.floor(100000 + Math.random() * 900000);

 
  otpStore.set(username, { email, otp });


  const mailOptions = {
      from: 'shaketjh123@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. This OTP will expire in 5 minutes.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending OTP email:', error);
          res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
      } else {
          console.log('OTP email sent:', info.response);
          res.status(200).json({ message: 'OTP sent successfully. Check your email.' });
      }
  });
});

app.post('/validUser', (req, res) => {
  const { username, email } = req.body;
  const userFilePath = path.join(__dirname, 'user.json');

  
  fs.readFile(userFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading user data:', err);
          return res.status(500).json({ error: 'Failed to read user data' });
      }

      try {
          const userData = JSON.parse(data);

         
          const userExists = userData.users.some(user => user.username === username || user.email === email);

          if (userExists) {
              res.json({ exists: true, message: 'User already exists' });
          } else {
              res.json({ exists: false, message: 'User does not exist' });
          }
      } catch (error) {
          console.error('Error parsing user data:', error);
          res.status(500).json({ error: 'Failed to parse user data' });
      }
  });
});

app.post('/validateUser', (req, res) => {
  const { username, email } = req.body;
  console.log(req.body);

 
  const userFilePath = path.join(__dirname, 'user.json');
  try {
      
      const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));

     
      const user = userData.users.find(user => user.username === username);
      console.log(user);
      if (!user) {
          return res.status(400).json({ valid: false, message: 'Invalid username' });
      }
      console.log("hello");

     
      if (user.email !== email) {
          return res.status(400).json({ valid: false, message: 'Invalid email for the given username' });
      }
      console.log("hello");

    
      res.status(200).json({ valid: true, message: 'Validation successful' });
  } catch (error) {
      console.error('Error reading user data:', error);
      res.status(500).json({ valid: false, message: 'Failed to validate user. Please try again.' });
  }
});

app.post('/updatePassword', (req, res) => {
  const { username, newPassword } = req.body;
  console.log("hello world");
  console.log(username);
  const storedOTPData = otpStore.get(username);
  

  if (!storedOTPData) {
    return res.status(400).json({ error: 'Invalid username or OTP expired. Please try again.' });
}

const { email, otp } = storedOTPData;

  
  const userFilePath = path.join(__dirname, 'user.json');

  try {
      
      const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));

     
      const userToUpdate = userData.users.find(user => user.username === username);
      console.log(userToUpdate);

     
      if (userToUpdate) {
        console.log(userToUpdate);
        
        userToUpdate.password = newPassword;
        

         
          fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 4), 'utf8');

          

          res.status(200).json({ message: 'Password updated successfully' });
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Failed to update password' });
  }
});



app.put('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id); // Extract product ID from request params
    const { product_name, product_number, color, size, price } = req.body;
    console.log('Received PUT request for product ID:', productId);
    console.log('Update Data:', req.body);

    
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        try {
            let products = JSON.parse(data);

            
            const productIndex = products.findIndex(product => product.id === productId);

            if (productIndex === -1) {
                return res.status(404).json({ error: `Product with ID ${productId} not found.` });
            }

            
            if (product_name) {
                products[productIndex].product_name = product_name;
            }
            if (product_number) {
                products[productIndex].product_number = product_number;
            }
            if (color) {
                products[productIndex].color = color;
            }
            if (size) {
                products[productIndex].size = size;
            }
            if (price) {
                products[productIndex].price = price;
            }

           
            fs.writeFile(jsonFilePath, JSON.stringify(products, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                res.json(products[productIndex]); 
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});


app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id); 

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        let products = JSON.parse(data);
        const productIndex = products.findIndex(product => product.id === productId);

        if (productIndex === -1) {
            res.status(404).json({ error: `Product with ID ${productId} not found.` });
            return;
        }

        
        products.splice(productIndex, 1);

        
        fs.writeFile(jsonFilePath, JSON.stringify(products, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: `Product with ID ${productId} has been deleted.` });
        });
    });
});

  
  app.get("/login", (req, res) => {
    // console.log(req.user);
    if (req.isAuthenticated()) {
      //res.render("index.html");
      res.redirect("/index.html");
    } else {
      res.redirect("/login.html");
    }
  });
  
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/index.html",
      failureRedirect: "/login.html"
    
    })
  );
    


  passport.use(
    new LocalStrategy(function verify(username, password, cb) {
      
      fs.readFile(userDataFilePath, (err, data) => {
        if (err) {
          return cb(err);
        }
  
        try {
          const users = JSON.parse(data).users;
          
         
          const user = users.find(user => user.username === username && user.password === password);
  
          if (user) {
            
            return cb(null, user);
          } else {
            
            return cb(null, false);
          }
        } catch (error) {
          return cb(error);
        }
      });
    })
  );

  
  
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });
  



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
