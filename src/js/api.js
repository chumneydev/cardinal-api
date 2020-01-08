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
        console.log("Chumney & Associates  Vehicle.");
    }),
    $.getScript("https://theautohost.com/_assets/coding/scripts/cookies/js.cookie.js", function () {
        console.log("Chumney & Associates Chat: Cookie.");
    }),
    $.getScript("https://theautohost.com/_assets/coding/scripts/ajax/axios.js", function () {
        console.log("Chumney & Associates Chat: Cookie.");
    }),

).then(function () {
    console.log('Cardinal: Initializing...');
    console.log('Cardinal: Initializing Done');


    //get date
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date);
 
    var clientID = $('#cardinal-api').data('client')
    console.log(clientID);

    getCurrentModal(clientID);

});






function getCurrentModal(clientID) {
    axios.get('http://192.168.12.3:8888/internal-projects/cardinal-specials/api/modals/' + clientID)
    //axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => {
        this.modal = response.data.modal;
        var clientCode= modal[0].client;
        var modalId = modal[0].id;
        var modalName = modal[0].name;
        var modalURL = modal[0].url;
        var modalId = modal[0].id;
        var modalId = modal[0].id;

        //console.log(clientCode);
        //console.log(modalId);
        //console.log(modalName);
        //console.log(modalURL);

        var dynamicDivID = 'ca-' + modalName;
        console.log(dynamicDivID);

        var createModal = $('<div>').attr('id', dynamicDivID).attr('class', 'iziModal')
        $('body').append(createModal);

        var closeButton = '<button data-izimodal-close="" class="ca-close">X</button>';
        $(createModal).append(closeButton);


        $('#' + dynamicDivID).iziModal({
            //title: 'See if Your Eligibile to save more on the ' + vehicleTitle,
            //subtitle: 'Fill out the form below to see if you qualify',
            headerColor: '#0d78aa',
            closeButton: true,
            iframe: true,
            autoOpen: 1,
            width: 660,
            iframeHeight: 400,
            zindex: 99999,
            iframeURL: modalURL,

        });




    })


    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .finally(function() {
        // always executed
    })


}