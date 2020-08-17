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
              <div class="product-price"><span>${price}<b>₽</b></span></div>
              <i class="fas fa-shopping-cart fa-2x"><button class="btn-buy"></button></i>
            </div>
          </div>`;
};

const renderProducts = (list) => {
  const productList = list.map(({title, price}) => {
      return renderProduct(title, price);
  });
  document.querySelector('.products').innerHTML = productList.join('');
}
//
// const renderProducts = (list) => {
//   const productList = list.map(({title, price}) => {
//       return renderProduct(title, price);
//   });
//   document.querySelector('.products').innerHTML = productList.join('');
// }

renderProducts(products);
