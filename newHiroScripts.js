$(function(){

// finds if links are internal or external
$.expr[':'].external = function (a) {
    var PATTERN_FOR_EXTERNAL_URLS = /^(\w+:)?\/\//;
    var href = $(a).attr('href');
    return href !== undefined && href.search(PATTERN_FOR_EXTERNAL_URLS) !== -1;
};

$.expr[':'].internal = function (a) {
    return $(a).attr('href') !== undefined && !$.expr[':'].external(a);
};

// modal click detector, starts the testing
$('.hiroModalLink').click(function(event) {
  event.preventDefault();
  $('#hiroBlocker').fadeIn('fast');

  if( $(this).prop("nodeName") == 'IMG' ) {

    // do img things
    var imgSource = $(this).prop("src");
    $('#hiroModalFrame').html('<img src="' + imgSource + '">')
    $('#hiroModalFrame').fadeIn('fast', function() {
      $(this).addClass('currentModal');
      
    });

  }
  else if( $(this).data('videoid') ) {
    
    //  if it's a video
    youTubeModalId = $(this).data('videoid');
    youTubeModuleName = $(this).data('trackingref');
    selectVideo();
    $('#hiroYouTubeModal').fadeIn('fast');
    $('#hiroYouTubeModal').addClass('currentModal');


  }
  else if ( $(this).is( 'a:internal' ) ) {

    // NEXT TEST
    console.log('internal link');
    var internalLinkTarget = $(this).attr('href');
    $(internalLinkTarget).fadeIn('slow/400/fast', function() {
      $(this).addClass('currentModal')
    });
  }

  else if ( $(this).is('a:external') ) {
    // if it's external
    console.log('external link');
    var externalLinkTarget = $(this).attr('href');
    $('#hiroModalFrame').html('<iframe src="' + externalLinkTarget + '">' );
    $('#hiroModalFrame').fadeIn('fast', function() {
      $(this).addClass('currentModal');
    });
  }
	
});

$('#hiroBlocker').click(function(event) {
  if (player.playbackStarted){
   stopVideo();
  };
  $('#hiroBlocker').fadeOut('fast');
  $('.currentModal').fadeOut('fast');
  $('.currentModal').removeClass('currentModal');
});


});