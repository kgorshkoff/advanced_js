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
  constructor(container = '.cart') {
    this.container = container;
    this.items = [];
    this.total = 0;
    this.invisible = false;
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
      let item = this.get_or_create(product);
      if (item) {this.items.push(item)};
      this._render();
    }
  }

  remove(item) {

  }

  get_or_create(product) {
    let item = this.items.find(element => element.id == product.id)
    if (item) {
      const block = document.getElementById(`${item.id}`)
      // let newQuantity = item.quantity + 1
      // block.innerHTML = block.innerHTML.replace(`quantity">${item.quantity}`, `quantity">${newQuantity}`)
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
    return this.items.reduce((sumPrice, { price, quantity }) => sumPrice + parseInt(price) * quantity, 0);
  }

  _render() {
    let htmlBlock = document.querySelector(this.container);
    htmlBlock.innerHTML = '';
    let htmlStr = '';
    this.items.forEach(el => {
      htmlStr += el._render()
    })
    htmlBlock.innerHTML = `
        <table class="cart-item">
            ${htmlStr}
        </table>
        <div class="total">${this.calcTotalProductsPrice()}<div>`;
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
    <tr id="${this.id}">
        <td id="title">${this.title}</td>
        <td id="quantity">${this.quantity}</td>
        <td id="price">${this.price}</td>
        <td id="delete">Удалить</td>
    </tr>
    `;
  }
}


new ProductList();
