const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error!')
      } else
        cb(xhr.responseText);
    }
  }
  xhr.send();
};

class ProductList {

  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.basket = null;
    this.allProducts = [];

    this.fetchProducts();
  }

  fetchProducts() {
    return new Promise(((resolve, reject) => {
      getRequest(`${API}/catalogData.json`, (data) => {
        if (data) {
          resolve(this.goods = JSON.parse(data));
          this.render();
          this.calcTotalProductsPrice();
        } else {
          reject('No data!');
        }
      })}));
  }

  render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);

      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
    this.basket = new BasketList();
    block.addEventListener('click', evt => this.basket.add(evt));
  }

  calcTotalProductsPrice() {
    let total = 0;
    this.allProducts.forEach(el => total += el.price);
    console.log(total);
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/192x192') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button 
                   class="buy-btn"
                   data-id="${this.id}" 
                   data-title="${this.title}"
                   data-price="${this.price}"
                   data-img="${this.img}"
                   >Купить</button>
              </div>
          </div>`;
  }
}


class BasketList {
  constructor(container = '.cart-wrapper') {
    this.container = container;
    this.items = [];
    this.total = 0;
    this.invisible = false;
    this._handleActions();
    this._render();
  }

  add(evt) {
    if(evt.target.name = "add" && evt.target.tagName == 'BUTTON') {
      let dataset = evt.target.dataset;
      let product = {
        id: dataset.id,
        title: dataset.title,
        price: dataset.price,
        img: dataset.img,
      }
      this.items.push(this.get_or_create(product));
      this.calcTotalProductsPrice();
    }
  }

  remove(item) {

  }

  get_or_create(product) {
    let item = this.items.find(element => element.id == product.id)
    if (item) {
      item.quantity++;
    } else {
      return new BasketItem(product)
    }
  }

  _handleActions() {
    document.querySelector('.btn-cart').addEventListener('click', () => {
      let element = document.querySelector('.cart')
      if (element.style.display === 'none') {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
  }

  calcTotalProductsPrice() {
    return this.items.reduce((sumPrice, { price }) => sumPrice + price, 0);
  }

  _render() {

  }
}


class BasketItem {
  constructor(product, quantity= 1) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.img = product.img;
    this.quantity = quantity;
    this._render();
  }

  _render() {
    let htmlStr = `
    <tr>
        <td>${this.title}</td>
        <td>${this.quantity}</td>
        <td>${this.price}</td>
        <td></td>
    </tr>
    `
    document.querySelector('.cart-item').insertAdjacentHTML('beforeend', htmlStr)
  }
}


new ProductList();