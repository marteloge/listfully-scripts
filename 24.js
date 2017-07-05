var storeId = "123456";
var storeName = "Be:Eco";
var currency = "NOK";

var isProductPage = (document.location.pathname).match('/produkt');
var url = "https://www.listfully.org/add";
var props = {
  'price': 'product:price:amount',
  'currency': 'product:price:currency',
  'image': 'og:image',
  'name': 'og:title',
  'description': 'og:description'
};

var generateNewLink = function(generatedLink) {
  var newLink = generatedLink;

  newLink = newLink + "&url=" + window.location.origin + "/handlevogn/fill?products=";

  var productId = $("input[name='id']").val();
  if (productId) { newLink = newLink + productId; }
  else { return url; }

  var details = $("div .product__attributes").find("select");
  if (details) {
    $.each( details, function( key, value ) {
      newLink = newLink + "." + $(value).val();
    });
  }

  return newLink;
}

var generateListfullyLink = function(url, storeId, props) {
  var link = url + "?code=" + storeId + "&store=" + storeName;

  if (currency) {
    link = link + "&currency" + currency;
  }

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
    "<a target='_blank' href='" + generateNewLink(link) +
    "' id='listfully' class='button large expand secondary product__wishlist-button disabled'>" +
    "<i class='icon-favorite'></i>Ønskeliste</a>"
  );

  $( "select" ).change(function() {
    $("#listfully").attr("href", generateNewLink(link));
  });

  $( "input#buy_count" ).change(function() {
    $("#listfully").attr("href", generateNewLink(link));
  });
}
