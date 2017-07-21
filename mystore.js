var isProductPage = (document.location.pathname).match('/products');

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

  // set product image link
  if ($('li.gallery_image').size() === 1) {
    link = link + "&image=" + $('li.gallery_image').find('a').attr('href');
  } else if ($('li.gallery_image.flex-active-slide').size() >= 1) {
    link = link + "&image=" + 
    ($('li.gallery_image.flex-active-slide').find('a').first().data('zoom-image') || 
    $('li.gallery_image.flex-active-slide').find('a').first().attr('href'));
  } else if ($(".etalage_source_image")) {
    link = link + "&image=" + $(".etalage_source_image").first().attr('src');
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
  $( "#add_to_wishlist" ).replaceWith(
    "<a target='_blank' href='" + getURL(base) +
    "' id='listfully' class='btn btn-borders btn-secondary'>" +
    "<i style='margin-right:5px;' class='fa fa-heart'></i>Ønskeliste</a>"
  );

  $( "select" ).change(function() {
    $("#listfully").attr("href", getURL(base));
  });
}
