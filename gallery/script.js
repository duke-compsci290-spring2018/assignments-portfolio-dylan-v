//Checks if the document is ready
$(document).ready(function(){
    console.log("document ready!")
    isReady();
    //Check if nature box is checked
    $(document).on("click", "#nature", function(){
      $("#natureCheckbox").prop("checked", true);
      $("#cityCheckbox").prop("checked", false);
    });
    //Check if city box is checked
    $(document).on("click","#buildings",function(){
      $("#natureCheckbox").prop("checked", false);
      $("#cityCheckbox").prop("checked", true);
    });
});
//Load images of specific tag
function isReady(){
    // Why can"t these be in the jQuery format? Something about strict equality
    var cityCheckbox = document.getElementById("cityCheckbox");
    var natureCheckbox = document.getElementById("natureCheckbox");
    console.log(cityCheckbox);
    console.log(natureCheckbox);
    //Clear images from unchecked category
    $("#loadImages").empty();
    if(cityCheckbox.checked === true){
        console.log("loading city images");
        loadImages("buildingPics.json");
    }
    if (natureCheckbox.checked === true){
        console.log("loading nature images");
        loadImages("naturePics.json");
    } 
}
//Load into loadImages div images of specific category (specified in isReady())
function loadImages(file){
        $.getJSON(file, function(data){
          $.each(data.images, function(){
            //Append each cooresponding image to the loadImages container
            $("<img>").addClass("slideshow").appendTo($("#loadImages")).attr("src", this.src).attr("id",this.tag).attr("alt",this.caption).click(function(){
              formatModal($(this));
              console.log(this.src);
            });
          });
        });
}
//Apply attributes and css to modal images (when a picture is clicked and enters lightbox mode)
function formatModal(image){
    $("#modalCaption").html(image.attr("alt"));
    $("#modalDiv").css("display","block");
    $("#modalImage").attr("src", image.attr("src")).attr("alt", image.attr("alt"));
}
//getDivs and addDivs written with help of WC3 slideshow tutorial
function getDivs(n){
  var slides = document.getElementsByClassName("slideshow");
  console.log("slide number: " + n);
  if (n > slides.length){slideIndex = 1}    
  if (n < 1){slideIndex = slides.length}
  for (var i=0; i<slides.length; i++){
    slides[i].style.display = "none"; 
  }
  if(slides.length>0){slides[slideIndex-1].style.display = "block";}
}
var slideIndex = 1;
function addDivs(n){
  getDivs(slideIndex += n);
}