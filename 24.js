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
  
  link = link + "&quantity=1";

  $.each( props, (key, value) => {
    if($("meta[property='" + value + "']").attr('property') !== null) {
       var propValue = $("meta[property='" + value + "']").attr('content');
       if (value === "product:price:amount" && !isNaN(propValue)) {
         link = link + "&" + key + "=" + parseInt(propValue);
       } else {
         link = link + "&" + key + "=" + encodeURIComponent(propValue);
       }
    }
  });

  return link;
}

if (!!isProductPage) {
  var link = generateListfullyLink(url, storeId, props);
  
  $( "a.product__wishlist-button" ).replaceWith(
    "<a target='_blank' href='" + link + "' class='button large expand secondary product__wishlist-button disabled'>" +
    "<i class='icon-favorite'></i>Ønskeliste</a>"
  );
}






