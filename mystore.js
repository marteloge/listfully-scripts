var isProductPage = (document.location.pathname).match('/products');
var url = "https://www.listfully.org/add"
var storeId = "123456789"
var props = {
  'productImage': 'image',
  'productPrice': 'price',
  'productTitle': 'name'
}


var generateListfullyLink = function(url, storeId, props) {
  var link = url + "?code=" + storeId;

  if ($("meta[name='description']").attr('content') !== null) {
     link = link + "&description=" + $("meta[name='description']").attr('content')
  }

  $.each( props, (key, value) => {
    link = link + "&" + value + "=" + $('article').data(key)
  });

  return link;
}

if (!!isProductPage) {
  generateListfullyLink(url, storeId, props);
}
