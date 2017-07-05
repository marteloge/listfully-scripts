var isProductPage = (document.location.pathname).match('/products');
var url = "https://www.listfully.org/add"
var storeId = "123456789"
var props = {
  'productImage': 'image',
  'productPrice': 'price',
  'productTitle': 'name'
}

var generateListfullyLink = function(url, storeId, props) {
  var link = url + "?code=" + storeId + "&quantity=1";

  if ($("meta[name='description']").attr('content') !== null) {
     link = link + "&description=" +
       encodeURIComponent(
         $("meta[name='description']")
         .attr('content')
         .trim()
         .replace(/\r?\n|\r/g, "")
       );
  }
  
  var productId = $("select").attr("option_id");
  var detailsId = $(".product_attributes_wrapper").find("select").val();
  link = link + "&url=" + window.location.origin + window.location.pathname;
    
  if (productId && detailsId) {
     link = link + "#" + productId + "-" + detailsId;
  }
  
  $.each( props, (key, value) => {
    var propValue = $('article').data(key);
    if (key === "productPrice" && !isNaN(propValue)) {
      link = link + "&" + value + "=" + parseInt(propValue)
    } else if (key === "productImage" && propValue) {
      link = link + "&" + value + "=" + window.location.origin + "/users/listfully_mystore_no/images/" + (propValue).split("/").slice(-1).pop();
    } else {
      link = link + "&" + value + "=" + encodeURIComponent(propValue)
    } 
  });

  return link;
}

if (!!isProductPage) {
  var link = generateListfullyLink(url, storeId, props);
  $( ".product-actions" ).append(
    "<a target='_blank'" +
    " href='" + link + "' " +
    " style='background-color:black;'" +
    " id='listfully'" +
    " name='add_to_listfully' " +
    " class='btn btn-primary btn-icon'" +
    " >" +
      "<i class='fa fa-heart'></i>" +
      "<span>Legg til i ønskeliste</span>" +
    "</a>"
  );
}
