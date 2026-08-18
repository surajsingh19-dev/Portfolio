const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const navLinks = navigation.querySelectorAll('a');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  navigation.classList.toggle('open', !open);
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('.form-status').textContent = 'This sample form is ready to connect to your preferred form service.';
});
