

document.addEventListener('DOMContentLoaded', () => {
  setActiveSidebarLink();
  addCardHoverEffect();
});



function setActiveSidebarLink() {
  const menuLinks = document.querySelectorAll('.menu a');
  if (!menuLinks.length) return;

  // Get current file name (e.g. "index.html", "doctors.html")
  let path = window.location.pathname.split('/').pop();

  // If path is empty (served as "/"), treat as index.html
  if (!path) path = 'index.html';

  menuLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Remove existing active class
    link.classList.remove('active');

    // If href matches current path, mark this one active
    if (href === path) {
      link.classList.add('active');
    }
  });
}


 
function addCardHoverEffect() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.18s ease, box-shadow 0.18s ease';
      card.style.transform = 'translateY(-3px)';
      card.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.12)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '';
    });
  });
}
