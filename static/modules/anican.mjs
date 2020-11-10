
function anican(canvas,i) {

    let context = canvas.getContext("2d"),
    Dots = [],
    colors = i.colors,
    maximum = i.max;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Initialize() {
      GenerateDots();
      Update();
    }

    function Dot() {
       try{
        this.active = true;
        this.diameter = Math.random() * i.size;
        this.x = Math.round(Math.random() * canvas.width);
        this.y = Math.round(Math.random() * canvas.height);
        this.velocity = {
          x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * i.speed,
          y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * i.speed
        };
        this.alpha = 0.1;
        this.hex = colors[Math.round(Math.random() * 3)];
        this.color = HexToRGBA(this.hex, this.alpha);
      } catch(e){
        if (e) {return console.log(e)}
      }
    }

    Dot.prototype = {
      Update: function() {
        try{
          if (this.alpha < 0.8) {
            this.alpha += 0.01;
            this.color = HexToRGBA(this.hex, this.alpha);
            this.color = HexToRGBA(this.hex, this.alpha);
          }

          this.x += this.velocity.x;
          this.y += this.velocity.y;

          if (
            this.x > canvas.width + 5 ||
            this.x < 0 - 5 ||
            this.y > canvas.height + 5 ||
            this.y < 0 - 5
          ) {
            this.active = false;
          }
        } catch(e){
          if (e) {return console.log(e)}
        }
      },
      Draw: function() {
        try{
          context.fillStyle = this.color;
          context.shadowColor = '#00bcd4';
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.shadowBlur = 10;
          context.lineWidth = 1
          context.beginPath();
          context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false);
          context.fill();
        } catch(e){
          if (e) {return console.log(e)}
        }
      }
    }

    function Update() {
      GenerateDots();
      Dots.forEach(function(Dot) {
        Dot.Update();
      });
      Dots = Dots.filter(function(Dot) {
        return Dot.active;
      });
      Render();
      requestAnimationFrame(Update);
    }

    function Render() {
      try{
        context.clearRect(0, 0, canvas.width, canvas.height);
        Dots.forEach(function(Dot) {
          Dot.Draw();
        });
      } catch(e){
        if(e) { return console.log(e)}
      }
    }

    function GenerateDots() {
      try {
        if (Dots.length < maximum) {
          for (var i = Dots.length; i < maximum; i++) {
            Dots.push(new Dot());
          }
        }
        return false;
      } catch (e) {
        if(e){ return console.log(e)}
      }
    }

    function HexToRGBA(hex, alpha) {
      try{
        let red = parseInt(TrimHex(hex).substring(0, 2), 16),
        green = parseInt(TrimHex(hex).substring(2, 4), 16),
        blue = parseInt(TrimHex(hex).substring(4, 6), 16);
        return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
      } catch(e){
        if(e){return console.log(e)}
      }
    }

    function TrimHex(hex) {
      try {
        let res = hex.charAt(0) === "#" ? hex.substring(1, 7) : h;
        return res;
      } catch (e) {
        if(e){return console.log(e)}
      }
    }

    window.addEventListener("resize", function() {
        Dots = [];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });

    return Initialize();

}


export { anican }
