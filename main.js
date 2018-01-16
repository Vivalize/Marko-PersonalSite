/* jshint browser: true */
// 
//        // Create cross browser requestAnimationFrame method:
//        window.requestAnimationFrame = window.requestAnimationFrame
//        || window.mozRequestAnimationFrame
//        || window.webkitRequestAnimationFrame
//        || window.msRequestAnimationFrame
//        || function(f){setTimeout(f, 1000/60)}
//         

//var latestKnownScrollY = 0;

var latestKnownScrollY,
    scheduledAnimationFrame = false;

var parallaxArt = [];
for (var i = 0; i <= 7; i++)
    parallaxArt.push(document.getElementById('p'+i));
var pb = document.getElementById('pb');
var head = document.getElementById('top');
var sections = ['bio', 'skills', 'projects', 'interests', 'resume', 'contact'];
var sectionDivs = [];
var sectionLinks = [];
for (var sec in sections) {
    sectionDivs.push(document.getElementById(sections[sec]));
    sectionLinks.push(document.getElementById(sections[sec]+'-link'));
}

function parallax() {
//    requestAnimationFrame(parallax);

    var backSpeed = 0.09;
    var currentScrollY = latestKnownScrollY;

    for (var art in parallaxArt)
        parallaxArt[art].style.top = -currentScrollY * (art * backSpeed) + 'px';
    pb.style.top = (-currentScrollY * (7 * backSpeed)) + 'px';

    var bgStart = 100;
    var bgTrans = 240;
    var trans = 0.94;
    var bgColor = 'rgba(12,32,34,';

    if (currentScrollY < bgStart)
        head.style.backgroundColor = bgColor + 0 + ')';
    else if (currentScrollY >= bgStart && currentScrollY <= bgTrans)
        head.style.backgroundColor = bgColor + (trans * (currentScrollY - bgStart) / (bgTrans - bgStart)) + ')';
    else
        head.style.backgroundColor = bgColor + trans + ')';

}

function updateNavBar() {
//    requestAnimationFrame(updateNavBar);
    var currentScrollY = latestKnownScrollY;

    var off = 100;
    for (var i = 0; i < sections.length - 1; i++) {
        if (currentScrollY + off > sectionDivs[i].offsetTop &&
            currentScrollY + off < sectionDivs[i+1].offsetTop) {
            for (var sl in sectionLinks) {
                sectionLinks[sl].classList.remove('active');
            }
            sectionLinks[i].classList.add('active');
        }
    }
}

//
//function onScroll(evt) {
//    latestKnownScrollY = window.scrollY;
//}
//
//window.addEventListener('scroll', onScroll);
//
//requestAnimationFrame(parallax);
//requestAnimationFrame(updateNavBar);

function onScroll( e ) {
    latestKnownScrollY = window.scrollY;
    if(scheduledAnimationFrame) return;
    scheduledAnimationFrame = true;
    requestAnimationFrame( updatePage );
}

function updatePage( ) {
    scheduledAnimationFrame = false;
    parallax();
    updateNavBar();
}

window.addEventListener( 'scroll', onScroll, false );