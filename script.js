(function(){
  'use strict';

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('primary-navigation');

  function closeNav(){
    if(!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  function openNav(){
    if(!nav || !toggle) return;
    nav.classList.add('is-open');
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var isOpen = nav.classList.contains('is-open');
      if(isOpen){ closeNav(); } else { openNav(); }
    });

    // close on link click (mobile)
    var navLinks = nav.querySelectorAll('a');
    for(var i=0;i<navLinks.length;i++){
      navLinks[i].addEventListener('click', closeNav);
    }

    // close on escape
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ closeNav(); }
    });

    // close if resized past the mobile breakpoint
    window.addEventListener('resize', function(){
      if(window.innerWidth >= 880){ closeNav(); }
    });

    // close on outside click
    document.addEventListener('click', function(e){
      var isOpen = nav.classList.contains('is-open');
      if(!isOpen) return;
      var clickedInsideNav = nav.contains(e.target);
      var clickedToggle = toggle.contains(e.target);
      if(!clickedInsideNav && !clickedToggle){ closeNav(); }
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(revealEls.length){
    if(reduceMotion || typeof IntersectionObserver === 'undefined'){
      revealEls.forEach ? revealEls.forEach(function(el){ el.classList.add('is-visible'); })
                         : [].forEach.call(revealEls, function(el){ el.classList.add('is-visible'); });
    } else {
      var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      [].forEach.call(revealEls, function(el){ observer.observe(el); });
    }
  }

  /* ---------- active nav link on scroll ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = nav ? nav.querySelectorAll('a[href^="#"]') : [];

  if(sections.length && navAnchors.length && typeof IntersectionObserver !== 'undefined'){
    var sectionObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        [].forEach.call(navAnchors, function(a){
          var match = a.getAttribute('href') === '#' + id;
          a.classList.toggle('is-active', match);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    [].forEach.call(sections, function(s){ sectionObserver.observe(s); });
  }
})();