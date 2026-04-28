(function() {
  function start() {
    var c = document.createElement('canvas');
    var x = c.getContext('2d');
    c.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999998;pointer-events:none';
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    document.documentElement.appendChild(c);

    var blobs = [];
    for (var i = 0; i < 10; i++) {
      blobs.push({x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, r: 40 + Math.random() * 60, h: Math.random() * 360, p: Math.random() * 6.28});
    }

    var texts = [];
    var words = ['GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED', 'GET HACKED'];
    for (var i = 0; i < 20; i++) {
      var e = document.createElement('div');
      e.textContent = 'GET HACKED';
      e.style.cssText = 'position:fixed;z-index:999999999;pointer-events:none;font-family:Courier New,monospace;font-weight:bold;color:white;text-shadow:0 0 10px black;white-space:nowrap;font-size:' + (20 + Math.random() * 50) + 'px;left:' + (Math.random() * 90) + 'vw;top:' + (Math.random() * 90) + 'vh;opacity:0.5';
      document.documentElement.appendChild(e);
      texts.push({el: e, bx: parseFloat(e.style.left), by: parseFloat(e.style.top), sp: 0.2 + Math.random() * 0.5, ph: Math.random() * 6.28, hu: Math.random() * 360, sz: 20 + Math.random() * 50});
    }

    var start = Date.now();
    var frame = 0;
    var t = 0;

    function loop() {
      var elapsed = Date.now() - start;
      if (elapsed >= 60000) {
        c.remove();
        for (var i = 0; i < texts.length; i++) texts[i].el.remove();
        return;
      }
      frame++;
      t += 0.02;

      x.clearRect(0, 0, c.width, c.height);

      for (var b = 0; b < blobs.length; b++) {
        var bl = blobs[b];
        bl.x += bl.vx + Math.sin(t + bl.p) * 0.5;
        bl.y += bl.vy + Math.cos(t * 0.7 + bl.p) * 0.5;
        if (bl.x < -bl.r) bl.x = c.width + bl.r;
        if (bl.x > c.width + bl.r) bl.x = -bl.r;
        if (bl.y < -bl.r) bl.y = c.height + bl.r;
        if (bl.y > c.height + bl.r) bl.y = -bl.r;
        if (elapsed >= 20000) bl.h = (bl.h + 0.5) % 360;

        var a = 0.4 + Math.sin(t * 0.3 + bl.p) * 0.1;
        var g = x.createRadialGradient(bl.x, bl.y, 0, bl.x, bl.y, bl.r);

        if (elapsed < 20000) {
          var gr = 50 + Math.sin(t * 0.5 + bl.p) * 30;
          g.addColorStop(0, 'rgba(' + gr + ',' + gr + ',' + gr + ',' + a + ')');
          g.addColorStop(0.5, 'rgba(' + (gr-20) + ',' + (gr-20) + ',' + (gr-20) + ',' + (a*0.6) + ')');
          g.addColorStop(1, 'rgba(' + (gr-40) + ',' + (gr-40) + ',' + (gr-40) + ',0)');
        } else {
          var h = (bl.h + elapsed * 0.01) % 360;
          g.addColorStop(0, 'hsla(' + h + ',100%,60%,' + a + ')');
          g.addColorStop(0.5, 'hsla(' + (h+30) + ',100%,50%,' + (a*0.5) + ')');
          g.addColorStop(1, 'hsla(' + (h+60) + ',100%,40%,0)');
        }

        x.beginPath();
        x.arc(bl.x, bl.y, bl.r, 0, 6.28);
        x.fillStyle = g;
        x.fill();
      }

      for (var i = 0; i < blobs.length; i++) {
        for (var j = i + 1; j < blobs.length; j++) {
          var dx = blobs[i].x - blobs[j].x;
          var dy = blobs[i].y - blobs[j].y;
          var d = Math.sqrt(dx*dx + dy*dy);
          var md = (blobs[i].r + blobs[j].r) * 1.8;
          if (d < md) {
            var a2 = (1 - d/md) * 0.4;
            x.beginPath();
            x.moveTo(blobs[i].x, blobs[i].y);
            x.lineTo(blobs[j].x, blobs[j].y);
            if (elapsed < 20000) {
              x.strokeStyle = 'rgba(100,100,100,' + a2 + ')';
            } else {
              var ah = ((blobs[i].h + blobs[j].h) / 2 + elapsed * 0.01) % 360;
              x.strokeStyle = 'hsla(' + ah + ',100%,60%,' + a2 + ')';
            }
            x.lineWidth = 4 + (1 - d/md) * 8;
            x.stroke();
          }
        }
      }

      for (var i = 0; i < texts.length; i++) {
        var t2 = texts[i];
        t2.el.style.left = (t2.bx + Math.sin(t * t2.sp + t2.ph) * 20) + 'vw';
        t2.el.style.top = (t2.by + Math.cos(t * t2.sp * 0.7 + t2.ph) * 20) + 'vw';
        if (elapsed < 20000) {
          t2.el.style.filter = Math.random() > 0.5 ? 'grayscale(1)' : 'grayscale(0)';
          t2.el.style.color = 'white';
          t2.el.style.textShadow = '0 0 10px black';
          t2.el.style.opacity = 0.3 + Math.sin(t * t2.sp + t2.ph) * 0.2;
        } else {
          var th = (t2.hu + elapsed * 0.05 + i * 30) % 360;
          t2.el.style.color = 'hsl(' + th + ',100%,70%)';
          t2.el.style.textShadow = '0 0 15px hsl(' + th + ',100%,50%)';
          t2.el.style.filter = 'none';
          t2.el.style.opacity = 0.5 + Math.sin(t * t2.sp + t2.ph) * 0.3;
          if (elapsed >= 40000) {
            t2.el.style.fontSize = (t2.sz * (1 + Math.sin(t * 1.5 + t2.ph) * 0.3)) + 'px';
          }
        }
      }

      requestAnimationFrame(loop);
    }

    loop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(start, 1000); });
  } else {
    setTimeout(start, 1000);
  }
})();