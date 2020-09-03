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
  constructor(container = '.container') {
    this.container = container;
    this.items = [];
    this._handleActions();
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
      let item = this.getOrCreate(product);
      if (item) {this.items.push(item)};
      this._render();
    }
  }

  remove(evt) {
    if (evt.target.classList.contains('delete')) {
      let filtered = this.items.filter(function(el) { return el.id != evt.target.dataset['id']; });
      this.items = filtered;
      this._render();
    }
  }

  getOrCreate(product) {
    let item = this.items.find(element => element.id == product.id)
    if (item) {
      item.quantity++;
    } else {
      return new BasketItem(product)
    }
  }

  _handleActions() {
    document.querySelector('.btn-cart').addEventListener('click', () => {
      let element = document.querySelector('.container');
      if (element.classList.contains('d-none')) {
        element.classList.remove('d-none');
      } else {
        element.classList.add('d-none');
      }
    });
    document.querySelector(this.container).addEventListener('click', () => {
      let element = document.querySelector('.delete');
      console.log(1)
    });
  }

  calcTotalProductsPrice() {
    return this.items.reduce((sumPrice, { price, quantity }) => sumPrice + parseInt(price) * quantity, 0);
  }

  _render() {
    let block = document.querySelector(this.container);
    block.addEventListener('click', evt => {this.remove(evt)})
    block.innerHTML = '';
    let htmlStr = '';
    this.items.forEach(el => {
      htmlStr += el._render()
    })
    block.innerHTML = `
        <div class="row justify-content-end cart">
            <div class="col-1">Товар</div>
            <div class="col-1">Количество</div>
            <div class="col-1">Цена</div>
            <div class="col-1">Удалить?</div>
        </div>
        ${htmlStr}
        <div class="row justify-content-end cart total">${this.calcTotalProductsPrice()}<div>`;
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
    return `
    <div class="row justify-content-end cart">
      <div class="col-1">${this.title}</div>
      <div class="col-1">${this.quantity}</div>
      <div class="col-1">${this.price}</div>
      <div class="col-1 delete"><button type="button" class="btn-sm btn-warning delete" data-id="${this.id}">удалить</button></div>
    </div>
    `;
  }
}


new ProductList();
