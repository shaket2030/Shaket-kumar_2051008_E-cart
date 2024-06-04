const fs = require('fs');

// Read the JSON file
fs.readFile('products.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Add 'id' field with auto-incrementing values
    jsonData.forEach((item, index) => {
      item.id = index + 1;
    });

    // Convert back to JSON string
    const updatedJsonData = JSON.stringify(jsonData, null, 2);

    // Write the updated JSON data back to the file
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
