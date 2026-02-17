import './css/vendor/normalize.css';
import './css/blocks/navbar.css';
import './css/blocks/hero.css';
import './css/blocks/features.css';
import './css/blocks/benefits.css';
import './css/blocks/video.css';
import './css/blocks/faq.css';
import './css/blocks/footer.css';
import './css/index.css';

document.addEventListener('DOMContentLoaded', () => {
  // Lazy load YouTube iframe
  const videoContainers = document.querySelectorAll('.video__container[data-video-id]');
  videoContainers.forEach(container => {
    const playBtn = container.querySelector('.video__play-btn');
    const videoId = container.dataset.videoId;

    playBtn.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.className = 'video__iframe';
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = 'Video de presentación de OpositaTest';
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.width = '560';
      iframe.height = '315';
      iframe.loading = 'lazy';
      container.innerHTML = '';
      container.appendChild(iframe);
    });
  });

  //  Scroll animations
  const cards = document.querySelectorAll('.features__card');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  cards.forEach(card => observer.observe(card));

  //  Navbar transparency on scroll
  const navbar = document.querySelector('.navbar');
  const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

  window.addEventListener('scroll', () => {
    if (!isDesktop()) {
      navbar.classList.remove('navbar--scrolled');
      return;
    }
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 80);
  });

  navbar.addEventListener('mouseenter', () => {
    if (!isDesktop()) return;
    navbar.classList.remove('navbar--scrolled');
  });

  navbar.addEventListener('mouseleave', () => {
    if (!isDesktop()) return;
    if (window.scrollY > 80) navbar.classList.add('navbar--scrolled');
  });

  //  Dropdown menu
  const avatarBtn = document.querySelector('.navbar__avatar');
  const dropdown = document.getElementById('user-dropdown');

  if (avatarBtn && dropdown) {
    avatarBtn.addEventListener('click', () => {
      const isExpanded = avatarBtn.getAttribute('aria-expanded') === 'true';
      avatarBtn.setAttribute('aria-expanded', !isExpanded);
      dropdown.hidden = isExpanded;
    });

    document.addEventListener('click', e => {
      if (!avatarBtn.contains(e.target) && !dropdown.contains(e.target)) {
        avatarBtn.setAttribute('aria-expanded', 'false');
        dropdown.hidden = true;
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !dropdown.hidden) {
        avatarBtn.setAttribute('aria-expanded', 'false');
        dropdown.hidden = true;
        avatarBtn.focus();
      }
    });
  }
});
