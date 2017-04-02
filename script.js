$(document).ready(function() {

    // il faut que je check tous les x intervalle si je dois changer de presentation en fonction de la duree de chaque presentation

    var firstlaunch = true;

    var serieDisplayed = getSerieToDisplay();
    //console.log(serieToDisplay);

    var updated = setInterval(function() {

        //je ne met a jour le html que si quelque chose a changer
        serieToDisplay = getSerieToDisplay();
        if(serieDisplayed.id != serieToDisplay.id) {
            //console.log('on doit changer de serie');
            serieDisplayed = serieToDisplay;
        } else {
            //console.log('meme serie');
            if(firstlaunch) {
                console.log('init display');
                firstlaunch = false;
                displaySerie(serieDisplayed);
            }
        }

        //je regarde le nombre d'affichages et leur dure

        //var nbPresentations = serieToDisplay.affichages.length;
        //console.log(nbPresentations);

        //pour chaque presentation je fais un set interval sur la duree de la presentation


        //console.log(serieToDisplay);
        /*serieToDisplay.affichages.forEach(function(affichage) {
            console.log(affichage);
        });*/
        /*var pres = setInterval(function() {

        }, 3000);*/



        //GENERATE DU CODE HTML
        //var html = generateHtmlIframe(serieToDisplay.affichages[0]);
        //$('#iframeDiv').html(html);
    }, 5000);








    // TODO get screen size and send them in post

    //Permet de retrouver la serie active a l'heure de la requete
    //var serieToDisplay = function ()
    function getSerieToDisplay()
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
    }

    //je veux afficher des presentations
    /*var html = generateHtmlIframe(serieToDisplay.affichages[0]);
    $('#iframeDiv').html(html);*/



    /*
    * Permet de generer le code html a inserer dans la page
    * @param affichage : json object representant une presentation avec google id, longueur pres + param lecteur
    * @return : html code of an iframe
    * */
    function generateHtmlIframe(affichage)
    {
        console.log(affichage);
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


    /*
    * Permet de mettre a jour l'affichage d'une serie de preserntations si une nouvelle est retourne par le backend
    * @param : la nouvelle serie retourne par le backend
    * */
    function displaySerie(serie)
    {
        //j'ai une nnouvelle serie je veux l'afficher
        //je vais regarder chacun de ses affichages

        console.log(serie);

        var i = 0;
        playNextPresentation();

        function playNextPresentation()
        {
            var now = new Date();
            console.log(now);
            if (i < serie.affichages.length) {
                var presentation = serie.affichages[i].presentation;

                var dateSerie = new Date(presentation.presentation_duration);
                var dateReference = new Date('1970-01-01T00:00:00+0100');
                var diff = dateSerie - dateReference;

                var intervalTimeOut = diff + 2;

                var iframeHtmlCode = generateHtmlIframe(serie.affichages[i]);
                $('#iframeDiv').html(iframeHtmlCode);

                i++;
                if( i == serie.affichages.length) {
                    i = 0;
                }
                setTimeout(playNextPresentation, intervalTimeOut);
            }
        }



        /*var affichage = serie.affichages[0];
        console.log(affichage.id);
        var dateSerie = new Date(affichage.presentation.presentation_duration);
        var dateReference = new Date('1970-01-01T00:00:00+0100');
        var diff = dateSerie - dateReference;

        var diffSeconds = diff/1000;
        console.log(diff);

        var timerID = setInterval(function() { // On crée notre compte à rebours
            displayAffichage(affichage);
            console.log("presentation termines");

        }, diff);*/



        /*for(var i=0 ; i<serie.affichages.length ; i++) {

            console.log('display new affichage');
            displayAffichage(serie.affichages[i]);

            var affichage = serie.affichages[i];
            console.log(affichage.id);
            var dateSerie = new Date(affichage.presentation.presentation_duration);
            var dateReference = new Date('1970-01-01T00:00:00+0100');
            var diff = dateSerie - dateReference;

            var diffSeconds = diff/1000;
            console.log(diff);

            var timerID = setTimeout(function() { // On crée notre compte à rebours
                console.log("presentation termines");

            }, diff);
        }*/

    }

    function displayAffichage(affichage)
    {
        console.log('display affichage');
        var dateSerie = new Date(affichage.presentation.presentation_duration);
        var dateReference = new Date('1970-01-01T00:00:00+0100');
        var diff = dateSerie - dateReference;

        var diffSeconds = diff/1000;
        console.log(diff);

        var timerID = setTimeout(function() { // On crée notre compte à rebours
            console.log("presentation termines");

        }, diff);
    }




});