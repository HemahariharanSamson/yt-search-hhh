$(document).ready(function () {
    var API_KEY = "AIzaSyBV-uOA5Nwp4C6OhotzJ3mdZAN_qNJrScE";

    $('#form').submit(function (event) {
        event.preventDefault();
        var search = $("#search").val();
        videoSearch(API_KEY, search, 10);
    });

    function videoSearch(key, search, maxResults) {
        $("#videos").empty();

        $.get(
            "https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search,
            function (data) {
                console.log(data);
                if (data.items.length === 0) {
                    $("#videos").append("<p>No videos found for the given search.</p>");
                    return;
                }

                data.items.forEach(item => {
                    var videoId = item.id.videoId;
                    var videoHTML = `<iframe width="420" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
                    $("#videos").append(videoHTML);
                });
            }
        ).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Error occurred:", errorThrown);
            $("#videos").append("<p>An error occurred while fetching videos. Please try again later.</p>");
        });
    }
});
