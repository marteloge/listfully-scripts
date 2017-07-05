var isProductPage = (document.location.pathname).match('/produkt');
var url = "https://www.listfully.org/add"
var storeId = "1628294150"
var props = {
  'price': 'product:price:amount',
  'currency': 'product:price:currency',
  'image': 'og:image',
  'name': 'og:title',
  'description': 'og:description',
  'url': 'og:url'
};
