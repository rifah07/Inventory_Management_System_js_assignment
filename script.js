const productForm = document.getElementById("productForm");
const productTableBody = document.getElementById("productTableBody");

// Initial products array
const initialProducts = [
  {
    name: "Laptop",
    quantity: 10,
    price: 800,
    vendor: "Dell",
    category: "Electronics",
  },
  {
    name: "Phone",
    quantity: 25,
    price: 500,
    vendor: "Samsung",
    category: "Electronics",
  },
  {
    name: "Desk Chair",
    quantity: 15,
    price: 150,
    vendor: "Ikea",
    category: "Furniture",
  },
];

let products = [...initialProducts]; // Initialize with the given products
let editIndex = -1;

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const productName = document.getElementById("productName").value.trim();
  const productQuantity = document
    .getElementById("productQuantity")
    .value.trim();
  const productPrice = document.getElementById("productPrice").value.trim();
  const productVendor = document.getElementById("productVendor").value.trim();
  const productCategory = document
    .getElementById("productCategory")
    .value.trim();

  if (
    productName &&
    productQuantity &&
    productPrice &&
    productVendor &&
    productCategory
  ) {
    const product = {
      name: productName,
      quantity: productQuantity,
      price: productPrice,
      vendor: productVendor,
      category: productCategory,
    };

    if (editIndex === -1) {
      products.push(product);
    } else {
      products[editIndex] = product;
      editIndex = -1;
    }

    productForm.reset();
    renderProducts();
  } else {
    alert("Please fill in all fields.");
  }
});

function renderProducts() {
  productTableBody.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="py-2 px-4 border-b text-center">${product.name}</td>
        <td class="py-2 px-4 border-b text-center">${product.quantity}</td>
        <td class="py-2 px-4 border-b text-center">${product.price}</td>
        <td class="py-2 px-4 border-b text-center">${product.vendor}</td>
        <td class="py-2 px-4 border-b text-center">${product.category}</td>
        <td class="py-2 px-4 border-b text-center">
          <button class="bg-green-500 text-white px-2 py-1 rounded" onclick="editProduct(${index})">Edit</button>
          <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteProduct(${index})">Delete</button>
        </td>
      `;

    productTableBody.appendChild(row);
  });
}

window.editProduct = function (index) {
  const product = products[index];
  document.getElementById("productName").value = product.name;
  document.getElementById("productQuantity").value = product.quantity;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productVendor").value = product.vendor;
  document.getElementById("productCategory").value = product.category;
  editIndex = index;
};

window.deleteProduct = function (index) {
  products.splice(index, 1);
  renderProducts();
};

// Render the initial products
renderProducts();