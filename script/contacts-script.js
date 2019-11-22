/*jshint esversion: 8*/ 

$(document).ready(function() {
    ymaps.ready(init);
    function init(){    
        var myMap = new ymaps.Map("map", {
            center: [-37.79873797128382,144.9792416830128],
            zoom: 16,
            controls: ['zoomControl']
        });
        var myPlacemark = new ymaps.Placemark(
            [-37.79873797128382,144.9792416830128], 
            {}, 
            // {
            //     iconLayout: 'default#image',
            //     iconImageHref: 'img/location-pin.png',
            //     iconImageSize: [30, 42],
            // }
        );
        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
    }
});