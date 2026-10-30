/* Progressive enhancement: content and links remain usable without JavaScript. */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const appBase = new URL('.', document.currentScript?.src || $('script[src$="app.js"]').src);
const media = name => new URL(`assets/images/${name}`, appBase).href;
const menuButton = $('.menu-toggle'), nav = $('#navigation');
function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); $('span', menuButton).textContent = '+'; }
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open)); $('span', menuButton).textContent = open ? '−' : '+';
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 768px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const search = $('#menu-search');
let category = 'all';
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function filterMenu() {
  const query = normalize(search.value.trim()); let count = 0;
  $$('.menu-category').forEach(section => {
    let sectionCount = 0;
    $$('.menu-item', section).forEach(item => {
      const show = (category === 'all' || section.dataset.menuCategory === category) && normalize(item.dataset.search).includes(query);
      item.hidden = !show; if (show) sectionCount++;
    });
    section.hidden = sectionCount === 0; count += sectionCount;
  });
  $('.no-results').hidden = count > 0;
  $('.results-message').textContent = `${count} menu ${count === 1 ? 'item' : 'items'} found.`;
}
if (search) {
  search.addEventListener('input', filterMenu);
  $$('[data-category]').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    $$('[data-category]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    filterMenu();
  }));
  const categoryAliases = {coffee:'Café', bakery:'Panadería', juice:'Jugos', energy:'Energy'};
  const requested = new URLSearchParams(location.search).get('category');
  const match = categoryAliases[requested];
  if (match) {
    const button = $$('[data-category]').find(b => b.dataset.category.toLowerCase().includes(match.toLowerCase()));
    button?.click();
  }
  $('.reset-filters').addEventListener('click', () => { search.value = ''; $('[data-category="all"]').click(); search.focus(); });
}

const photos = $$('.gallery-photo'), dialog = $('#photo-dialog'); let photoIndex = 0;
function showPhoto(index) {
  photoIndex = (index + photos.length) % photos.length;
  const photo = $('img', photos[photoIndex]);
  $('#dialog-image').src = photo.src; $('#dialog-image').alt = photo.alt;
  $('#photo-caption').textContent = photo.alt;
}
photos.forEach((button, i) => button.addEventListener('click', () => { showPhoto(i); dialog.showModal(); }));
$('.dialog-close').addEventListener('click', () => dialog.close());
$('.photo-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
$('.photo-next').addEventListener('click', () => showPhoto(photoIndex + 1));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(photoIndex + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(photoIndex - 1); }
});
dialog.addEventListener('close', () => photos[photoIndex]?.focus());

const contact = $('#contact-form');
function emailDraft(subject, body) { window.location.href = `mailto:info@hechoencafex.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; }
if (contact) {
  if (new URLSearchParams(location.search).get('subject') === 'Catering') contact.elements.message.value = 'Hi Café X! I’m interested in catering for an upcoming event.\n\nDate:\nLocation:\nNumber of guests:\nDetails:\n';
  contact.addEventListener('submit', event => {
    event.preventDefault(); const data = new FormData(contact);
    emailDraft('Hello Café X', `Name: ${data.get('first-name')} ${data.get('last-name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
    $('#contact-status').textContent = 'Your email draft is ready. Review and send it in your email app. If it didn’t open, email info@hechoencafex.com directly.';
  });
}
$('#notify-form')?.addEventListener('submit', event => {
  event.preventDefault(); emailDraft('Café X shop updates', `Please let me know when the Café X shop opens.\nEmail: ${$('#notify-email').value}`);
  $('#notify-status').textContent = 'Review and send the request in your email app. Your email has not been added to a mailing list automatically.';
});
