

$(document).ready(function(){
    isReady();
    //Check both check boxes
    $(document).on("click", "#nature", function(){
    $("#isNatureChecked").prop("checked", true);
    $("#isBuildingChecked").prop("checked", false);
    });

    $(document).on("click","#buildings",function(){
        $("#isBuildingChecked").prop("checked", true);
        $("#isNatureChecked").prop("checked", false);
    });
});

function isReady(){
    // Why can"t these be in the jQuery format? Something about strict equality
    var isBuildingChecked = document.getElementById("isBuildingChecked");
    var isNatureChecked = document.getElementById("isNatureChecked");
    //Clear images from unchecked category
    $("#loadImages").empty();
    if(isBuildingChecked.checked === true){
        loadImages("buildingPics.json");
    }
    if (isNatureChecked.checked === true){
        loadImages("naturePics.json");
    } 
}
//Load into loadImages div images of specific category (specified in isReady())
function loadImages(file){
        $.getJSON(file, function(data){
        $.each(data.images, function(){
          //Append each cooresponding image to the loadImages container
          $("<img>").addClass("mySlides").appendTo($("#loadImages")).attr("src", this.src).attr("id",this.category).attr("alt",this.caption).click(function(){
                formatModal($(this));
          });
        });
        });
}

//Format modal images
function formatModal(image){
    $("#modalDiv").css("display","block");
    $("#modalImage").attr("src", image.attr("src")).attr("alt", image.attr("alt"));
    $("#modalCaption").html(image.attr("alt"));
}
//Written using WC3 slideshow tutorial
function getDivs(n){
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1
  }    
  if (n < 1) {
    slideIndex = slides.length
  }
  for (var i=0; i<slides.length; i++){
    slides[i].style.display = "none"; 
  }
  if(slides.length>0){
    slides[slideIndex-1].style.display = "block";  
  }
}

var slideIndex = 1;
function addDivs(n){
  getDivs(slideIndex += n);
}
