$(document).ready(function() {

    // TODO faire un setInterval pour aller mettre a jour l'affichage tous les X

    // il faut que je check tous les x intervalle si je dois changer de presentation en fonction de la duree de chaque presentation

    var original = {
        'date': new Date()
    };

    var updated = setInterval(function() {
        serieToDisplay;
        console.log(serieToDisplay);
        var html = generateHtmlIframe(serieToDisplay.affichages[0]);
        $('#iframeDiv').html(html);
    }, 10000);








    // TODO get screen size and send them in post

    //Permet de retrouver la serie active a l'heure de la requete
    var serieToDisplay = function ()
    {
        var serieActive = {};
        $.ajax({
            url: 'http://sevignemiroir.local/display/active',
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(response) {
                serieActive = response;
            },
            error: function (response) {
                alert('Erreur lors de la récupération du diaporama');
            }
        });
        return serieActive;
    }();
    //console.log(serieToDisplay);
    var dateSerie = new Date(serieToDisplay.affichages[1].presentation.presentation_duration);
    var dateReference = new Date('1970-01-01T00:00:00+0100');

    var diff = dateSerie - dateReference;

    var diffSeconds = diff/1000;
    var HH = Math.floor(diffSeconds/3600);
    var MM = Math.floor(diffSeconds%3600)/60;

    //console.log(diffSeconds);
    /*console.log(MM);
    console.log(HH);*/

    //je veux afficher des presentations
    var now = new Date();
    var html = generateHtmlIframe(serieToDisplay.affichages[0]);
    //$('#iframeDiv').html(html);



    function generateHtmlIframe(affichage)
    {
        var iframeHtmlCode = '';

        if(
            affichage.presentation._id_google_slide != undefined && affichage.presentation._id_google_slide != ''
            && affichage.presentation.presentation_duration != undefined && affichage.presentation.presentation_duration != ''
            && affichage.presentation.slider_autostart != undefined && affichage.presentation.slider_autostart != ''
            && affichage.presentation.slider_loop != undefined && affichage.presentation.slider_loop != ''
            && affichage.presentation.slide_duration != undefined && affichage.presentation.slide_duration != ''
        ) {
            var slider_autostart = 'true';
            var slider_loop = 'true';
            (affichage.presentation.slider_autostart == true) ?  slider_autostart = 'true' :  slider_autostart = 'false';
            (affichage.presentation.slider_loop == true) ?  slider_loop = 'true' :  slider_loop = 'false';
            iframeHtmlCode = '<iframe src="https://docs.google.com/presentation/d/' + affichage.presentation._id_google_slide + '/embed?start=' + slider_autostart + '&loop=' + slider_loop + '&delayms=' + affichage.presentation.slide_duration.toString() + '" frameborder="0" width="1280px" height="670px" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
        } else {
            console.log('il manque des infos');
        }
        //var iframeHtmlCode = '<iframe src="https://docs.google.com/presentation/d/1oOBuNHorJsZ1AAIWZ4TuqzmzHRWJ38Eh0lAmx5JzNkE/embed?start=true&loop=true&delayms=3000" frameborder="0" width="1280px" height="670px" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
        return iframeHtmlCode;

    }





});