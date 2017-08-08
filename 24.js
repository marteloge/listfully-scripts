//storeId, storeName, currency and website in config file

var isProductPage = (document.location.pathname).match('/produkt');
var url = "https://www.listfully.org/add";
var productTab;

var visitStore = function(url) {
  if (productTab) { productTab.close() }
  productTab = window.open(url, "listfully", "");
}

var getOrigin = function() {
  return window.location.origin ? window.location.origin : (window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''));
}

var generateNewLink = function(generatedLink) {
  var link = generatedLink;
  
  var quantity = $("input[name='antall']").val();
  if (quantity) {
    link = link + "&quantity=" + quantity;
  } else {
    link = link + "&quantity=1";
  }

  return link;
}

var generateListfullyLink = function() {
  var link =
      url + "?code=" + storeId +
      "&store=" + storeName +
      "&website=" + website +
      "&url=" + encodeURIComponent(document.location.href) +
      "&currency=" + currency;

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
  var base = generateListfullyLink();
  $( "a.product__wishlist-button" ).replaceWith(
    "<a target='listfully' " +
    "id='listfully' class='button large expand secondary product__wishlist-button disabled'>" +
    "<i class='icon-favorite'></i>Ønskeliste</a>"
  );

  //$( "input#buy_count" ).change(function() {
  //   $("#listfully").attr("href", generateNewLink(base));
  //});
  
  $("a#listfully").click(function() {
    visitStore(generateNewLink(base))
  });
}
