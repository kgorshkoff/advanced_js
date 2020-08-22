class ProductList {

  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];

    this.fetchProducts();
    this.render();
    this.calcTotal();
  }

  fetchProducts() {
    this.goods = [
      {id: 1, title: 'Notebook', price: 20000},
      {id: 2, title: 'Mouse', price: 1500},
      {id: 3, title: 'Keyboard', price: 5000},
      {id: 4, title: 'Gamepad', price: 4500},
    ];
  }

  render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);

      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  calcTotal() {
    let total = 0;
    this.allProducts.forEach(el => total += el.price);
    console.log(total);
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/192x192') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <h3>${this.title}</h3>
              <img src="${this.img}" alt="Some img">
              <div class="product-container">
                  <div class="product-price"><span>${this.price}<b>₽</b></span></div>
                  <i class="fas fa-shopping-cart fa-2x"><button class="btn-buy"></button></i>
              </div>
          </div>`;
  }
}

new ProductList();
