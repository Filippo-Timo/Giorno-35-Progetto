const getYearInFooter = function () {
  const footer = document.getElementById("year");
  footer.innerText = new Date().getFullYear();
};

getYearInFooter();

const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkY2U5ZmY0YmQ0NzAwMTU4NWIyMzQiLCJpYXQiOjE3NjI1MTI1NDMsImV4cCI6MTc2MzcyMjE0M30.R9nR1v_nX1LdCyzK4q4sMvjHRxGLgnI4w-qjiQeKAnQ";

// CREO FUNZIONE DELETE PER IL TASTO ROSSO DELLE CARDS
const url = location.search;
const allTheParameters = new URLSearchParams(url);
const id = allTheParameters.get("productID");

const deleteEvent = function () {
  fetch(apiUrl + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZDJhZmY0YmQ0NzAwMTU4NWIyNDUiLCJpYXQiOjE3NjI1MTM1ODMsImV4cCI6MTc2MzcyMzE4M30.3-s9XE4nRqf3YMobngSTcyTyh52oGplj1cbxteUyeM8",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Il doggo non c'è più!");
        location.assign("../Home/home.html");
      } else {
        throw new Error(`Abbiamo il seguente problema: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Non è stato possibile eliminare il doggo", err);
    });
};

const addCards = function () {
  fetch(apiUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZDJhZmY0YmQ0NzAwMTU4NWIyNDUiLCJpYXQiOjE3NjI1MTM1ODMsImV4cCI6MTc2MzcyMzE4M30.3-s9XE4nRqf3YMobngSTcyTyh52oGplj1cbxteUyeM8",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("Evvai", res);
        return res.json();
      } else {
        throw new Error(`Errore nell'if: ${res.status}`);
      }
    })
    .then((arrayOfProducts) => {
      console.log("I prodotti disponibili sono: ", arrayOfProducts);
      const row = document.getElementById("products-row");
      arrayOfProducts.forEach((product) => {
        console.log(product);
        row.innerHTML += `
            <div class="col">
                <div class="card h-100 d-flex flex-column" style="background-color: white; border: 1px solid #722ef5">
                    <img src="https://placedog.net/100" class="card-img-top" alt="doggo">
                    <div class="card-body flex-grow-1">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">${product.brand}</p>
                        <p class="card-text">${product.price} €</p>
                    </div>
                    <div class="d-flex justify-content-evenly">
                    <a href="../BackOffice/BackOffice.html?productID=${product._id}" class="btn btn-warning text-light my-1 w-25"><i class="bi bi-pencil-square"></i></a>
                    <a href="../Details/details.html?productID=${product._id}" class="btn btn-success text-light my-1 w-auto">Vai ai dettagli</a>
                    <button onclick="deleteEvent() "href="./home.html?productID=${product._id}" class="btn btn-danger text-light my-1 w-25"><i class="bi bi-trash-fill"></i></button>
                    </div>
                </div>
            </div>
        `;
      });
    })
    .catch((err) => {
      console.log("ERRORE NEL CATCH:", err);
    });
};

addCards();
