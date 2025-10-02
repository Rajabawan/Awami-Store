// Product data array
let products = [];

// Load products from localStorage
function loadProducts() {
    const storedProducts = localStorage.getItem('karyanaProducts');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
}

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('karyanaProducts', JSON.stringify(products));
}

// Render products in the table
function renderProducts(filter = '') {
    const tbody = document.getElementById('products-body');
    tbody.innerHTML = '';

    const filteredProducts = products.filter(product => {
        const searchTerm = filter.toLowerCase();
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.inventoryNumber.toLowerCase().includes(searchTerm)
        );
    });

    filteredProducts.forEach((product, index) => {
        const tr = document.createElement('tr');

        const inventoryTd = document.createElement('td');
        inventoryTd.textContent = product.inventoryNumber;
        tr.appendChild(inventoryTd);

        const nameTd = document.createElement('td');
        nameTd.textContent = product.name;
        tr.appendChild(nameTd);

        const priceTd = document.createElement('td');
        priceTd.textContent = product.price.toFixed(2) + ' per ' + product.unit;
        tr.appendChild(priceTd);

        const quantityTd = document.createElement('td');
        quantityTd.textContent = product.quantity + ' ' + product.unit;
        tr.appendChild(quantityTd);

        const totalValueTd = document.createElement('td');
        const totalValue = product.price * product.quantity;
        totalValueTd.textContent = totalValue.toFixed(2);
        tr.appendChild(totalValueTd);

        const actionsTd = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteProduct(index);
        });
        actionsTd.appendChild(deleteBtn);
        tr.appendChild(actionsTd);

        tbody.appendChild(tr);
    });
}

// Generate sequential inventory number starting from 001
function generateInventoryNumber() {
    const maxNumber = products.reduce((max, product) => {
        const num = parseInt(product.inventoryNumber.replace('INV-', ''), 10);
        return num > max ? num : max;
    }, 0);
    const nextNumber = maxNumber + 1;
    return 'INV-' + nextNumber.toString().padStart(3, '0');
}

// Add new product or update existing product
let editIndex = -1;

function addProduct(event) {
    event.preventDefault();

    const nameInput = document.getElementById('product-name');
    const priceInput = document.getElementById('product-price');
    const quantityInput = document.getElementById('product-quantity');
    const unitSelect = document.getElementById('product-unit');
    const submitButton = document.querySelector('#product-form button[type="submit"]');
    const cancelEditButton = document.getElementById('cancel-edit');

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const quantity = parseFloat(quantityInput.value);
    const unit = unitSelect.value;

    if (!name || isNaN(price) || price < 0 || isNaN(quantity) || quantity < 0) {
        alert('Please enter valid product details.');
        return;
    }

    if (editIndex === -1) {
        // Add new product
        const inventoryNumber = generateInventoryNumber();
        const newProduct = { inventoryNumber, name, price, quantity, unit };
        products.push(newProduct);
    } else {
        // Update existing product
        products[editIndex].name = name;
        products[editIndex].price = price;
        products[editIndex].quantity = quantity;
        products[editIndex].unit = unit;
        editIndex = -1;
        submitButton.textContent = 'Add Product';
        cancelEditButton.style.display = 'none';
    }

    saveProducts();
    renderProducts();

    // Reset form
    nameInput.value = '';
    priceInput.value = '';
    quantityInput.value = '';
    unitSelect.value = 'kg';
}

// Delete product by index
function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
}

// Edit product by index
function editProduct(index) {
    const product = products[index];
    const nameInput = document.getElementById('product-name');
    const priceInput = document.getElementById('product-price');
    const quantityInput = document.getElementById('product-quantity');
    const unitSelect = document.getElementById('product-unit');
    const submitButton = document.querySelector('#product-form button[type="submit"]');
    const cancelEditButton = document.getElementById('cancel-edit');

    nameInput.value = product.name;
    priceInput.value = product.price;
    quantityInput.value = product.quantity;
    unitSelect.value = product.unit;
    
    editIndex = index;
    submitButton.textContent = 'Update Product';
    cancelEditButton.style.display = 'inline-block';
}

// Cancel edit mode
function cancelEdit() {
    const nameInput = document.getElementById('product-name');
    const priceInput = document.getElementById('product-price');
    const quantityInput = document.getElementById('product-quantity');
    const unitSelect = document.getElementById('product-unit');
    const submitButton = document.querySelector('#product-form button[type="submit"]');
    const cancelEditButton = document.getElementById('cancel-edit');

    nameInput.value = '';
    priceInput.value = '';
    quantityInput.value = '';
    unitSelect.value = 'kg';

    editIndex = -1;
    submitButton.textContent = 'Add Product';
    cancelEditButton.style.display = 'none';
}

