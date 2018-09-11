// Listing data replaced with fun data
var featured_listing_json = {
    "listings": [
        {
            "propCity": "San Francisco",
            "propState": "CA",
            "propDetail": "The Embarcadero",
            "propPhotoPath": "../images/embarcadero.jpg",
            "propFriendlyURL": "#"
        },
        {
            "propCity": "El Sobrante",
            "propState": "CA",
            "propDetail": "New Year's Eve",
            "propPhotoPath": "../images/new-years-eve.jpg",
            "propFriendlyURL": "#"
        },
        {
            "propCity": "Colorado Springs",
            "propState": "CO",
            "propDetail": "Summer Storm Coming",
            "propPhotoPath": "../images/colorado.jpg",
            "propFriendlyURL": "#"
        },
        {
            "propCity": "Jenner",
            "propState": "CA",
            "propDetail": "Goat Rock Beach",
            "propPhotoPath": "../images/goat-rock-beach.jpg",
            "propFriendlyURL": "#"
        },
        {
            "propCity": "Mt Diablo",
            "propState": "CA",
            "propDetail": "Summer hike",
            "propPhotoPath": "../images/mt-diablo1.jpg",
            "propFriendlyURL": "#"
        },

        {
            "propCity": "Pt Reyes",
            "propState": "CA",
            "propDetail": "My happy place",
            "propPhotoPath": "../images/pt-reyes.jpg",
            "propFriendlyURL": "#"
        },
        {
            "propCity": "San Francisco",
            "propState": "CA",
            "propDetail": "Ferry ride",
            "propPhotoPath": "../images/ferry-ride.jpg",
            "propFriendlyURL": "#"
        },
        {
            "propCity": "Pt Reyes",
            "propState": "CA",
            "propDetail": "Walking the trails",
            "propPhotoPath": "../images/pt-reyes2.jpg",
            "propFriendlyURL": "#"
        },
        {
            "propCity": "Mt Diablo",
            "propState": "CA",
            "propDetail": "Along the path",
            "propPhotoPath": "../images/mt-diablo2.jpg",
            "propFriendlyURL": "#"
        },
        {
            "propCity": "Pt Reyes",
            "propState": "CA",
            "propDetail": "Nearing the lighthouse",
            "propPhotoPath": "../images/pt-reyes3.jpg",
            "propFriendlyURL": "#"
        },
        {
            "propCity": "Jenner",
            "propState": "CA",
            "propDetail": "Searching for driftwood",
            "propPhotoPath": "../images/goat-rock-beach2.jpg",
            "propFriendlyURL": "#"
        },
        {
            "propCity": "Mill Valley",
            "propState": "CA",
            "propDetail": "Muir Woods",
            "propPhotoPath": "../images/muir-woods.jpg",
            "propFriendlyURL": "#"
        },
                  
    ]
}

function featured_slideshow_json() {

    if (typeof (featured_listing_json) != 'undefined' && featured_listing_json) {
        var items = [];

        $.each(featured_listing_json.listings, function (item, val) {
            items.push("<div class=\"col-xs-12 col-sm-6 col-md-4 no-padding item item" + item + "\">"
                + "<div class='prop_link' data-resource=\"" + val.propPhotoPath + "\">"
        + "<img src=\"" + val.propPhotoPath + "\"/>"
        + "<div class='prop_detail'> " + val.propDetail + "</div>"
        + "<div class='prop_card'>"
        + "<span class='prop_city'> " + val.propCity + ", " + val.propState + " </span>"
        
        + "</div></div></div>");
        });

        $("<div/>", {
            "class": "items",
            html: items.join("")
        }).appendTo(".featured_gallery");
    }
    return null;
}

function clipPhoto() {
    $(".item").each(function (i) {
        $(this).height($(this).width() * 0.66);
    })
}

$(function(){
    featured_slideshow_json();
    clipPhoto();

    $(window).resize(function(){
        clipPhoto();
    });

    $(".item").on("click", function () {
        var img = "<img src=" + $(".prop_link",this).attr("data-resource") +" />";

        $("#modal-photo").modal();
        $("#modal-photo .modal-body").html(img);
    });

});