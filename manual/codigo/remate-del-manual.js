/* Remate del manual: una sola copia. Madre y nexoTTK lo cargan de aquí (m-cfs.us/manual/codigo/remate-del-manual.js); la regla de colores de las gráficas (orden) también la usan de aquí. */
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
var PAL=[];(function(){var vistos={};function mira(rs){for(var i=0;i<rs.length;i++){var r=rs[i];if(r.cssRules&&!r.style){try{mira(r.cssRules);}catch(e){}continue;}if(r.style&&r.selectorText&&/:root/.test(r.selectorText)){for(var j=0;j<r.style.length;j++){var n=r.style[j];if(n.indexOf('--ttk-paleta-')===0&&!vistos[n]){vistos[n]=1;var v=tk(n);var m=v.match(/^#([0-9a-f]{6})$/i);if(m)PAL.push(m[1].toLowerCase());}}}}}for(var k=0;k<document.styleSheets.length;k++){try{mira(document.styleSheets[k].cssRules);}catch(e){}}})();
function lab(h){var c=[0,2,4].map(function(i){var v=parseInt(h.substr(i,2),16)/255;return v>0.04045?Math.pow((v+0.055)/1.055,2.4):v/12.92;});var x=(c[0]*0.4124+c[1]*0.3576+c[2]*0.1805)/0.95047,y=c[0]*0.2126+c[1]*0.7152+c[2]*0.0722,z=(c[0]*0.0193+c[1]*0.1192+c[2]*0.9505)/1.08883;function f(t){return t>0.008856?Math.cbrt(t):7.787*t+16/116;}return [116*f(y)-16,500*(f(x)-f(y)),200*(f(y)-f(z))];}
var PLAB=PAL.map(function(p){return [p,lab(p)];}),EN={};PAL.forEach(function(p){EN[p]=1;});var CC={};
function proximo(h){if(CC[h])return CC[h];var l=lab(h),b=PAL[0],d=1e9;PLAB.forEach(function(q){var e=Math.pow(q[1][0]-l[0],2)+Math.pow(q[1][1]-l[1],2)+Math.pow(q[1][2]-l[2],2);if(e<d){d=e;b=q[0];}});CC[h]=b;return b;}
function color(c){var m=c&&c.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);if(!m)return null;var a=m[4]===undefined?1:+m[4];if(a===0)return null;var h=[m[1],m[2],m[3]].map(function(v){return ('0'+(+v).toString(16)).slice(-2);}).join('');if(!PAL.length||EN[h])return null;var p='#'+proximo(h);return a<1?con(p,a):p;}
var PC=[['color','color'],['background-color','backgroundColor'],['border-top-color','borderTopColor'],['border-right-color','borderRightColor'],['border-bottom-color','borderBottomColor'],['border-left-color','borderLeftColor']];
var PE=['padding-top','padding-right','padding-bottom','padding-left','margin-top','margin-bottom','row-gap','column-gap'];
var PR=['border-top-left-radius','border-top-right-radius','border-bottom-left-radius','border-bottom-right-radius'];
var H=[];
function pon(el,p,v){H.push([el,p,el.style.getPropertyValue(p),el.style.getPropertyPriority(p)]);el.style.setProperty(p,v,'important');}
function quita(){for(var h=H.length-1;h>=0;h--){var a=H[h];if(a[2]){a[0].style.setProperty(a[1],a[2],a[3]);}else{a[0].style.removeProperty(a[1]);}}H=[];}
function cerca(lst,a){var r=lst[0],d=1e9;for(var i=0;i<lst.length;i++){var e=Math.abs(lst[i]-a);if(e<d){d=e;r=lst[i];}}return r;}
function mide(el,W){
if(el.id==='wpadminbar')return false;
var s=getComputedStyle(el);if(s.display==='none')return false;
var r=el.getBoundingClientRect();
for(var pc=0;pc<PC.length;pc++){if(pc>1&&!(parseFloat(s[PC[pc][1].replace('Color','Width')])>0))continue;var nc=color(s[PC[pc][1]]);if(nc)W.push([el,PC[pc][0],nc]);}
for(var j=0;j<PE.length;j++){var v=s.getPropertyValue(PE[j]);if(!v||v.slice(-2)!=='px')continue;var n=parseFloat(v),a=Math.abs(n);if(!a||a>100)continue;if(E.indexOf(Math.round(a))>=0&&Math.abs(a-Math.round(a))<0.05)continue;var q=a<E[0]?E[0]:cerca(E,a);W.push([el,PE[j],(n<0?-q:q)+'px']);}
if(r.width&&r.height){var mitad=Math.min(r.width,r.height)/2;
for(var k=0;k<PR.length;k++){var w=s.getPropertyValue(PR[k]);if(!w||w==='0px'||w.indexOf('%')>=0||w.indexOf(' ')>=0)continue;var z=parseFloat(w);if(z===RP||z===RG||z>=999||z>=mitad-1)continue;var y=z<=(RP+RG)/2?RP:(z>=20&&z>=mitad*0.8?999:RG);W.push([el,PR[k],y+'px']);}
var b=s.boxShadow;if(b&&b!=='none'&&b.indexOf('inset')<0&&b!==ST&&b!==SF){var bl=blur(b);if(bl>0)W.push([el,'box-shadow',bl>=(blur(ST)+blur(SF))/2?SFv:STv]);}}
var tx=false;for(var c2=el.firstChild;c2;c2=c2.nextSibling){if(c2.nodeType===3&&c2.textContent.trim()){tx=true;break;}}
if(tx&&!el.closest('svg')){var f=s.fontFamily.toLowerCase();var ti=f.indexOf('syne')>=0||f.indexOf('georgia')>=0;var po=f.indexOf('poppins')>=0;
if(ti||po){var fs0=parseFloat(s.fontSize),fs=Math.round(fs0);var M=(ti||fs0>MX+4)?T:X;
var cambia=false;if(!M[fs]){var bb=cerca(Object.keys(M).map(Number),fs0);W.push([el,'font-size',bb+'px']);fs=bb;cambia=true;}
var lh=s.lineHeight==='normal'?0:parseFloat(s.lineHeight);if(M[fs]&&(cambia||Math.abs(lh-M[fs])>=0.5))W.push([el,'line-height',M[fs]+'px']);}}
}
function recorre(raices,completo){
if(completo)quita();sombras();
var W=[],t0=Date.now();
for(var x=0;x<raices.length;x++){var raiz=raices[x];if(!raiz||raiz.nodeType!==1||!raiz.isConnected)continue;if(raiz.closest&&raiz.closest('#wpadminbar'))continue;var tw=document.createTreeWalker(raiz,1,{acceptNode:function(n){return mide(n,W)===false?2:1;}});if(raiz!==document.body&&mide(raiz,W)===false)continue;while(tw.nextNode()){}}
for(var k=0;k<W.length;k++){pon(W[k][0],W[k][1],W[k][2]);}
return Date.now()-t0;
}
function pasa(){return recorre([document.body],true);}
function con(c,a){var r=parseInt(c.substr(1,2),16),g2=parseInt(c.substr(3,2),16),b=parseInt(c.substr(5,2),16);return 'rgba('+r+','+g2+','+b+','+a+')';}
function alfa(c){if(typeof c!=='string')return 1;var m=c.match(/rgba\([^)]*,\s*([\d.]+)\)/i);if(m)return +m[1];m=c.match(/^#[0-9a-f]{6}([0-9a-f]{2})$/i);if(m)return parseInt(m[1],16)/255;return 1;}
function grad(col){return function(c){var ch=c.chart,a=ch&&ch.chartArea;if(!a)return con(col,0.15);var gr=ch.ctx.createLinearGradient(0,a.top,0,a.bottom);gr.addColorStop(0,con(col,0.35));gr.addColorStop(1,con(col,0));return gr;};}
function fe(t){t=String(t==null?'':t).trim().toLowerCase().replace(/ ?[(][^)]*[)]$/,'').replace(/ de /g,' ').replace(/[ ]+/g,' ');if(!t)return null;var A='ene feb mar abr may jun jul ago sep oct nov dic'.split(' '),F='enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre'.split(' ');var Y=function(s){if(!/^((19|20)[0-9][0-9]|[0-9][0-9])$/.test(s))return -1;var y=+s;return y<100?y+2000:y;};var a,p=t.replace(/^(año|ejercicio) /,'').split(' ');if(p.length===1&&/^(19|20)[0-9][0-9]$/.test(p[0]))return +p[0]*10000;a=t.match(/^((19|20)[0-9][0-9])[-/.]([0-9]{1,2})([-/.]([0-9]{1,2}))?$/);if(a)return +a[1]*10000+(+a[3])*100+(a[5]?+a[5]:0);a=t.match(/^(([0-9]{1,2})[-/.])?([0-9]{1,2})[-/.]((19|20)[0-9][0-9]|[0-9][0-9])$/);if(a&&(a[2]||+a[3]<=12)){var yy=Y(a[4]);if(a[2])return yy*10000+(+a[3])*100+(+a[2]);return yy*10000+(+a[3])*100;}a=t.match(/^(?:([tqs])([1-4])|([1-4])([tqs]))[ -]?((19|20)[0-9][0-9]|[0-9][0-9])?$/)||t.match(/^((19|20)[0-9][0-9]) ?([tqs])([1-4])$/);if(a){var l,q,y2;if(a[1]&&/^(19|20)/.test(a[1])&&a[3]){y2=+a[1];l=a[3];q=+a[4];}else{l=a[1]||a[4];q=+(a[2]||a[3]);y2=a[5]?Y(a[5]):0;}if(l==='s'&&q>2)return null;return y2*10000+(l==='s'?q*6:q*3)*100;}var w=p[0].replace(/[.,]$/,''),k=A.indexOf(w);if(k<0)k=F.indexOf(w);if(w==='sept')k=8;if(k>=0){if(p.length>2)return null;var y3=0;if(p.length===2){y3=Y(p[1].replace(/^de /,''));if(y3<0)return null;}return y3*10000+(k+1)*100;}a=t.match(/^([0-9]{1,2}) (?:de )?([a-z]+)[.]?(?: (?:de )?((19|20)[0-9][0-9]))?$/);if(a){var k2=A.indexOf(a[2].slice(0,3));if(k2>=0&&(A.indexOf(a[2])>=0||F.indexOf(a[2])>=0||a[2]==='sept'))return (a[3]?+a[3]:0)*10000+(k2+1)*100+(+a[1]);}return null;}
function orden(L,V){var n=V.length,f=[],ok=n>1&&L&&L.length>=n;for(var i=0;i<n&&ok;i++){f[i]=fe(L[i]);if(f[i]===null)ok=false;}var o=V.map(function(_,i){return i;});return o.sort(ok?function(x,y){return f[y]-f[x]||x-y;}:function(x,y){return V[y]-V[x]||x-y;});}
function gama(ch){try{var ty=(ch.config&&ch.config.type)||'';var parte=/pie|doughnut|polar/.test(ty);var ds=(ch.data||ch.config.data).datasets||[];
var suma=function(d){var t=0;(d.data||[]).forEach(function(x){var v=typeof x==='object'&&x!==null?+x.y:+x;if(v>0)t+=v;});return t;};var S=ds.map(suma);var O=orden(ds.map(function(d){return d.label;}),S);
ds.forEach(function(d,i){var col=G[O.indexOf(i)%8];
if(parte){var V=(d.data||[]).map(function(x){return +x||0;});var OP=orden((ch.data||ch.config.data).labels||[],V);var al=alfa(Array.isArray(d.backgroundColor)?d.backgroundColor[0]:d.backgroundColor);d.backgroundColor=V.map(function(_,j){var gg=G[OP.indexOf(j)%8];return al<1?con(gg,al):gg;});d.hoverBackgroundColor=d.backgroundColor.slice();}
else{d.borderColor=col;if(typeof d.backgroundColor==='function'){d.backgroundColor=grad(col);}else{var a2=alfa(d.backgroundColor);d.backgroundColor=a2<1?con(col,a2):col;}d.pointBackgroundColor=col;d.pointBorderColor=col;d.hoverBackgroundColor=col;d.hoverBorderColor=col;}});}catch(e){}}
var enganchado=false;
function graficas(){var C=window.Chart;if(!C)return;if(!enganchado){enganchado=true;var plug={id:'cfsGama',beforeInit:gama,beforeUpdate:gama};try{if(C.register)C.register(plug);else if(C.plugins&&C.plugins.register)C.plugins.register(plug);}catch(e){}}var I=C.instances||{};Object.keys(I).forEach(function(k){gama(I[k]);try{I[k].update('none');}catch(e){}});}
window.cfsManual={pasa:pasa,graficas:graficas,orden:orden,fecha:fe};
var nv=0;var tc=setInterval(function(){if(window.Chart){graficas();clearInterval(tc);}if(++nv>40)clearInterval(tc);},250);
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',pasa);}else{pasa();}
window.addEventListener('load',function(){pasa();graficas();setTimeout(function(){pasa();graficas();},2500);});
var tm;window.addEventListener('resize',function(){clearTimeout(tm);tm=setTimeout(pasa,300);});
var nuevos=[],tm2,t0=Date.now();try{var mo=new MutationObserver(function(ms){if(Date.now()-t0>120000){mo.disconnect();return;}for(var a=0;a<ms.length;a++){var ad=ms[a].addedNodes;for(var b2=0;b2<ad.length;b2++){if(ad[b2].nodeType===1)nuevos.push(ad[b2]);}}if(!nuevos.length)return;clearTimeout(tm2);tm2=setTimeout(function(){var lote=nuevos;nuevos=[];recorre(lote,false);graficas();},400);});mo.observe(document.body,{childList:true,subtree:true});}catch(e){}
})();
