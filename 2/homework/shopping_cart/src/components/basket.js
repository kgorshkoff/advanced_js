
class BasketList {
  constructor(container = '.btn-wrapper') {
    this.container = container;
    this.items = [];
    this.total = 0;
    this.invisible = false;
    this._handleActions();
    this._render();
  }

  add(item) {

  }

  remove(item) {

  }

  _handleActions() {

  }

  _render() {

  }
}


class BasketItem {
  constructor(product, quantity= 1) {
    this.id = product.id;
    this.title = product.title;
    this.img = product.img;
    this.price = product.price;
    this.quantity = quantity;
  }

  _render() {

  }
}

new BasketList();