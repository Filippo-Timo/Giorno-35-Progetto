const getYearInFooter = function () {
  const footer = document.getElementById("year");
  footer.innerText = new Date().getFullYear();
};

getYearInFooter();

const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkY2U5ZmY0YmQ0NzAwMTU4NWIyMzQiLCJpYXQiOjE3NjI1MTI1NDMsImV4cCI6MTc2MzcyMjE0M30.R9nR1v_nX1LdCyzK4q4sMvjHRxGLgnI4w-qjiQeKAnQ";

const url = location.search;
const allTheParameters = new URLSearchParams(url);
const id = allTheParameters.get("productID");

if (id) {
  fetch(apiUrl + "/" + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZDJhZmY0YmQ0NzAwMTU4NWIyNDUiLCJpYXQiOjE3NjI1MTM1ODMsImV4cCI6MTc2MzcyMzE4M30.3-s9XE4nRqf3YMobngSTcyTyh52oGplj1cbxteUyeM8",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((productDetails) => {
      document.getElementById("name").value = productDetails.name;
      document.getElementById("description").value = productDetails.description;
      document.getElementById("brand").value = productDetails.brand;
      document.getElementById("imageUrl").value = productDetails.imageUrl;
      document.getElementById("price").value = productDetails.price;
    })
    .catch((err) => {
      console.log("errore nel ripopolamento del form", err);
    });
}

// CREO L'OGGETTO PRODUCT
class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const form = document.getElementById("event-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("imageUrl");
  const priceInput = document.getElementById("price");

  const name = nameInput.value;
  const description = descriptionInput.value;
  const brand = brandInput.value;
  const imageUrl = imageUrlInput.value;
  const price = priceInput.value;

  const newProduct = new Product(name, description, brand, imageUrl, price);
  console.log("Nuovo Prodotto", newProduct);

  let finalUrl;

  if (id) {
    finalUrl = apiUrl + "/" + id;
  } else {
    finalUrl = apiUrl;
  }

  fetch(finalUrl, {
    method: id ? "PUT" : "POST",
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZDJhZmY0YmQ0NzAwMTU4NWIyNDUiLCJpYXQiOjE3NjI1MTM1ODMsImV4cCI6MTc2MzcyMzE4M30.3-s9XE4nRqf3YMobngSTcyTyh52oGplj1cbxteUyeM8",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Prodotto salvato correttamente!");
        form.reset();
      } else {
        throw new Error(`Errore nella risposta del server: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Non è stato possibile salvare il prodotto: ", err);
    });
});
