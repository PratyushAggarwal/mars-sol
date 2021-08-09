var nasaImages = $("#images");
var solInput = $("#sol");
var page=1;
var prev = $("#Previous");
var next = $("#next");
var lastpage=100000;

(function () {
    prev.attr("disabled", "true");
    next.attr("disabled", "true");
})();

function updateButtons(photos) {
    console.log(photos.length);
    if (page === 1) {
        prev.attr("disabled", "true");
        next.removeAttr("disabled");
    } else if (photos.length === 0) {
        next.attr("disabled", "true");
        prev.removeAttr("disabled");
        --page;
    } else {
        prev.removeAttr("disabled");
        next.removeAttr("disabled");        
    }
}

$("#take button").click(function (e) {
    e.preventDefault();
    show(page);

});

$("#Previous").click(function(e){
    e.preventDefault();

    show(--page);
});

$("#next").click(function(e){
    e.preventDefault();

    show(++page);
});


function show(page){
    let sol = solInput.val();
    if( sol === "" || page === "") {
        alert("Please fill the field");
        return;
    }

    let url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + sol + "&page=" + page + "&api_key=NBlCLhD21Eud5RxMy1TjZoeJedDa1c1qbsnLMIG2";
    
    $.get(url, function (data) {
        let photos = data.photos;
        updateButtons(photos);
        console.log(photos);
        $("#images img").remove();

        for (let photo of photos) {
            console.log(photo);;
            console.log("hell", photo.img_src, photo.id);
            nasaImages.append('<img src="' + photo.img_src + '" alt="' + photo.id + '">');
        }
    });
}