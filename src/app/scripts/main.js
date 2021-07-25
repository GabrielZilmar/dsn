const request = new XMLHttpRequest();
let nextPage;

function getProducts(url) {
  request.open("GET", `https://${url}`);

  request.onload = function () {
    const result = JSON.parse(this.responseText);
    nextPage = result.nextPage;

    const container = document.getElementById("products");

    result.products.forEach((result, idx) => {
      const product = document.createElement("div");
      product.classList = "product-body";

      const content = `
        <div id="collapse-${idx}" class="collapse show" aria-labelledby="heading-${idx}" data-parent="#accordion">
          <div class="product">
            <img src="${result.image}" alt="">
            <h5 style="height: 0px">${result.name}</h5>
            <p style="margin-bottom:-10px">${result.description}</p>
            <p class="oldPrice">De: R$${result.oldPrice}</p>
            <p class="price">Por: R$${result.price}</p>
            <p class="oldPrice">ou ${result.installments.count}x de R$${result.installments.value}</p>
            <button class="send" type="button" style="height: 30px; margin-top: 8px";>Comprar</button>
          </div>
        </div>
      `;

      container.innerHTML += content;
    });
  };

  request.onerror = function () {
    alert("Request error!");
  };

  request.send();
}

function changePage() {
  getProducts(nextPage);
}

function emailIsValid(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

function cpfIsValid(cpf) {
  const regex = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{11}$)/;
  return regex.test(String(cpf).toLowerCase());
}

function register() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const cpf = document.getElementById("cpf");
  const male = document.getElementById("male");
  const female = document.getElementById("female");

  if (!emailIsValid(email.value)) {
    email.style.borderColor = "red";
  } else {
    email.style.removeProperty("border");
  }
  if (!cpfIsValid(cpf.value)) {
    cpf.style.borderColor = "red";
  } else {
    cpf.style.removeProperty("border");
  }

  const user = {
    name: name.value,
    email: email.value,
    cpf: cpf.value,
    male: male.checked,
    female: female.checked,
  };
  /* Could send user by post */
}

function shareNew() {
  const email = document.getElementById("femail");
  if (!emailIsValid(email.value)) {
    email.style.borderColor = "red";
  } else {
    email.style.removeProperty("border");
  }
}

getProducts("frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1");
