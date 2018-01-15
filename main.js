/* jshint browser: true */
// 
//        // Create cross browser requestAnimationFrame method:
//        window.requestAnimationFrame = window.requestAnimationFrame
//        || window.mozRequestAnimationFrame
//        || window.webkitRequestAnimationFrame
//        || window.msRequestAnimationFrame
//        || function(f){setTimeout(f, 1000/60)}
//         

var latestKnownScrollY = 0;

function parallax() {
    requestAnimationFrame(parallax);

    var backSpeed = 0.09;
    var currentScrollY = latestKnownScrollY;

    document.getElementById('p0').style.top = -currentScrollY * (0 * backSpeed) + 'px';
    document.getElementById('p1').style.top = -currentScrollY * (1 * backSpeed) + 'px';
    document.getElementById('p2').style.top = -currentScrollY * (2 * backSpeed) + 'px';
    document.getElementById('p3').style.top = -currentScrollY * (3 * backSpeed) + 'px';
    document.getElementById('p4').style.top = -currentScrollY * (4 * backSpeed) + 'px';
    document.getElementById('p5').style.top = -currentScrollY * (5 * backSpeed) + 'px';
    document.getElementById('p6').style.top = -currentScrollY * (6 * backSpeed) + 'px';
    document.getElementById('p7').style.top = -currentScrollY * (7 * backSpeed) + 'px';
    document.getElementById('pb').style.top = (-currentScrollY * (7 * backSpeed)) + 'px';

    var bgStart = 100;
    var bgTrans = 240;
    var trans = 0.94;
    var bgColor = 'rgba(12,32,34,';
    var head = document.getElementById('top');

    if (currentScrollY < bgStart)
        head.style.backgroundColor = bgColor + 0 + ')';
    else if (currentScrollY >= bgStart && currentScrollY <= bgTrans)
        head.style.backgroundColor = bgColor + (trans * (currentScrollY - bgStart) / (bgTrans - bgStart)) + ')';
    else
        head.style.backgroundColor = bgColor + trans + ')';

}

function updateNavBar() {
    requestAnimationFrame(updateNavBar);
    var currentScrollY = latestKnownScrollY;

    var off = 100;
    var sections = ['bio', 'skills', 'projects', 'interests', 'resume', 'contact'];
    for (var i = 0; i < sections.length - 1; i++) {
        if (currentScrollY + off > document.getElementById(sections[i]).offsetTop &&
            currentScrollY + off < document.getElementById(sections[i + 1]).offsetTop) {
            for (var elem in sections) {
                document.getElementById(sections[elem] + '-link').classList.remove('active');
            }
            document.getElementById(sections[i] + '-link').classList.add('active');
        }
    }
}


function onScroll(evt) {
    latestKnownScrollY = window.scrollY;
}

window.addEventListener('scroll', onScroll);

requestAnimationFrame(parallax);
requestAnimationFrame(updateNavBar);