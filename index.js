const tableBody = document.getElementById("tableBody");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const filterBtn = document.getElementById("filterBtn");
const applyFilterBtn = document.getElementById("applyFilterBtn");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const colorSelect = document.getElementById("colorSelect");
const sizeSelect = document.getElementById("sizeSelect");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const viewCartBtn = document.getElementById("viewCartBtn");
const loggedInUser = document.getElementById("loggedInUser");

let jsonData = [];
const itemsPerPage = 10;
let currentPage = 1;
let totalPages = 1;
let searchResults=[];

function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="#" class="product-link" data-index="${index}">${item.product_name}</a></td>
            <td>${item.product_number}</td>
            <td>${item.color}</td>
            <td>${item.size}</td>
            <td>${item.price}</td>
            <td><button class="add-to-cart-btn" data-index="${index}">Add to Cart</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function renderTablePage(data) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);
    renderTable(paginatedData);
}

function updatePaginationButtons() {
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

function updateTableAndPagination(data) {
    totalPages = Math.ceil(data.length / itemsPerPage);
    renderTablePage(data);
    updatePaginationButtons();
}


fetch('product.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        updateTableAndPagination(data);
        populateFilterOptions(data);
    })
    .catch(error => console.error('Error fetching product data:', error));

searchBtn.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    console.log(searchTerm);
    searchResults = jsonData.filter(item => {
        
        return item.product_name.toLowerCase().includes(searchTerm);
    });
    console.log("jj"+searchResults);

    if (searchResults.length === 0) {
        alert("Product does not exist");
        resetSearch();
    } else {
        updateTableAndPagination(searchResults);
        filterBtn.style.display = "block"; 
    }
});

applyFilterBtn.addEventListener("click", function () {
    const minPrice = parseFloat(minPriceInput.value || 0);
    const maxPrice = parseFloat(maxPriceInput.value || Number.MAX_VALUE);
    const selectedColor = colorSelect.value;
    const selectedSize = sizeSelect.value;
    console.log("kk"+selectedColor+selectedSize +searchResults);
    

    const filteredData = searchResults.filter(item => {
        const price = parseFloat(item.price.replace("$", ""));
        return price >= minPrice && price <= maxPrice &&
               (selectedColor === "" || item.color === selectedColor) &&
               (selectedSize === "" || item.size === selectedSize);
    }).sort((a, b) => {
        return a.product_name.localeCompare(b.product_name);
    });

    console.log("not");

    updateTableAndPagination(filteredData);
    closeFilterModal(); 
});

function populateFilterOptions(data) {
    const colors = [...new Set(data.map(item => item.color))];
    const sizes = [...new Set(data.map(item => item.size))];

    colors.forEach(color => {
        const option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        colorSelect.appendChild(option);
    });

    sizes.forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });
}

function resetSearch() {
    searchInput.value = '';
    updateTableAndPagination(jsonData); 
    filterBtn.style.display = "none"; 
}

document.addEventListener("click", function (event) {
    if (event.target.classList.contains('product-link')) {
        event.preventDefault();
        const index = event.target.dataset.index;
        window.location.href = `product_details.html?index=${index}`;
    }
});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        event.preventDefault();
        const index = event.target.dataset.index;
        const productToAdd = jsonData[index];

        fetch('/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productToAdd)
        })
        .then(response => {
            if (response.ok) {
                alert('Product added to cart!');
                fetchCartCount();
            } else {
                console.error('Failed to add product to cart:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
        });
    }
});

function toggleDropdown() {
    const dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

prevPageBtn.addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        renderTablePage(jsonData);
        updatePaginationButtons();
    }
});

nextPageBtn.addEventListener("click", function () {
    if (currentPage < totalPages) {
        currentPage++;
        renderTablePage(jsonData);
        updatePaginationButtons();
    }
});

function openFilterModal() {
    document.getElementById("filterModal").style.display = "block";
}

function closeFilterModal() {
    document.getElementById("filterModal").style.display = "none";
}


async function fetchCartCount() {
    try {
        const response = await fetch('/cart', { credentials: 'same-origin' });
        const data = await response.json();
        const cartCount = data.cartCount;
        viewCartBtn.textContent = `View Cart (${cartCount})`;
    } catch (error) {
        console.error('Error fetching cart count:', error);
    }
}


viewCartBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/cart', { credentials: 'same-origin' });
        const data = await response.json();
        const cartCount = data.cartCount;
        alert(`You have ${cartCount} items in your cart.`);
    } catch (error) {
        console.error('Error fetching cart count:', error);
    }
});
fetchCartCount();


function getLoggedInUser() {
    fetch('/getLoggedInUser')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(loggedInUsername => {
            loggedInUser.textContent = `Hey, ${loggedInUsername}!`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
window.addEventListener('click', function(event) {
    var dropdownContent = document.getElementById("dropdownContent");
    if (event.target !== dropdownContent && !dropdownContent.contains(event.target)) {
        dropdownContent.style.display = 'none';
    }
});


getLoggedInUser();

