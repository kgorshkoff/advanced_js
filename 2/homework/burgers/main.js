class HamburgerList {
  constructor(container = '.container') {
    this.container = container;
    this.burgers = [];
    this.stuffings = [];
    this.toppings = [];

    this._fetchProducts();
    this._render();
    this._handleActions();
  }

  _fetchProducts() {
    this.burgers = [
      {id: 1, title: 'Маленький', price: 50, cal: 20},
      {id: 2, title: 'Большой', price: 100, cal: 40}
      ];
    this.stuffings = [
      {id: 1, title: 'с сыром', price: 10, cal: 20},
      {id: 2, title: 'с салатом', price: 20, cal: 5},
      {id: 3, title: 'с картофелем', price: 15, cal: 10}
      ];
    this.toppings =  [
      {id: 1, title: 'Приправы', price: 15, cal: 0},
      {id: 2, title: 'Майонез', price: 20, cal: 5}
      ];
  }

  _render() {
    let htmlStr = ``
    let block = document.querySelector('#burgers');
    this.burgers.forEach(element => {
      htmlStr += `
        <input type="radio" name="burgers" data-id="${element.id}">${element.title} ${element.price}₽
        <br>
      `;
      });
    block.insertAdjacentHTML('beforeend', '<form id="burgers_button">' + htmlStr + '</form>');

    htmlStr = ``
    block = document.querySelector('#stuffings');
    this.stuffings.forEach(element => {
      htmlStr += `
        <input type="radio" name="burgers" data-id="${element.id}">${element.title}&emsp;${element.price}₽
        <br>
      `;
      });
    block.insertAdjacentHTML('beforeend', '<form id="stuffings_button">' + htmlStr + '</form>');

    htmlStr = ``
    block = document.querySelector('#toppings');
    this.toppings.forEach(element => {
      htmlStr += `
        <input type="checkbox" name="burgers" data-id="${element.id}">${element.title}&emsp;${element.price}₽
        <br>
      `;
      });
    block.insertAdjacentHTML('beforeend', '<form id="toppings_button">' + htmlStr + '</form>');
    }

  _handleActions() {
    if (!document.getElementById('burgers_button').checked) {
      console.log(1)
    }
    const block = document.querySelector('#calc')


  }
}


class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
  }
  addTopping(topping) {

  }
  removeTopping(topping) {

  }
  getToppings(topping) {

  }
  getSize() {

  }
  getStuffing() {

  }
  calculatePrice() {

  }
  calculateCalories() {

  }
}

new HamburgerList();