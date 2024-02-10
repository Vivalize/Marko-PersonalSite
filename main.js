let latestKnownScrollY
let scheduledAnimationFrame = false

const parallaxArt = []
const numArt = 8
let distance = -5
let distanceMultiplier = 1.5
const perspective = 10
for (let i = numArt - 1; i >= 0; i--) {
    const elem = document.getElementById('p'+i)
    const transZ = distance + 'px'
    const scale = 1 + (distance / (-1 * perspective))
    const transY = -1 * (50 - (50 / scale)) + 'vh'
    elem.style.transform = 'translateZ(' + transZ + ') scale(' + scale + ') translateY(' + transY + ')'
    parallaxArt.push(elem)
    distance *= distanceMultiplier
}
const pb = document.getElementById('pb')
const head = document.getElementById('top')
const sections = ['bio', 'skills', 'projects', 'interests', 'resume', 'contact'];
const sectionDivs = []
const sectionLinks = []
for (let sec in sections) {
    sectionDivs.push(document.getElementById(sections[sec]))
    sectionLinks.push(document.getElementById(sections[sec]+'-link'))
}

function parallax() {
    const backSpeed = 0.09
    const currentScrollY = latestKnownScrollY

    const bgStart = 100
    const bgTrans = 240
    const trans = 0.94
    const bgColor = 'rgba(12,32,34,'

    if (currentScrollY < bgStart) {
        head.style.backgroundColor = bgColor + 0 + ')'
    } else if (currentScrollY >= bgStart && currentScrollY <= bgTrans) {
        head.style.backgroundColor = bgColor + (trans * (currentScrollY - bgStart) / (bgTrans - bgStart)) + ')'
    } else {
        head.style.backgroundColor = bgColor + trans + ')'
    }

}

function updateNavBar() {
    const off = 200;
    for (let i = 0; i < sections.length - 1; i++) {
        if (latestKnownScrollY + off > sectionDivs[i].offsetTop &&
            latestKnownScrollY + off < sectionDivs[i+1].offsetTop) {
            for (let sl in sectionLinks) {
                sectionLinks[sl].classList.remove('active')
            }
            sectionLinks[i].classList.add('active')
        }
    }
}

function onScroll (e) {
    latestKnownScrollY = parallaxElem.scrollTop
    if (scheduledAnimationFrame) return
    scheduledAnimationFrame = true
    requestAnimationFrame(updatePage)
}

function updatePage( ) {
    parallax()
    updateNavBar()
    scheduledAnimationFrame = false
}

const parallaxElem = document.getElementById('parallax')
parallaxElem.addEventListener('scroll', onScroll, false )