$(document).ready(function() {

    // TODO faire un setInterval pour aller mettre a jour l'affichage tous les X
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
    console.log(serieToDisplay.affichages[1].presentation.presentation_duration);
    var dateSerie = new Date(serieToDisplay.affichages[1].presentation.presentation_duration);
    console.log(dateSerie);
    var dateReference = new Date('1970-01-01T00:00:00+0100');
    console.log(dateReference);

    var diff = dateSerie - dateReference;

    var diffSeconds = diff/1000;
    var HH = Math.floor(diffSeconds/3600);
    var MM = Math.floor(diffSeconds%3600)/60;

    console.log(diffSeconds);
    console.log(MM);
    console.log(HH);

    //je veux afficher des presentations
    // il faut que je check tous les x intervalle si je dois changer de presentation en fonction de la duree de chaque presentation





});