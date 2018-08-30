// topics arry to show up as button in button area
var topics = ['League of Legends', 'Overwatch', 'WoW', 'Counterstrike', 'Zelda']
for (var i = 0; i < topics.length; i++) {
    var btn = ("  " + '<button class="btn btn-info searchBTN"  data-type="' + topics[i] + '">' + topics[i] + '</button>')
    $('#btnArea').append(btn)
}
// value from id="searchArea" and pushing it into topics array
$("#submitBtn").on("click", function (e) {
    e.preventDefault()
    $("#btnArea").empty()
    var searchVal = $('#searchArea').val().trim()
    topics.push(searchVal)
    for (var i = 0; i < topics.length; i++) {
        var btn = ("  " + '<button class="btn btn-info searchBTN"  data-type="' + topics[i] + '">' + topics[i] + '</button>')
        $('#btnArea').append(btn)
    }
})
$(document).on('click', '.searchBTN', function () {
    $('#gifArea').empty()
    console.log($(this).attr('data-type'))
    var type = $(this).attr('data-type')
    //  ajax giphy api
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=ETq5UVEbTIFBujBhI2JtYYgPUfE9w9w7&limit=10';
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .done(function (resp) {
            console.log(resp)
            for (var i = 0; i < resp.data.length; i++) {
                var rating = resp.data[i].rating
                console.log(rating)
                var p = $('<p>').text('rating: ' + rating)
                var gif = ('<img class="gif" src="' + resp.data[i].images.fixed_height_still.url +
                    '" data-still="' + resp.data[i].images.fixed_height_still.url +
                    '" data-animate="' + resp.data[i].images.fixed_height.url + '" data-state="still"</img>')

                $('#gifArea').append(p, gif)
            }
            $('.gif').on('click', function () {
                var state = $(this).attr('data-state')
                console.log(state)
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            })
        })
})