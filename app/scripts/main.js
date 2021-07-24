const request = new XMLHttpRequest();

request.open("GET", "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1");

request.onload = function () {
  const { products } = JSON.parse(this.responseText);

  const container = document.getElementById("products");

  products.forEach((result, idx) => {
    const product = document.createElement("div");
    product.classList = "product-body";

    const content = `
      <div id="collapse-${idx}" class="collapse show" aria-labelledby="heading-${idx}" data-parent="#accordion">
        <div class="product">  
          <h5>${result.name}</h5>
          <p>${result.description}</p>
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
