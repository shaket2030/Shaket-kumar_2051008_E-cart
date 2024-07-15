const fs = require('fs');


fs.readFile('products.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  try {
   
    const jsonData = JSON.parse(data);

    
    jsonData.forEach((item, index) => {
      item.id = index + 1;
    });

    
    const updatedJsonData = JSON.stringify(jsonData, null, 2);

   
    fs.writeFile('product.json', updatedJsonData, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Updated JSON file has been saved.');
    });
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});
