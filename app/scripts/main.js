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
            <h5>${result.name}</h5>
            <p >${result.description}</p>
            <p>De: ${result.oldPrice}</p>
            <p>Por: ${result.price}</p>
            <button class="send" type="button">Comprar</button>
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

getProducts("frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1");
