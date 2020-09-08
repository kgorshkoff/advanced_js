const add = (cart, req) => {
  cart.contents.push(req.body);
  return JSON.stringify(total(cart), null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(total(cart), null, 4);
};
const del = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  cart.contents.splice(find, 1);
  return JSON.stringify(total(cart), null, 4);
};

const total = (cart) => {
  cart.countGoods = cart.contents.reduce((sum, current) => {return sum + current.quantity} ,0);
  cart.amount = cart.contents.reduce((sum, current) => {return sum + (current.price * current.quantity)} ,0);
  return cart
}

module.exports = {
  add,
  change,
  del,
};
