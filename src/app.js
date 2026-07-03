const searchInput = document.getElementById('searchInput');
const cards = Array.from(document.querySelectorAll('.card'));

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  });
}
