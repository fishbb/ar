// Adapted from examples on the Querystring homepage.
function getUrlVars() {
    var vars = {};
    var uri_dec = decodeURIComponent(window.location.href);
    var parts = uri_dec.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function displayParam(p) {
    var value = getUrlVars()[p];
    return value;
}
var isbn = displayParam('isbn');
var i_string ='ISBN: '.concat(isbn);
var title = displayParam('title');
var t_string = 'Title: '.concat(title);
var author = displayParam('author');
var a_string = 'by '.concat(author);
var rating = displayParam('average_rating');
var count = displayParam('rating_count');
var r_string = 'Rating: '.concat(rating, " (", count, " ratings)");
var sceneEl = document.querySelector('a-scene');
var camaraEL = sceneEl.querySelector('#camera');
var els = camaraEL.querySelectorAll('a-text');
if (title.length > 0) {
    els[0].setAttribute('value', t_string);
    els[0].setAttribute('color', '#a8d0e6'); //F3D250  f76c6c
    els[0].setAttribute('position',"-1.5 0.5 -5");
}
if (author.length > 0) {
    els[1].setAttribute('value', a_string);
    els[1].setAttribute('color', '#a8d0e6'); //5DA2D5
    els[1].setAttribute('position',"-2 0.3 -7");
}
if (isbn.length > 0) {
    els[2].setAttribute('value', i_string);
    els[2].setAttribute('color', '#f76c6c');
    els[2].setAttribute('position',"-2 0.1 -7");
}

if (rating.length >0) {
    els[3].setAttribute('value', r_string);
    els[3].setAttribute('color', '#f8e9a1');
    els[3].setAttribute('position',"-1.5 -0.1 -5"); 
}
else {
    els[3].setAttribute('value', 'No rating information available.');
    els[3].setAttribute('color', '#f8e9a1');
    els[3].setAttribute('position',"-1.5 -0.2 -5"); 
    var torusEl = document.createElement('a-torus-knot');
//     torusEl.setAttribute('color', "#B84A39");
    torusEl.setAttribute('material-displacement', '');
    torusEl.setAttribute('arc', "30");   
    torusEl.setAttribute('p', "1");
    torusEl.setAttribute('q', "5");
    torusEl.setAttribute('radius', ".5");
    torusEl.setAttribute('radius-tubular', "0.05");
    torusEl.setAttribute('position',"0 -1.5 -6"); 
    torusEl.addEventListener('loaded', function () {
      console.log('torusEl attached');
      })     
    camaraEL.appendChild(torusEl);  
    
}


var last_pos = -0.5;
var rating_decimal = (rating % 1) * 360;
console.log(rating_decimal.toString());
// sceneEl.appendChild(entityEl);
var aniEl=document.createElement('a-animation');
aniEl.setAttribute('attribute', 'scale');
aniEl.setAttribute('direction', 'alternate-reverse');
aniEl.setAttribute('dur', '5000');
aniEl.setAttribute('from', '1 1 1');
aniEl.setAttribute('to', '3 3 3');
aniEl.setAttribute('repeat', 'indefinite');
aniEl.addEventListener('loaded', function () {
  console.log('animation attached');
  }) 
var i;
for (i = 0; i <= rating - 1; i++) { 
    var sphereEl = document.createElement('a-sphere');
    sphereEl.setAttribute('id', 'box');
    sphereEl.setAttribute('radius', 0.1);
    sphereEl.setAttribute('material-displacement','');
    sphereEl.setAttribute('scale', '1 1 1');            
    var x = -0.8 + i * 0.22;
    var pos = x.toString().concat(" -0.3 -3");
    sphereEl.setAttribute('position',pos);
    last_pos = x;
    sphereEl.addEventListener('loaded', function () {
      console.log('sphere attached');
      }) 

    camaraEL.appendChild(sphereEl);      
}

if (rating_decimal>0) {
    var entityEl = document.createElement('a-entity');
    var geo = "primitive: sphere; shader: displacement; radius: 0.1; thetaStart: 90; thetaLength: ".concat(rating_decimal.toString(),";"); 
    entityEl.setAttribute("geometry", geo);
    var pos = (last_pos + 0.22).toString().concat(" -0.3 -3");
    entityEl.setAttribute("id", "box");    
    entityEl.setAttribute("position", pos);
    entityEl.setAttribute('material-displacement','');    
    camaraEL.appendChild(entityEl);  
}

var balls = sceneEl.querySelectorAll('a-animation');
console.log(balls[1]);
