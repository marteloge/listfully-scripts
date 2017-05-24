var isProductPage = (document.location.pathname).match('/produkt');
var url = "https://www.listfully.org/add"
var storeId = "123456789"
var props = {
  'price': 'product:price:amount',
  'currency': 'product:price:currency',
  'image': 'og:image',
  'name': 'og:title',
  'description': 'og:description',
  'url': 'og:url'
};

var generateListfullyLink = function(url, storeId, props) {
  var link = url + "?code=" + storeId;

  $.each( props, (key, value) => {
    if($("meta[property='" + value + "']").attr('property') !== null) {
       link = link + "&" + key + "=" + $("meta[property='" + value + "']").attr('content')
    }
  });

  return link;
  //return encodeURIComponent(link);
}

if (!!isProductPage) {
  console.log("loaded");
  retrun generateListfullyLink(url, storeId, props);
}
