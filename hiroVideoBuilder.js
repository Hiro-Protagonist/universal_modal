// YouTube Builder

      // This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      //This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          moduleName: '',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': trackVideoContent
          }
        });
        
      }

      function trackVideoContent (event) {
        console.log('state changed')
        var duration = event.target.getDuration();
        var durationMinutes = Math.trunc(duration / 60);
        var durationSeconds = Math.trunc(duration % 60);
        var videoData = event.target.getVideoData();
        var videoTitle = videoData ? (videoData.title + ' (' + durationMinutes + ':' + durationSeconds + ')') : '';
        var moduleName = youTubeModuleName;
        if (event.data === YT.PlayerState.PLAYING) {
          if (!player.playbackStarted) {
            if (typeof dcsMultiTrack !== "undefined") {
              dcsMultiTrack('DCS.dcssip', window.location.hostname, 
                            'DCS.dcsuri', '/' + moduleName,
                      'WT.es', window.location.hostname + window.location.pathname,
                      'WT.ti', 'Click:' + moduleName,
                      'WT.dl', '6',
                      'WT.z_mod_n', moduleName,
                      'WT.z_mod_a', 'play',
                      'WT.z_mod_a_d', videoTitle);
            }
            player.playbackStarted = true;
          }
          
        } else if (event.data === YT.PlayerState.ENDED) {
          if (typeof dcsMultiTrack !== "undefined") {
            dcsMultiTrack('DCS.dcssip', window.location.hostname, 
                          'DCS.dcsuri', '/' + moduleName,
                    'WT.es', window.location.hostname + window.location.pathname,
                    'WT.ti', 'Click:' + moduleName,
                    'WT.dl', '6',
                    'WT.z_mod_n', moduleName,
                    'WT.z_mod_a', 'end',
                    'WT.z_mod_a_d', videoTitle);
          }
        }
      }

      function onPlayerReady() {};

      function selectVideo() {
          player.loadVideoById(youTubeModalId);
        };
        
      
      
      function stopVideo() {
        player.stopVideo(-1);
      }

// Video Modal Functions 
      
      

