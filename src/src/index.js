require('./styles.scss');

var Flickity = require('flickity');
require('flickity-imagesloaded');

var $carousels = new Array();

// Modals

var rootEl = document.documentElement;
var $modals = getAll('.modal');
var $modalTriggers = getAll('.modal-trigger');
var $modalCloses = getAll('.modal-card-head .delete, .modal-card-foot .button');

if ($modalTriggers.length > 0) {
    $modalTriggers.forEach(function ($el) {
        $el.addEventListener('click', function () {
            var target = $el.dataset.target;
            openModal(target);
        });
    });
}

if ($modalCloses.length > 0) {
    $modalCloses.forEach(function ($el) {
        $el.addEventListener('click', function () {
            closeModals();
        });
    });
}

function openModal(target) {
    var $target = document.getElementById(target);
    rootEl.classList.add('is-clipped');
    $target.classList.add('is-active');
    var carouselId = target + '-carousel';

    if (document.querySelector('#' + carouselId)) {
        // Initialize each carousel one time only
        if ($carousels.length === 0) {
            $carousels.push(initCarousel(carouselId).on('change', function(index) {pauseVideos();}));
        }
        else {
            var index = $carousels.findIndex(c => c.element.id == carouselId);
            if (index === -1) {
                $carousels.push(initCarousel(carouselId).on('change', function(index) {pauseVideos();}));
            }
        }
    }
}

function closeModals() {
    rootEl.classList.remove('is-clipped');
    pauseVideos();
    $modals.forEach(function ($el) {
        $el.classList.remove('is-active');
    });
}

// Functions
function pauseVideos() {
    document.getElementById('dsapp-vid').pause();
    document.getElementById('anima-vid').pause();
    document.getElementById('amentia-vid').pause();
    document.getElementById('apocalypse-vid').pause();
    document.getElementById('solar-vid').pause();
    document.getElementById('rogue-vid').pause();
    document.getElementById('agar-vid').pause();
    document.getElementById('AI-vid').pause();
    return;
}

function initCarousel(id) {
    return new Flickity('#' + id, {
        imagesLoaded: true,
        adaptiveHeight: true // https://github.com/metafizzy/flickity/issues/11
    });
}

function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}
