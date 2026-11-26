(function(){
var R=getComputedStyle(document.documentElement);
function tk(n){return R.getPropertyValue(n).trim();}
function lista(n,def){var v=tk(n).split(/\s+/).map(Number).filter(function(x){return x>0;});return v.length>=5?v.sort(function(a,b){return a-b;}):def;}
function pares(n,def){var o={},k=0;tk(n).split(/\s+/).forEach(function(p){var a=p.split('/');if(a.length===2&&+a[0]>0){o[+a[0]]=+a[1];k++;}});return k?o:def;}
var E=lista('--ttk-escala-espacios',[4,8,12,16,24,32,40,48,64,80]);
var T=pares('--ttk-escala-titulos',{45:52,34:40,21:27,18:24,16:22,14:20,12:16,56:64,40:48});
var X=pares('--ttk-escala-textos',{18:28,16:26,14:20,12:16,10:14});
var MX=Math.max.apply(null,Object.keys(X).map(Number));
var RP=parseFloat(tk('--ttk-radio-pequeno'))||4,RG=parseFloat(tk('--ttk-radio-grande'))||8;
var G=[];for(var g=1;g<=8;g++){var c=tk('--ttk-grafica-'+g);if(/^#[0-9a-f]{6}$/i.test(c))G.push(c.toLowerCase());}
if(G.length<8)G=['#001524','#357a38','#dbe64c','#d27747','#66737c','#86af88','#e9bba3','#99a1a7'];
var prueba=document.createElement('div');prueba.style.cssText='position:absolute;left:-9999px;width:1px;height:1px';
var ST='',SF='',STv=tk('--ttk-sombra-tarjeta')||'0 2px 8px #00152440',SFv=tk('--ttk-sombra-flotante')||'0 12px 36px #0015243d';
function sombras(){if(ST)return;document.body.appendChild(prueba);prueba.style.boxShadow=STv;ST=getComputedStyle(prueba).boxShadow;prueba.style.boxShadow=SFv;SF=getComputedStyle(prueba).boxShadow;prueba.remove();}
function blur(b){var x=b.replace(/rgba?\([^)]*\)/g,'').trim().split(/\s+/);return parseFloat(x[2]||'0');}
var PE=['padding-top','padding-right','padding-bottom','padding-left','margin-top','margin-bottom','row-gap','column-gap'];
var PR=['border-top-left-radius','border-top-right-radius','border-bottom-left-radius','border-bottom-right-radius'];
var H=[];
function pon(el,p,v){H.push([el,p,el.style.getPropertyValue(p),el.style.getPropertyPriority(p)]);el.style.setProperty(p,v,'important');}
function quita(){for(var h=H.length-1;h>=0;h--){var a=H[h];if(a[2]){a[0].style.setProperty(a[1],a[2],a[3]);}else{a[0].style.removeProperty(a[1]);}}H=[];}
function cerca(lst,a){var r=lst[0],d=1e9;for(var i=0;i<lst.length;i++){var e=Math.abs(lst[i]-a);if(e<d){d=e;r=lst[i];}}return r;}
function pasa(){
quita();sombras();
var t=document.querySelectorAll('body *');
for(var i=0;i<t.length;i++){var el=t[i];
if(el.closest('#wpadminbar'))continue;
var s=getComputedStyle(el);if(s.display==='none')continue;
var r=el.getBoundingClientRect();
for(var j=0;j<PE.length;j++){var v=s.getPropertyValue(PE[j]);if(!v||v.slice(-2)!=='px')continue;var n=parseFloat(v),a=Math.abs(n);if(!a||a>100)continue;if(E.indexOf(Math.round(a))>=0&&Math.abs(a-Math.round(a))<0.05)continue;var q=a<E[0]?E[0]:cerca(E,a);pon(el,PE[j],(n<0?-q:q)+'px');}
if(r.width&&r.height){var mitad=Math.min(r.width,r.height)/2;
for(var k=0;k<PR.length;k++){var w=s.getPropertyValue(PR[k]);if(!w||w==='0px'||w.indexOf('%')>=0||w.indexOf(' ')>=0)continue;var z=parseFloat(w);if(z===RP||z===RG||z>=999||z>=mitad-1)continue;var y=z<=(RP+RG)/2?RP:(z>=20&&z>=mitad*0.8?999:RG);pon(el,PR[k],y+'px');}
var b=s.boxShadow;if(b&&b!=='none'&&b.indexOf('inset')<0&&b!==ST&&b!==SF){var bl=blur(b);if(bl>0)pon(el,'box-shadow',bl>=(blur(ST)+blur(SF))/2?SFv:STv);}}
var tx=false;for(var c2=el.firstChild;c2;c2=c2.nextSibling){if(c2.nodeType===3&&c2.textContent.trim()){tx=true;break;}}
if(tx&&!el.closest('svg')){var f=s.fontFamily.toLowerCase();var ti=f.indexOf('syne')>=0||f.indexOf('georgia')>=0;var po=f.indexOf('poppins')>=0;
if(ti||po){var fs0=parseFloat(s.fontSize),fs=Math.round(fs0);var M=(ti||fs0>MX+4)?T:X;
if(!M[fs]){var bb=cerca(Object.keys(M).map(Number),fs0);pon(el,'font-size',bb+'px');fs=bb;}
var lh=s.lineHeight==='normal'?0:parseFloat(s.lineHeight);if(M[fs]&&Math.abs(lh-M[fs])>=0.5)pon(el,'line-height',M[fs]+'px');}}
}}
function con(c,a){var r=parseInt(c.substr(1,2),16),g2=parseInt(c.substr(3,2),16),b=parseInt(c.substr(5,2),16);return 'rgba('+r+','+g2+','+b+','+a+')';}
function alfa(c){if(typeof c!=='string')return 1;var m=c.match(/rgba\([^)]*,\s*([\d.]+)\)/i);if(m)return +m[1];m=c.match(/^#[0-9a-f]{6}([0-9a-f]{2})$/i);if(m)return parseInt(m[1],16)/255;return 1;}
function grad(col){return function(c){var ch=c.chart,a=ch&&ch.chartArea;if(!a)return con(col,0.15);var gr=ch.ctx.createLinearGradient(0,a.top,0,a.bottom);gr.addColorStop(0,con(col,0.35));gr.addColorStop(1,con(col,0));return gr;};}
function gama(ch){try{var ty=(ch.config&&ch.config.type)||'';var parte=/pie|doughnut|polar/.test(ty);var ds=(ch.data||ch.config.data).datasets||[];
var suma=function(d){var t=0;(d.data||[]).forEach(function(x){var v=typeof x==='object'&&x!==null?+x.y:+x;if(v>0)t+=v;});return t;};var S=ds.map(suma);var O=ds.map(function(_,i){return i;}).sort(function(x,y){return S[y]-S[x]||x-y;});
ds.forEach(function(d,i){var col=G[O.indexOf(i)%8];
if(parte){var V=(d.data||[]).map(function(x){return +x||0;});var OP=V.map(function(_,j){return j;}).sort(function(x,y){return V[y]-V[x]||x-y;});var al=alfa(Array.isArray(d.backgroundColor)?d.backgroundColor[0]:d.backgroundColor);d.backgroundColor=V.map(function(_,j){var gg=G[OP.indexOf(j)%8];return al<1?con(gg,al):gg;});d.hoverBackgroundColor=d.backgroundColor.slice();}
else{d.borderColor=col;if(typeof d.backgroundColor==='function'){d.backgroundColor=grad(col);}else{var a2=alfa(d.backgroundColor);d.backgroundColor=a2<1?con(col,a2):col;}d.pointBackgroundColor=col;d.pointBorderColor=col;d.hoverBackgroundColor=col;d.hoverBorderColor=col;}});}catch(e){}}
var enganchado=false;
function graficas(){var C=window.Chart;if(!C)return;if(!enganchado){enganchado=true;var plug={id:'cfsGama',beforeInit:gama,beforeUpdate:gama};try{if(C.register)C.register(plug);else if(C.plugins&&C.plugins.register)C.plugins.register(plug);}catch(e){}}var I=C.instances||{};Object.keys(I).forEach(function(k){gama(I[k]);try{I[k].update('none');}catch(e){}});}
window.cfsManual={pasa:pasa,graficas:graficas};
var nv=0;var tc=setInterval(function(){if(window.Chart){graficas();clearInterval(tc);}if(++nv>40)clearInterval(tc);},250);
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',pasa);}else{pasa();}
window.addEventListener('load',function(){pasa();graficas();setTimeout(function(){pasa();graficas();},2000);});
var tm;window.addEventListener('resize',function(){clearTimeout(tm);tm=setTimeout(pasa,300);});
var tm2,nm=0;try{var mo=new MutationObserver(function(){clearTimeout(tm2);tm2=setTimeout(function(){pasa();if(++nm>=20)mo.disconnect();},1500);});mo.observe(document.body,{childList:true,subtree:true});}catch(e){}
})();
