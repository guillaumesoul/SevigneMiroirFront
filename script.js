$(document).ready(function() {

    // il faut que je check tous les x intervalle si je dois changer de presentation en fonction de la duree de chaque presentation

    var firstlaunch = true;

    var serieDisplayed = getSerieToDisplay();

    /*
    * Interrogation du backend tous les 5 min pour voir si une nouvelle serie doit être affichée
    * */
    var updated = setInterval(function() {

        serieToDisplay = getSerieToDisplay();
        if(serieDisplayed.id != serieToDisplay.id) {
            serieDisplayed = serieToDisplay;
        } else {
            if(firstlaunch) {
                console.log('init display');
                firstlaunch = false;
                displaySerie(serieDisplayed);
            }
        }

    }, 5000);



    // TODO P1: gestion de aucune serie retourné par le backend ou serie ne contient aucune presentations
    //Permet de retrouver la serie active a l'heure de la requete
    function getSerieToDisplay()
    {
        console.log('on y va');
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
                // TODO P1 : gestion des erreurs de récupération
                //alert('Erreur lors de la récupération du diaporama');
            }
        });
        return serieActive;
    }


    /*
    * Permet de generer le code html a inserer dans la page
    * @param affichage : json object representant une presentation avec google id, longueur pres + param lecteur
    * @return : html code of an iframe
    * */
    function generateHtmlIframe(affichage)
    {
        // TODO P2:  get screen size
        var iframeHtmlCode = '';
        var windowWidth = $(document).width();
        var windowHeight = $(document).height();

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
            iframeHtmlCode = '<iframe src="https://docs.google.com/presentation/d/' + affichage.presentation._id_google_slide + '/embed?start=' + slider_autostart + '&loop=' + slider_loop + '&delayms=' + affichage.presentation.slide_duration.toString() + '" frameborder="0" width="' + windowWidth  + '" height="' + windowHeight + '" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
        } else {
        }
        //var iframeHtmlCode = '<iframe src="https://docs.google.com/presentation/d/1oOBuNHorJsZ1AAIWZ4TuqzmzHRWJ38Eh0lAmx5JzNkE/embed?start=true&loop=true&delayms=3000" frameborder="0" width="1280px" height="670px" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
        return iframeHtmlCode;

    }


    /*
    * Permet de mettre a jour l'affichage d'une serie de preserntations si une nouvelle est retourne par le backend
    * @param : la nouvelle serie retourne par le backend
    * */
    function displaySerie(serie)
    {

        var i = 0;
        playNextPresentation();

        function playNextPresentation()
        {
            if (i < serie.affichages.length) {
                var presentation = serie.affichages[i].presentation;

                var dateSerie = new Date(presentation.presentation_duration);
                var dateReference = new Date('1970-01-01T00:00:00+0100');
                var diff = dateSerie - dateReference;

                var intervalTimeOut = diff + 2000;

                var iframeHtmlCode = generateHtmlIframe(serie.affichages[i]);
                $('#iframeDiv').html(iframeHtmlCode);

                i++;
                if( i == serie.affichages.length) {
                    i = 0;
                }
                setTimeout(playNextPresentation, intervalTimeOut);
            }
        }

    }


});