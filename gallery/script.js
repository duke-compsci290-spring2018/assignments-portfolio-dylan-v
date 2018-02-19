//var jsonFile;
//var images = [];
//var categories = [];

$(document).ready(function () {
    checkFunc();
    $(document).on('click', '#nature', function () { 
    console.log("REMOVING FOOD PICS, JUST BUILDINGS");
    var checkBoxNature = document.getElementById("myCheckNature");
    $("#fun").empty();
    $('#myCheckNature').prop('checked', true);
    $('#myCheckFood').prop('checked', false);

    if (checkBoxNature.checked === true) {
        loadImages('pics.json');
    }
});

$(document).on('click', '#buildings', function() { 
    console.log("REMOVING NATURE PICS, JUST FOOD");
    var checkBoxFood = document.getElementById("myCheckFood");
    $("#fun").empty();
    $('#myCheckFood').prop('checked', true);
    $('#myCheckNature').prop('checked', false);

    if(checkBoxFood.checked === true){
        loadImages('food.json');
    }
});
              });

function modal(image){
    console.log("AT MODAL");
    console.log(image);
    $('#myModal').css("display","block");
    $("#modal-image").attr('src', image.attr('src')).attr('alt', image.attr('alt'));
    $("#caption").html(image.attr('alt'));
    console.log("DONE WITH MODAL");
}
console.log($('.close'));
$('.close').click(function(){
    console.log("CLICKED TO CLOSE");
    $('#myModal').css("this.style.display","none");
});
function showDivs(n) {
console.log("showDivs");
  var i;
  var x = document.getElementsByClassName("mySlides");
    console.log(x);
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
      console.log(x[i]);
      console.log("hi");
     x[i].style.display = "none"; 
  }
    if(x.length>0){
        x[slideIndex-1].style.display = "block";  
    }
    console.log(x);
    console.log(x[slideIndex-1]);
}
    
function checkFunc(){
    var checkBoxFood = document.getElementById("myCheckFood");
    var checkBoxNature = document.getElementById("myCheckNature");
    $("#fun").empty();
    if(checkBoxFood.checked === true){
        loadImages('food.json');
    }
    if (checkBoxNature.checked === true){
        loadImages('pics.json');
    } 
}

function loadImages(jsonFile){
         $.getJSON(jsonFile, function(data) {
             var divTag = $('#fun');
             var category = 'mySlides';
             //var id;

        $.each(data.images, function() {
            //console.log();
            //console.log(e.url);
            console.log(this.url);
            console.log("LOADING IN IMAGES");
            $('<img>').addClass(category).appendTo(divTag).attr('src', this.url).attr('alt',this.caption).attr('style','width:100%').attr('id',this.category).click(function(){
                modal($(this));
            });
        });
     });
}


var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    console.log("plusDivs");
  showDivs(slideIndex += n);
}
