//App Variables
var buttonArray = ['Funny', 'Dancing', 'Running'];
var buttonsHTML = '';
var giphyKey = 'dc6zaTOxFJmzC';

//function to generate the giphy buttons
function createButtons() {
     //Empty button container
    $('#button-container').empty();
    for (var i = 0; i < buttonArray.length; i++) {
        //create a button with an item from the array
        var currentButton = "<button class='btn btn-danger giphy-buttons' data-topics=" + buttonArray[i] + ">" + buttonArray[i] + "</button>";
        $('#button-container').append(currentButton);
    }
}

$(document).ready(function() {
     //Generate the buttons on page load
    createButtons();
    //add a button when the user presses submit
    $('body').on('click', '#add-button', function(event) {
        event.preventDefault();
        //get the value from the search input
        var newCategoryValue = $('#search-input').val();
        //add new value to button array
        buttonArray.push(newCategoryValue);
        createButtons();
    });

    $('body').on('click', '.giphy-buttons', function(event) {
        //empty giph container
        $('.giphy-items').empty();
        var searchCategory = $(this).attr('data-topics');
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchCategory + "&limit=10" + "&api_key="+giphyKey;
        console.log(queryURL);
        $.ajax({ url: queryURL, method: 'GET' })
            .done(function(response) {
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    console.log(response.data[i]);
                    $('.giphy-items').append("<div class='outer-container col-sm-4'><p class='title'>Rating: " + response.data[i].rating.toUpperCase() + "</p><div class='image-container'><img class='images-returned img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
                }
            });

    }); // Ends giphy-buttons onclick event

    $('body').on('click', '.images-returned', function(event) {
        var state = $(this).attr('data-state');
        var thisImgDataStill = $(this).attr('data-still');
        var thisImgDataAnimate = $(this).attr('data-animate');
        if (state === 'still') {
            $(this).attr('src', thisImgDataAnimate);
            $(this).attr('data-state', 'animate');
        }
        if (state !== "still") {
            $(this).attr('src', thisImgDataStill);
            $(this).attr('data-state', 'still');
        }
    }); // Close image on click event

}); // Close jQuery .ready function
