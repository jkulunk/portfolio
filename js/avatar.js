$(function () {

    var cards = [];
    var initials;
    var colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#f1c40f", "#e67e22", "#e74c3c", "#f39c12", "#d35400"];
    var contacts = [
        { "firstName": "Amy", "lastName": "Border", "email": "amy@border.com" },
        { "firstName": "Andrew", "lastName": "Background", "email": "andrew@background.com" },
        { "firstName": "Charly", "lastName": "Decimal", "email": "charly@decimal.com" },
        { "firstName": "Emily", "lastName": "False", "email": "emily@false.com" },
        { "firstName": "Gina", "lastName": "Height", "email": "gina@height.com" },
        { "firstName": "Isabel", "lastName": "Justify", "email": "isabel@justify.com" },
        { "firstName": "Kelly", "lastName": "Length", "email": "kelly@length.com" },
        { "firstName": "Mina", "lastName": "Number", "email": "mina@number.com" },
        { "firstName": "Owen", "lastName": "Padding", "email": "owen@padding.com" },
        { "firstName": "Quinn", "lastName": "Radius", "email": "quinn@radius.com" },
        { "firstName": "Stefan", "lastName": "Ternary", "email": "stefan@ternary.com" },
        { "firstName": "Ulysses", "lastName": "View", "email": "ulysses@view.com" }];

        var setColor = (initials) => colors[
            Math.floor((initials.charCodeAt(0) + initials.charCodeAt(initials.length - 1)) % (colors.length))
        ]

    $.each(contacts, function (i) {

        initials = contacts[i].firstName.charAt(0) + contacts[i].lastName.charAt(0);

        cards.push(`<div class="card col-xs-12 col-md-4">
            <div class="panel panel-default">
                <div class="panel-body avatar-body">
                    <div class="avatar avatar-md" style="background-color:` + setColor(initials) + `">
                        <span class="initials monospace">` + initials + `</span></div>
                    <div class="avatar-details">
                        <div>`+ contacts[i].firstName + ' ' + contacts[i].lastName + `</div>
                        <div>` + contacts[i].email + `</div></div></div></div></div>`);
    });

    $("<div/>", {
        "class": "items",
        html: cards.join("")
    }).appendTo(".contacts-container");


});
