(function(){
  var root=document.documentElement, btn=document.getElementById('themeBtn');
  try{var s=localStorage.getItem('clumsy-theme');if(s)root.setAttribute('data-theme',s);}catch(e){}
  function sync(){
    btn.setAttribute('aria-label',root.getAttribute('data-theme')==='dark'?'Switch to light theme':'Switch to dark theme');
  }
  sync();
  btn.addEventListener('click',function(){
    var n=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',n);
    try{localStorage.setItem('clumsy-theme',n);}catch(e){}
    sync();
  });

  var track=document.getElementById('track');
  [54,88,38,120,66,44,96,72,50,110,60,82,40,68].forEach(function(w,i){
    var el=document.createElement('div');
    el.className='clip'+(i===6?' drop':'')+(i%3===1?' lit':'');
    el.style.width=w+'px';
    el.style.animationDelay=(i*0.045)+'s';
    track.appendChild(el);
  });

  var wave=document.getElementById('wave');
  for(var w=0;w<96;w++){
    var b=document.createElement('i');
    var env=0.35+0.65*Math.abs(Math.sin(w*0.31))*(0.55+0.45*Math.sin(w*0.09));
    b.style.height=Math.max(3,env*36)+'px';
    b.style.animationDelay=(0.35+w*0.006)+'s';
    wave.appendChild(b);
  }

  var mw=document.getElementById('mwave');
  if(mw){
    var d='';
    for(var m=0;m<74;m++){
      var x=16+m*4.3;
      var h=Math.max(2,(0.3+0.7*Math.abs(Math.sin(m*0.42))*(0.5+0.5*Math.sin(m*0.13)))*26);
      d+='M'+x.toFixed(1)+' '+(64-h/2).toFixed(1)+'V'+(64+h/2).toFixed(1);
    }
    mw.innerHTML='<path d="'+d+'"/>';
  }

  var ruler=document.getElementById('ruler');
  for(var i=0;i<64;i++){
    var sp=document.createElement('span');
    sp.style.left=(i/63*100)+'%';
    if(i%8===0)sp.className='maj';
    ruler.appendChild(sp);
  }

  var ticks=document.getElementById('ticks');
  for(var j=0;j<=20;j++){
    var t=document.createElement('i');
    t.style.top=(j*5)+'%';
    t.style.width=(j%4===0?'14px':'7px');
    ticks.appendChild(t);
  }

  var head=document.getElementById('playhead'), live=document.getElementById('tcLive');
  function pad(n){return n<10?'0'+n:''+n;}
  function update(){
    var h=document.documentElement, max=h.scrollHeight-h.clientHeight;
    var p=max>0?Math.min(1,Math.max(0,h.scrollTop/max)):0;
    head.style.top=(p*100)+'%';
    live.style.top=(p*100)+'%';
    var f=Math.round(p*78*30);
    live.textContent=pad(Math.floor(f/1800))+':'+pad(Math.floor(f/30)%60)+':'+pad(f%30);
  }
  update();
  addEventListener('scroll',update,{passive:true});
  addEventListener('resize',update);
})();
