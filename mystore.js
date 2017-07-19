var storeId = "123456789"
var website = "http://listfully.demo.mystore.no";
var imageURL = window.location.origin + "/users/listfully_mystore_no/images/";
var storeName = "MyStore";
var currency = "NOK";

//----------------------------

var url = "https://www.listfully.org/add"
var isProductPage = (document.location.pathname).match('/products');
var props = {
  'productImage': 'image',
  'productPrice': 'price',
  'productTitle': 'name'
}

var generateListfullyLink = function(url, storeId, props) {
  var link = url + "?code=" + storeId + "&quantity=1" + "&store=" + storeName + "&website=" + website;

  if ($("meta[name='description']").attr('content') !== null) {
     link = link + "&description=" +
       encodeURIComponent(
         $("meta[name='description']")
         .attr('content')
         .trim()
         .replace(/\r?\n|\r/g, "")
       );
  }
  
  $.each( props, (key, value) => {
    var propValue = $('article').data(key);
    if (key === "productPrice" && !isNaN(propValue)) {
      link = link + "&" + value + "=" + parseInt(propValue)
    } else if (key === "productImage" && propValue) {
      link = link + "&" + value + "=" + imageURL + (propValue).split("/").slice(-1).pop();
    } else {
      link = link + "&" + value + "=" + encodeURIComponent(propValue)
    } 
  });

  return link;
}

var getURL = function(link) {
  var productId = $("select").attr("option_id");
  var detailsId = $(".product_attributes_wrapper").find("select").val();
  link = link + "&url=" + window.location.origin + window.location.pathname;
    
  if (productId && detailsId) {
     link = link + "%23" + productId + "-" + detailsId;
  }
  return link;
}

if (!!isProductPage) {
  var link = generateListfullyLink(url, storeId, props);
  $( "#add_to_wishlist" ).replaceWith(
    "<a target='_blank' href='" + getURL(link) +
    "' id='listfully' class='btn btn-borders btn-secondary'>" +
    "<i style='margin-right:5px;' class='fa fa-heart'></i>Ønskeliste</a>"
  );

  $( "select" ).change(function() {
    $("#listfully").attr("href", getURL(link));
  });
}