// Render products in the table
function renderProducts(filter = '') {
    const tbody = document.getElementById('products-body');
    tbody.innerHTML = '';

    const filteredProducts = products.filter(product => {
        const searchTerm = filter.toLowerCase();
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.inventoryNumber.toLowerCase().includes(searchTerm)
        );
    });

    filteredProducts.forEach((product, index) => {
        const tr = document.createElement('tr');

        const inventoryTd = document.createElement('td');
        inventoryTd.textContent = product.inventoryNumber;
        tr.appendChild(inventoryTd);

        const nameTd = document.createElement('td');
        nameTd.textContent = product.name;
        tr.appendChild(nameTd);

        const priceTd = document.createElement('td');
        priceTd.textContent = product.price.toFixed(2) + ' per ' + product.unit;
        tr.appendChild(priceTd);

        const quantityTd = document.createElement('td');
        quantityTd.textContent = product.quantity + ' ' + product.unit;
        tr.appendChild(quantityTd);

        const totalValueTd = document.createElement('td');
        const totalValue = product.price * product.quantity;
        totalValueTd.textContent = totalValue.toFixed(2);
        tr.appendChild(totalValueTd);

        const actionsTd = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
            editProduct(index);
        });
        actionsTd.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteProduct(index);
        });
        actionsTd.appendChild(deleteBtn);

        tr.appendChild(actionsTd);

        tbody.appendChild(tr);
    });
}

// Billing data array
let billItems = [];

// Billing history array
let billingHistory = [];

// Load bill from localStorage
function loadBill() {
    const storedBill = localStorage.getItem('karyanaBill');
    if (storedBill) {
        billItems = JSON.parse(storedBill);
    }
}

// Save bill to localStorage
function saveBill() {
    localStorage.setItem('karyanaBill', JSON.stringify(billItems));
}

// Load billing history from localStorage
function loadBillingHistory() {
    const storedHistory = localStorage.getItem('karyanaBillingHistory');
    if (storedHistory) {
        billingHistory = JSON.parse(storedHistory);
    }
}

// Save billing history to localStorage
function saveBillingHistory() {
    localStorage.setItem('karyanaBillingHistory', JSON.stringify(billingHistory));
}

// Render bill in the table
function renderBill() {
    const tbody = document.getElementById('billing-body');
    tbody.innerHTML = '';

    billItems.forEach((item, index) => {
        const tr = document.createElement('tr');

        const nameTd = document.createElement('td');
        nameTd.textContent = item.name;
        tr.appendChild(nameTd);

        const quantityTd = document.createElement('td');
        quantityTd.textContent = item.quantity;
        tr.appendChild(quantityTd);

        const unitTd = document.createElement('td');
        unitTd.textContent = item.unit;
        tr.appendChild(unitTd);

        const unitPriceTd = document.createElement('td');
        unitPriceTd.textContent = item.price.toFixed(2);
        tr.appendChild(unitPriceTd);

        const totalPriceTd = document.createElement('td');
        const totalPrice = item.price * item.quantity;
        totalPriceTd.textContent = totalPrice.toFixed(2);
        tr.appendChild(totalPriceTd);

        const actionsTd = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            removeFromBill(index);
        });
        actionsTd.appendChild(removeBtn);
        tr.appendChild(actionsTd);

        tbody.appendChild(tr);
    });

    updateBillTotal();
}

// Add product to bill
function addToBill(product) {
    // Check if product already in bill
    const existingIndex = billItems.findIndex(item => item.inventoryNumber === product.inventoryNumber);
    if (existingIndex !== -1) {
        // Increase quantity by 1
        billItems[existingIndex].quantity += 1;
    } else {
        // Add new item with quantity 1
        billItems.push({
            inventoryNumber: product.inventoryNumber,
            name: product.name,
            quantity: 1,
            unit: product.unit,
            price: product.price
        });
    }
    saveBill();
    renderBill();
}

// Remove product from bill
function removeFromBill(index) {
    billItems.splice(index, 1);
    saveBill();
    renderBill();
}

function updateBillTotal() {
    const total = billItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('billing-total').textContent = total.toFixed(2);
}

function downloadBill() {
    if (billItems.length === 0) {
        alert('No items in the bill to download.');
        return;
    }

    let receiptText = 'Abdul Aziz Awami Store\n';
    receiptText += '----------------------------------------\n';
    receiptText += 'Product Name\tQuantity\tUnit\tPrice per Unit\tSubtotal\n';
    receiptText += '----------------------------------------\n';

    billItems.forEach(item => {
        const subtotal = item.price * item.quantity;
        receiptText += `${item.name}\t${item.quantity}\t${item.unit}\t${item.price.toFixed(2)}\t${subtotal.toFixed(2)}\n`;
    });

    receiptText += '----------------------------------------\n';
    const total = billItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    receiptText += `Total: Rs. ${total.toFixed(2)}\n`;
    receiptText += '----------------------------------------\n';
    receiptText += 'Thank you for shopping with us!\n';

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'receipt.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function completeBill() {
    if (billItems.length === 0) {
        alert('No items in the bill to complete.');
        return;
    }

    const bill = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: [...billItems],
        total: billItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    billingHistory.push(bill);
    saveBillingHistory();

    // Clear current bill
    billItems = [];
    saveBill();
    renderBill();

    alert('Bill completed and added to history.');
}

