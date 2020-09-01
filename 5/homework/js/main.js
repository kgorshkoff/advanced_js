const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    basketUrl: '/getBasket.json',
    searchString: '',
    filtered: [],
    products: [],
    basket: [],
    isVisibleCart: false,
    imgCatalog: 'https://placehold.it/200x150',
    imgBasket: 'https://placehold.it/50x100'
  },

  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product){
      let find = this.basket.find(el => el.id_product === product.id_product);
      if (find) {
        find.quantity++;
      } else {
        product.img = this.imgBasket;
        this.$set(product, 'quantity', 1);
        this.basket.push(product);
      }
    },
    removeProduct(product){
    let find = this.basket.find(el => el.id_product === product.id_product);
      if (find.quantity > 1) {
        find.quantity--
      } else {
        this.basket.splice(this.basket.indexOf(find), 1);
      }
    },
    filterGoods(event) {
      const regexp = new RegExp(event.target.value, 'i');
      this.filtered = this.products.filter(product => regexp.test(product.product_name));
      this.products.forEach(el => {
        if (this.filtered.includes(el)) {
          el.visible = true;
        } else {
          el.visible = false;
        }
      })
    }
  },

  created(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.$set(el, 'visible', true);
          this.products.push(el);
        }
      });
    // this.getJson(`${API + this.basketUrl}`)
    //   .then(data => {
    //     for(let el of data.contents){
    //       this.basket.push(el);
    //     }
    //   });
  }
});
