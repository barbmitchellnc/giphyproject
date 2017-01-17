$(document).ready(function() {

    // Create an initial array count and create buttons
    var array = [
        "werewolf", "vampire", "zombie", "ghost"
    ];

    function setButtons() {
        for (i = 0; i < array.length; i++) {
            var btn = $("<button>");
            btn.html(array[i]);
            btn.attr("data-monster", array[i]);
            btn.attr("class", "btn");
            $("#monsterButtons").append(btn);
        }
    }
    //  On Click event associated adding to the array
    $("body").on("click", ".submit", function(event) {
        event.preventDefault();
        //add new monster to the array
        array.push($("#monster-input").val());
        var btn = $("<button>");
        $("#monsterButtons").append(btn);
        btn.attr("data-monster", $("#monster-input").val())
        btn.html($("#monster-input").val());
        btn.attr("class", "btn");
        $("#monster").empty();
        $("#monster-input").val("");
    });
    $("body").on("click", ".btn", function() {
        // this=button clicked

        $("#monster").empty();

        var monster = $(this).attr("data-monster");

        // Construct URL to get gifs 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            monster + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Perform AJAX GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            //  data comes back from the API
            .done(function(response) {
                // Storing an array of results in the results variable
                var results = response.data;
                console.log(response);
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='item'>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);
                         // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#monster").prepend(gifDiv);

                        // Creating an image tag
                        var monsterImage = $("<img>");
// Attaching the attributes to the monsterImage of  animated and still
                        monsterImage.attr("class", "gif");
                        monsterImage.attr("state", "still");
                        monsterImage.attr("animated", results[i].images.original.url);
                        monsterImage.attr("src", results[i].images.original_still.url);
                        monsterImage.attr("still", results[i].images.original_still.url); // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(monsterImage);

                       
                    }
                }
            });

    });
    //Click function to stop and start animate when gif is clicked on

    $("body").on("click", ".gif", function() {
        if ($(this).attr("state") == "still") {
            $(this).attr("src", $(this).attr("animated"));
            $(this).attr("state", "animated");
        } else {
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("state", "still");
        }
    });
    setButtons();
});
