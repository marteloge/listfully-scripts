var isProductPage = (document.location.pathname).match('/produkt');
var url = "https://www.listfully.org/add"

var generateLinkCart = function(url) {
  var cartLink = window.location.origin + "/handlevogn/fill?products=";
  
  var productId = $("input[name='id']").val();
  if (productId) { cartLink = cartLink + productId; }
  else { return url; }
  
  var details = $("div .product__attributes").find("select").val();
  if (details) { cartLink = cartLink + "." + details; }
  
  return cartLink
}


var generateListfullyLink = function(url, storeId, props) {
  var link = url + "?code=" + storeId + "&store=Be:Eco";
  
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
       } else if (value === "og:url" && propValue) {
         link = link + "&" + key + "=" + generateLinkCart(propValue)
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
