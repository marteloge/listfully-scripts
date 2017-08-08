var isProductPage = (document.location.pathname).match('/products');
var link =
  "https://www.listfully.org/add?" +
  "storeId=" + storeId +
  "&store=" + storeName +
  "&website=" + website +
  "&currency=" + currency +
  "&image=" + product_image;

var generateListfullyLink = function() {
  // set product price
  var price = $('div.klarna-widget').data('price') || $('div.product-price').text();
  if (price && parseInt(price)) { link = link + "&price=" + parseInt(price); }
  
  // set product name
  var name = $('form#add2cart').find('h1').text();
  if (name) {
    link = link + "&name=" + encodeURIComponent(name);  
  }

  // set product description
  var description = $("meta[name='description']").attr("content");
  if (description) {
    link = link + "&description=" + encodeURIComponent(description);
  }

  // set product quantity
  var quantity = $( "input[name$='quantity']" ).val() || 1;
  if (quantity) {
    link = link + "&quantity=" + quantity;
  }

  return link;
}

var getURL = function(link) {
  var productId = $("select").attr("option_id");
  var detailsId = $("select").val();
  link = link + "&url=" +
    (document.location.origin || document.location.hostname) +
    document.location.pathname;
    
  if (productId && detailsId) {
     link = link + "%23" + productId + "-" + detailsId;
  }
  return link;
}

if (!!isProductPage) {
  var base = generateListfullyLink();
  $("#listfully").attr("href", getURL(base));

  $( "select" ).change(function() {
    $("#listfully").attr("href", getURL(base));
  });
  
  $( "input" ).change(function() {
    $("#listfully").attr("href", getURL(base));
  });
}
