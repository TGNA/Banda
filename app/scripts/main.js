$("#intro-link, #historia-link, #membres-link, #exibicions-link, #setmana-link").click(function(event){
  event.preventDefault();
  var box = $(this).attr('href');
  var offset = $(box).offset().top;
  if (box == "#intro" ) {
    offset = 0;
  };
  $('body,html').animate({
    scrollTop: offset
  }, 800);
});


$(document).ready(function() {
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
      }
    }
  });

  $('.popup-imatges').magnificPopup({
    items: [
      {
        src: 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Peter_%26_Paul_fortress_in_SPB_03.jpg/800px-Peter_%26_Paul_fortress_in_SPB_03.jpg',
        title: 'Peter & Paul fortress in SPB'
      }
    ],
    gallery: {
      enabled: true
    },
    type: 'image' // this is a default type
  });
  $('#backtop').click(function(){
    $('body,html').animate({scrollTop: 0}, 800);
  });

  Parse.initialize("1Yb7qaW8I3Q44c6oGGJLpyi3nddMTpwRN0yLHZOx", "EV32OmPuVg0Mqm9CPeOG31UiH3sh4McU8D9CPumV");
  var banda = Parse.Object.extend("banda");
  var exibicions = Parse.Object.extend("exibicions");
  var queryBanda = new Parse.Query(banda);
  var queryExibicions = new Parse.Query(exibicions);

  queryExibicions.descending("data");
  queryExibicions.limit(3);

  queryBanda.find({
    success: function(list) {
      console.log(list);
      for(var i=0;i<list.length; i++){
        var nom = list[i].attributes.nom;
        var instrument = list[i].attributes.instrument;
        if(instrument == "bombos"){
          $("#bombos").append("<div class='col-sm-6 col-md-4'><div class='user-card'><img src='http://lorempixel.com/150/150/people/' alt='img'><div>"+nom+"</div></div></div>");
        } else if (list[i].attributes.instrument == "caixistes"){
          $("#caixistes").append("<div class='col-sm-6 col-md-4'><div class='user-card'><img src='http://lorempixel.com/150/150/people/' alt='img'><div>"+nom+"</div></div></div>");
        } else{
          $("#timbalers").append("<div class='col-sm-6 col-md-4'><div class='user-card'><img src='http://lorempixel.com/150/150/people/' alt='img'><div>"+nom+"</div></div></div>");
        }
      }
    }
  });

  queryExibicions.find({
    success: function(list) {
      console.log(list);
      for(var i=0;i<list.length; i++){
        var titol = list[i].attributes.titol;
        var data = list[i].attributes.data;
        var descripcio = list[i].attributes.descripcio;
        var video = list[i].attributes.video;
        
        $("#cd-timeline").append("<div class='cd-timeline-block'><div class='cd-timeline-img'><i class='fa fa-music fa-2x'></i></div><div class='cd-timeline-content'><h2>"+titol+" <small>"+moment(data).locale('ca').format('MMMM YYYY')+"</small></h2><p>"+descripcio+"</p><a class='popup-youtube btn btn-small btn-success' href='https://www.youtube.com/watch?v=Sgyd1Wfl6Dw'>Video</a></div></div>");
      }
      $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
      });
    }
  });
});

