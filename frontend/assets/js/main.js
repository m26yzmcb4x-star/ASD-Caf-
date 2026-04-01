(function () {
      var urls = window.__FRAME_DATA_URLS;
      var TOTAL_FRAMES = urls && urls.length ? urls.length : 200;
      var LERP_SPEED = 0.18;
      var images = new Array(TOTAL_FRAMES);
      var currentFrame = 0, targetFrame = 0, loaded = 0, isReady = false;
      
      function framePath(i){ return 'frames-webp/frame_' + String(i+1).padStart(6,'0') + '.webp'; }
      
      var loaderEl = document.getElementById('loader');
      var barEl = document.getElementById('loader-bar');
      var canvas = document.getElementById('bgCanvas');
      var ctx = canvas.getContext('2d');

      function resize(){
        var w = window.innerWidth;
        var h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
      }
      window.addEventListener('resize', resize); resize();

      var FRAME_PHASE = 0.30; 
      var FADE_START = 0.32; 
      var FADE_END = 0.45;

      function drawFrame(img){
        if(!img||!img.naturalWidth) return;
        var cw=canvas.width, ch=canvas.height;
        ctx.clearRect(0,0,cw,ch);
        var s = Math.max(cw/img.naturalWidth, ch/img.naturalHeight);
        var w = img.naturalWidth*s, h = img.naturalHeight*s;
        ctx.drawImage(img, (cw-w)/2, (ch-h)/2, w, h);
      }

      function pageScroll01(){
        var maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        return Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }

      function onFrameLoad(){ 
        loaded++; 
        if(barEl) barEl.style.width=(loaded/TOTAL_FRAMES*100)+'%'; 
        if(loaded>=TOTAL_FRAMES){ 
          isReady=true; 
          if(loaderEl) loaderEl.style.opacity='0';
          setTimeout(() => { if(loaderEl) loaderEl.style.display='none'; }, 500);
        } 
      }

      for(var i=0;i<TOTAL_FRAMES;i++){ 
        images[i]=new Image(); 
        images[i].onload=onFrameLoad; 
        images[i].onerror=onFrameLoad; 
        images[i].src=urls&&urls[i]?urls[i]:framePath(i); 
      }

      function animate(){
        var p = pageScroll01();
        
        // Frame Scrubbing
        if(isReady) {
          var scrubT = p <= FRAME_PHASE ? p / FRAME_PHASE : 1;
          targetFrame = scrubT * (TOTAL_FRAMES - 1);
          currentFrame += (targetFrame - currentFrame) * LERP_SPEED;
          var idx = Math.round(currentFrame);
          if(idx>=0&&idx<TOTAL_FRAMES) drawFrame(images[idx]);
        }

        // Background Transition
        var mix = 0;
        if (p > FADE_START) {
          mix = Math.min(1, (p - FADE_START) / (FADE_END - FADE_START));
        }
        document.getElementById('bgWrap').style.opacity = 1 - mix;
        document.getElementById('postFrameBackdrop').style.opacity = mix;

        // Hero Parallax/Fade
        var hero = document.getElementById('heroContent');
        if (hero) {
          var heroOpacity = Math.max(0, 1 - (p * 5));
          hero.style.opacity = heroOpacity;
          hero.style.transform = 'translateY(' + (-p * 100) + 'px)';
          hero.style.pointerEvents = heroOpacity < 0.1 ? 'none' : 'auto';
        }

        requestAnimationFrame(animate);
      }
      animate();
    })();