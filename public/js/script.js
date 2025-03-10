/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

'use strict';

/**
 * Custom Module
 */

import { addEventOnElements } from './utils.js';

/**
 * Search clear functionality
 */

const /** {HTMLElement} */ $searchField = document.querySelector(
    '[data-search-field]'
  );
const /** {HTMLElement} */ $searchClear = document.querySelector(
    '[data-search-clear]'
  );

$searchClear?.addEventListener('click', function () {
  $searchField.value = '';
});

/**
 * Logo Animate in mobile
 */

const /** {HTMLElement} */ $logo = document.querySelector('[data-logo]');

if (!sessionStorage.getItem('logoAnimated')) {
  $logo.classList.add('animate');
  sessionStorage.setItem('logoAnimated', true);
}

/**
 * Menu toggle
 */

const /** {HTMLElement} */ $menuWrapper = document.querySelector(
    '[data-menu-wrapper]'
  );
const /** {HTMLElement} */ $menuToggler = document.querySelector(
    '[data-menu-toggler]'
  );

$menuToggler?.addEventListener('click', function () {
  $menuWrapper.classList.toggle('active');
});

/**
 * Hide top bar on scroll down
 */

const /** {HTMLElement} */ $page = document.querySelector('[data-page]');

let /** {number} */ lastScrollPosition = 0;

$page?.addEventListener('scroll', function () {
  if (lastScrollPosition < this.scrollTop) {
    this.classList.add('header-hide');
  } else {
    this.classList.remove('header-hide');
  }
  lastScrollPosition = this.scrollTop;
});

/**
 * Ripple effect
 */

const ripple = function ($rippleElement) {
  $rippleElement.addEventListener('pointerdown', function (event) {
    event.stopImmediatePropagation();

    const /** {HTMLElement} */ $ripple = document.createElement('div');
    $ripple.classList.add('ripple');
    this.appendChild($ripple);

    const removeRipple = () => {
      $ripple.animate(
        {
          opacity: 0,
        },
        { fill: 'forwards', duration: 200 }
      );

      setTimeout(() => {
        $ripple.remove();
      }, 1000);
    };

    this.addEventListener('pointerup', removeRipple);
    this.addEventListener('pointerleave', removeRipple);

    const /** {number} */ rippleSize = Math.max(
        this.clientWidth,
        this.clientHeight
      );

    $ripple.style.top = `${event.layerY}px`;
    $ripple.style.left = `${event.layerX}px`;
    $ripple.style.width = `${rippleSize}px`;
    $ripple.style.height = `${rippleSize}px`;
  });
};

const /** {HTMLElement} */ $rippleElement =
    document.querySelectorAll('[data-ripple]');
$rippleElement?.forEach((item) => {
  ripple(item);
});

/**
 * Image animation on loading
 */

window.addEventListener('DOMContentLoaded', function () {
  const /** {Array<HTMLElement>} */ $animatedImages = document.querySelectorAll(
      '[data-image-load-anim]'
    );

  const addAnimation = function () {
    this.animate(
      {
        opacity: 1,
      },
      {
        duration: 200,
        fill: 'forwards',
      }
    );
  };

  $animatedImages.forEach(($image) => {
    $image.style.opacity = 0;

    if ($image.complete) {
      addAnimation.call($image);
    } else {
      $image.addEventListener('load', addAnimation);
    }
  });
});

/**
 * Bottom nav item active
 */

const /** {Array<HTMLElement>} */ $bottomNavItems = document.querySelectorAll(
    '[data-bottom-nav_item]'
  );

const /** {HTMLElement} */ $activeBottomNavItem = document.querySelector(
    '[data-bottom-nav_item].active'
  );

const activeNavItem = function () {
  $activeBottomNavItem?.classList.remove('active');
  this.classList.add('active');
};

$bottomNavItems && addEventOnElements($bottomNavItems, 'click', activeNavItem);
