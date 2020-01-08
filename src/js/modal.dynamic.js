// load all scripts needed
[
    'https://theautohost.com/projects/chatus/dist/css/iziModal.min.css',
].forEach(function (href) {
    var link = document.createElement('link');
    link.href = href;
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);
});

$.when(

    $.getScript("https://theautohost.com/projects/chatus/dist/js/iziModal.min.js", function () {
        console.log("Chumney & Associates: iziModal Library.");
    }),
    $.getScript("https://theautohost.com/_assets/coding/scripts/cookies/js.cookie.js", function () {
        console.log("Chumney & Associates: Cookie Library.");
    }),
    $.getScript("http://192.168.12.3:8888/internal-projects/api/dist/js/jquery.exitintent.min.js", function () {
        console.log("Chumney & Associates: Exit Intent Library.");
    }),
    $.getScript("https://theautohost.com/_assets/coding/scripts/ajax/axios.js", function () {
        console.log("Chumney & Associates: Ajax Library.");
    }),

).then(function () {
    //createModal();


    var today = new Date();
    var fullDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(fullDate);


    var clientID = $('#cardinal-api').data('client');

    // launch Modals
    //createDivs();
    readAPI(clientID);

});



// functions

function generateExpirationDates() {}



// create div for modal
function createDivs() {

    var modalDiv = $('<div>').attr('id', 'ca-offer').attr('class', 'iziModal');
    $('body').append(modalDiv);

}



function readAPI(clientID) {
    axios.get('http://cardinal.chumdev.com/api/modals/' + clientID)
    .then(response => {
        this.modal = response.data.modal;

        var clientCode = modal[0].client;
        var modalID = modal[0].id;
        
        // Name, Title, Subtitle
        var modalName = modal[0].name;
        var modalTitle = modal[0].title;
        var modalSubTitle = modal[0].subTitle;

        var modalColor = modal[0].color;
        var modalWidth = modal[0].width;
        var modalIntent = modal[0].intent;

        // Overlays
        var modalcloseOnOverlay = modal[0].closeOnOverlay;
        
        // Cookies
        var modalCookieAmount = modal[0].cookieAmount;
        var parseCookieAmount = parseInt(modalCookieAmount);

        var modalURL = modal[0].url;
        
        console.log('Chumney & Associates: The following have been pulled from the api...');
        console.log('Chumney & Associates: Client Code:' + ' ' + clientCode);
        console.log('Chumney & Associates: Modal ID:' + ' ' + modalID);
        console.log('Chumney & Associates: Modal Name:' + ' ' + modalName);
        console.log('Chumney & Associates: Modal Title:' + ' ' + modalTitle);
        console.log('Chumney & Associates: Modal Subtitle:' + ' ' + modalSubTitle);
        console.log('Chumney & Associates: Modal Width:' + ' ' + modalWidth);
        console.log('Chumney & Associates: Modal Intent:' + ' ' + modalIntent);
        console.log('Chumney & Associates: Modal Cookie Amount:' + ' ' + modalCookieAmount);
        console.log('Chumney & Associates: Modal URL:' + ' ' + modalURL);
    
        
        var dynamicDiv = 'ca-'+ modalName;
        var dynamicDivID = '#' + dynamicDiv;
        console.log(dynamicDiv);
        //console.log(dynamicDivID);

        var modalDiv = $('<div>').attr('id', dynamicDiv).attr('class', 'iziModal');
        $('body').append(modalDiv);
    
  
        if(modalIntent == 'exit') {
            $.exitIntent('enable');
            $(document).bind('exitintent', function () {
            console.log('Chumney & Associates: Exit intent detected.')
            
                if (!Cookies.get(dynamicDiv)) {
                    createModal(dynamicDivID, modalTitle, modalSubTitle, modalWidth, modalURL);
                    Cookies.set(dynamicDiv, makeString(10), { expires: parseCookieAmount});

                } else if (modalCookieAmount == 0) {
                    Cookies.remove(dynamicDiv)
                    createModal(dynamicDivID, modalTitle, modalSubTitle, modalWidth, modalURL);
                }
            });
        } else {
            if (!Cookies.get(dynamicDiv)) {
                    createModal(dynamicDivID, modalTitle, modalSubTitle, modalColor, modalWidth, modalURL);
                Cookies.set(dynamicDiv, makeString(10), {
                    expires: parseCookieAmount
            });

            } else if (modalCookieAmount == 0) {
                Cookies.remove(dynamicDiv)
                    createModal(dynamicDivID, modalTitle, modalSubTitle, modalColor, modalWidth, modalURL);
            }
        }

    
    })
    // end ajax response call

    .catch(function(error) {
        console.log(error);
    })
    .finally(function() {

    })



}


// initialize modal
function createModal(dynamicDivID, modalTitle, modalSubTitle, modalColor, modalWidth, modalURL) {
    $(dynamicDivID).iziModal({
        headerColor: modalColor,
        closeButton: true,
        title: modalTitle,
        subtitle: 'modalSubTitle',
        iframe: false,
        autoOpen: 1,
        width: modalWidth,
        zindex: 99999,
        onOpening: function (modal) {
            modal.startLoading();
            $.get(modalURL, function (data) {
                $(dynamicDivID + ' .iziModal-content').html(data);
                modal.stopLoading();
                console.log('Currently opening' + ' ' + dynamicDivID);
            })
        }
    });
}

/*
function createModal(dynamicDivID, modalTitle, modalSubTitle, modalColor, modalWidth, modalCloseOnOverlay, modalURL) {

title: '',
subtitle: '',
headerColor: '#e82c2a',
closeButton: true,
overlay: true,
overlayClose: true,
overlayColor: 'rgba(0,0,0,0.0)',
closeOnEscape: false,
zindex: 99999,
autoOpen: 1,
iframeURL: false,
width: 600,
transitionIn: "flipInX",
*/

// random string generator
function makeString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}