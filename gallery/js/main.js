//Checks if the document is ready
$(document).ready(function(){
    console.log("document ready!")
    checkButtons();
});
//Load images of specific tag
function checkButtons(){
    console.log(cityCheckbox);
    console.log(natureCheckbox);
    //Clear images before checking
    $("#galleryImg").empty();
    $("#compiledImg").empty();
    if(document.getElementById("cityCheckbox").checked === true){
        console.log("loading city images");
        loadImgFiles("buildingPics.json");
    }
    if (document.getElementById("natureCheckbox").checked === true){
        console.log("loading nature images");
        loadImgFiles("naturePics.json");
    } 
}
//Load into loadImgFiles div images of specific category (specified in checkButtons())
function loadImgFiles(file){
        $.getJSON(file, function(data){
          $.each(data.images, function(){
            //Load images into gallery div
            $("<img>").attr("src", this.src).attr("id",this.tag).attr("alt",this.caption).addClass("slideshow").appendTo($("#galleryImg")).click(function(){
              //Format cooresponding modal img
              $("#modalCaption").html($(this).attr("alt"));
              $("#modalDiv").css("display","block");
              $("#modalImage").attr("src", $(this).attr("src")).attr("alt", $(this).attr("alt"));
              console.log(this.src);
            });
            //Load images into compiled div
            $("<img>").attr("src", this.src).attr("id",this.tag).attr("alt",this.caption).appendTo($("#compiledImg")).click(function(){
              //Format cooresponding modal img
              $("#modalCaption").html($(this).attr("alt"));
              $("#modalDiv").css("display","block");
              $("#modalImage").attr("src", $(this).attr("src")).attr("alt", $(this).attr("alt"));
              console.log(this.src);
            });
          });
        });
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