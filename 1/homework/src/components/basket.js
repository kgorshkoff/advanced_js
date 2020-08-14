const products = [
  {id: 1, title: 'Notebook', price: 20000},
  {id: 2, title: 'Mouse', price: 1500},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, img = 'https://placehold.it/192x192') => {
  return `<div class="product-item">
            <h3>${title}</h3>
            <img src="${img}" alt="">
            <div class="product-container">
              <p>${price}₽</p>
              <button class="btn-buy">Добавить в корзину</button>
            </div>
          </div>`;
};

const renderProducts = (list) => {
  const productList = list.map(({title, price}) => {
      return renderProduct(title, price);
  });
  // console.log(productList);
  document.querySelector('.products').innerHTML = productList.join('');
}

renderProducts(products);
