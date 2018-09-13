var topics = ["Eye Roll", "Bored", "Confused", "Excited", "Sleepy", "Shocked", "Disgust", "Happy", "Sad", "Love", "Rage"]
  
var emotionBtn;

var emotionImage;

function createButtons() {

$("#emotion-btn-div").empty();

for (var i=0; i < topics.length; i++) {
  var emotionBtn = $("<button>");    
  emotionBtn.text(topics[i]);  
  emotionBtn.attr("data-name", topics[i]);    
  emotionBtn.addClass("btn btn-primary p-2 mr-3 mb-2 emotion-btn");    
  $("#emotion-btn-div").append(emotionBtn);
}
}

function displayEmotionImages() {
  
  $("#results-div-col1").empty();
  $("#results-div-col2").empty();
  $("#results-div-col3").empty();
  $("#click-to-play-text").empty();
  var emotion = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=f8X1ecYz8NPxrQoZh26AgLL79ct8HnNy&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })

    .then(function(response) {
      var results = response.data;

      $("#click-to-play-text").append("<h4>" + "Click a gif to play. Click again to pause." + "</h4>");

      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div class='item'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var emotionImage = $("<img>");
          emotionImage.attr("src", results[i].images.fixed_height_still.url);
          emotionImage.attr("data-still", results[i].images.fixed_height_still.url);
          emotionImage.attr("data-animate", results[i].images.fixed_height.url);
          emotionImage.attr("data-state", "still");
          emotionImage.addClass ("img-fluid gif border border-primary");
          gifDiv.prepend(p);
          gifDiv.prepend(emotionImage);
          if (i >= 0 && i < 3) {
            $("#results-div-col1").append(gifDiv);
          }
          else if (i >= 3 && i < 7) {
            $("#results-div-col2").append(gifDiv);
          }
          else {
            $("#results-div-col3").append(gifDiv);
          }
        }
      }

      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } 
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
}

$("#submit-button").on("click", function(event) {

  event.preventDefault();

  var emotionInput = $("#emotion-input").val().toLowerCase();
  
  $("#emotion-input").val("");

  if (topics.indexOf(emotionInput) > -1) {
    alert(emotionInput + " is already available.");
  }
  else if (emotionInput === "" || emotionInput === null) {
    return false;
  }    
  else if (topics.indexOf(emotionInput) === -1) {
  topics.push(emotionInput);
  createButtons();
  }
});

createButtons();

$(document).on("click", ".emotion-btn", displayEmotionImages);
function displayHeaderImage () {
  var queryURL = "https://api.giphy.com/v1/stickers/search?q=&api_key=f8X1ecYz8NPxrQoZh26AgLL79ct8HnNy";
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      console.log(response);
      var results = response.data
      var gifDiv = $("<div class='item'>");
      // var headerImageUrl = results[3].images.fixed_height.url;
      $("#main-header-image").append(gifDiv).addClass("mt-2");
    });

}