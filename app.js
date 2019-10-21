$(document).ready(function () {

  var movies = [];


  function displayHorrorMovie() {

    var x = $(this).data("search");
    console.log(x);

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=?" + movies + "&api_key=Y7OjPDXkcsZ4MubpBOQlcBgGlCuFyQXc&limit=10";

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    
    }).done(function (response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {

        var showDiv = $("<div class='col-md-4'>");

        var rating = results[i].rating;
        var defaultAnimatedSrc = results[i].images.fixed_height.url;
        var staticSrc = results[i].images.fixed_height_still.url;
        var showImage = $("<img>");
        var p = $("<p>").text("Rating: " + rating);

        showImage.attr("src", staticSrc);
        showImage.addClass("horrorMovieGiphy");
        showImage.attr("data-state", "still");
        showImage.attr("data-still", staticSrc);
        showImage.attr("data-animate", defaultAnimatedSrc);
        showDiv.append(p);
        showDiv.append(showImage);
        $("#gifArea").prepend(showDiv);

      }
    });
  }

  $("#addMovie").on("click", function (event) {
    event.preventDefault();
    var newMovies = $("#horrorMovieInput").val().trim();
    movies.push(newMovies);
    console.log(movies);
    $("#horrorMovieInput").val('');
    displayButtons();
  });

  function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < movies.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "movie");
      a.attr("data-search", movies[i]);
      a.text(movies[i]);
      $("#myButtons").append(a);
    }
  }


  displayButtons();

  $(document).on("click", "#movie", displayHorrorMovie);

  $(document).on("click", ".horrorMovieGiphy", pausePlayGifs);

  function pausePlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

});