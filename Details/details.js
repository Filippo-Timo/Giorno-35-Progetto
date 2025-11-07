const getYearInFooter = function () {
  const footer = document.getElementById("year");
  footer.innerText = new Date().getFullYear(); // 2025
};

getYearInFooter();

const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkY2U5ZmY0YmQ0NzAwMTU4NWIyMzQiLCJpYXQiOjE3NjI1MTI1NDMsImV4cCI6MTc2MzcyMjE0M30.R9nR1v_nX1LdCyzK4q4sMvjHRxGLgnI4w-qjiQeKAnQ";

const url = location.search;
const allTheParameters = new URLSearchParams(url);
const id = allTheParameters.get("productID");

const getDetails = function () {
  fetch(apiUrl + "/" + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZDJhZmY0YmQ0NzAwMTU4NWIyNDUiLCJpYXQiOjE3NjI1MTM1ODMsImV4cCI6MTc2MzcyMzE4M30.3-s9XE4nRqf3YMobngSTcyTyh52oGplj1cbxteUyeM8",
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
      document.getElementById("name").innerText = productDetails.name;
      document.getElementById("description").innerText =
        productDetails.description;
      document.getElementById("price").innerText = productDetails.price + "€";
      document.getElementById("time").innerText = productDetails.time;
    })
    .catch((err) => {
      console.log("Non sono riuscito a recuperare i dettagli", err);
    });
};

getDetails();

// FUNZIONE DELETE
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
        // problema nell'eliminazione
        throw new Error(`Abbiamo il seguente problema: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Non è stato possibile eliminare il doggo", err);
    });
};

// QUESTA FUNZIONE MI RIPORTA IN BACKOFFICE SALVANDO L'ID DEL PRODOTTO
const editEvent = function () {
  location.assign("../BackOffice/BackOffice.html?productID=" + id);
};