function renderBillingHistory() {
    const historyList = document.getElementById('billing-history-list');
    historyList.innerHTML = '';

    if (billingHistory.length === 0) {
        historyList.innerHTML = '<p>No billing history available.</p>';
        return;
    }

    billingHistory.forEach(bill => {
        const billDiv = document.createElement('div');
        billDiv.classList.add('billing-history-item');

        billDiv.innerHTML = `
            <h4>Bill ID: ${bill.id} - Date: ${new Date(bill.date).toLocaleString()}</h4>
            <p>Total: Rs. ${bill.total.toFixed(2)}</p>
            <ul>
                ${bill.items.map(item => `<li>${item.name} - ${item.quantity} ${item.unit} @ Rs. ${item.price.toFixed(2)} each</li>`).join('')}
            </ul>
        `;

        historyList.appendChild(billDiv);
    });
}

function init() {
    loadProducts();
    loadBill();
    loadBillingHistory();
    renderProducts();

    const form = document.getElementById('product-form');
    form.addEventListener('submit', addProduct);

    const billingButton = document.getElementById('billing-button');
    const inventoryButton = document.getElementById('inventory-button');
    const inventorySection = document.getElementById('inventory-section');
    const billingSection = document.getElementById('billing-section');

    billingButton.addEventListener('click', () => {
        inventorySection.style.display = 'none';
        billingSection.style.display = 'block';
        billingButton.style.display = 'none';
        inventoryButton.style.display = 'inline-block';
    });

    inventoryButton.addEventListener('click', () => {
        inventorySection.style.display = 'block';
        billingSection.style.display = 'none';
        billingButton.style.display = 'inline-block';
        inventoryButton.style.display = 'none';
    });

    const billingForm = document.getElementById('billing-form');
    billingForm.addEventListener('submit', addBillingItem);

    // Autocomplete for product name in billing
    const billProductNameInput = document.getElementById('bill-product-name');
    const suggestionsDropdown = document.getElementById('product-suggestions');

    billProductNameInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        suggestionsDropdown.innerHTML = '';
        if (query.length === 0) {
            suggestionsDropdown.style.display = 'none';
            return;
        }

        const matchingProducts = products.filter(product =>
            product.name.toLowerCase().startsWith(query)
        );

        if (matchingProducts.length > 0) {
            matchingProducts.forEach(product => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.textContent = product.name;
                suggestionDiv.addEventListener('click', function() {
                    billProductNameInput.value = product.name;
                    document.getElementById('bill-product-price').value = product.price;
                    document.getElementById('bill-product-unit').value = product.unit;
                    document.getElementById('bill-product-quantity').value = 1; // Default quantity
                    suggestionsDropdown.style.display = 'none';
                });
                suggestionsDropdown.appendChild(suggestionDiv);
            });
            suggestionsDropdown.style.display = 'block';
        } else {
            suggestionsDropdown.style.display = 'none';
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(event) {
        if (!billProductNameInput.contains(event.target) && !suggestionsDropdown.contains(event.target)) {
            suggestionsDropdown.style.display = 'none';
        }
    });

function addBillingItem(event) {
    event.preventDefault();

    const nameInput = document.getElementById('bill-product-name');
    const priceInput = document.getElementById('bill-product-price');
    const quantityInput = document.getElementById('bill-product-quantity');
    const unitSelect = document.getElementById('bill-product-unit');

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const quantity = parseFloat(quantityInput.value);
    const unit = unitSelect.value;

    if (!name || isNaN(price) || price < 0 || isNaN(quantity) || quantity < 0) {
        alert('Please enter valid billing details.');
        return;
    }

    billItems.push({
        name,
        quantity,
        unit,
        price
    });

    saveBill();
    renderBill();
    updateBillTotal();

    // Reset form
    nameInput.value = '';
    priceInput.value = '';
    quantityInput.value = '';
    unitSelect.value = 'kg';
}

    const downloadBillBtn = document.getElementById('download-bill');
    downloadBillBtn.addEventListener('click', downloadBill);

    const completeBillBtn = document.getElementById('complete-bill');
    completeBillBtn.addEventListener('click', completeBill);

    const currentBillTab = document.getElementById('current-bill-tab');
    const billingHistoryTab = document.getElementById('billing-history-tab');
    const currentBillView = document.getElementById('current-bill-view');
    const billingHistoryView = document.getElementById('billing-history-view');

    currentBillTab.addEventListener('click', () => {
        currentBillView.style.display = 'block';
        billingHistoryView.style.display = 'none';
        currentBillTab.classList.add('active-tab');
        billingHistoryTab.classList.remove('active-tab');
    });

    billingHistoryTab.addEventListener('click', () => {
        currentBillView.style.display = 'none';
        billingHistoryView.style.display = 'block';
        billingHistoryTab.classList.add('active-tab');
        currentBillTab.classList.remove('active-tab');
        renderBillingHistory();
    });

    renderBill();

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        renderProducts(e.target.value);
    });

    const cancelEditButton = document.getElementById('cancel-edit');
    cancelEditButton.addEventListener('click', cancelEdit);
}

document.addEventListener('DOMContentLoaded', init);
