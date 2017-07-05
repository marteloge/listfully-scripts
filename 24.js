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

var generateLinkCart = function(url) {
  var product = $("input[name='id']").val();
  var details = $("div .product__attributes").find("select").val();
  var cartLink = window.location.origin + "/handlevogn/fill?products=" + product;
  if (details) { cartLink = cartLink + "." + details; }
  return cartLink
}


var generateListfullyLink = function(url, storeId, props) {
  var link = url + "?code=" + storeId + "&store=Be:Eco;
  
  var quantity = $("input[name='antall']").val();
  if (quantity) {
    link = link + "&quantity=" + quantity;
  } else {
    link = link + "&quantity=1";
  }
  
  $.each( props, (key, value) => {
    if($("meta[property='" + value + "']").attr('property') !== null) {
       var propValue = $("meta[property='" + value + "']").attr('content');
       if (value === "product:price:amount" && !isNaN(propValue)) {
         link = link + "&" + key + "=" + parseInt(propValue);
       if (value === "og:url" && propValue) {
         link = link + "&" + key + "=" + generateLinkCart()
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
