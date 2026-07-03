const searchInput = document.getElementById('searchInput');
const cards = Array.from(document.querySelectorAll('.card'));
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const authMessage = document.getElementById('authMessage');
const authCard = document.getElementById('authCard');
const authNavLink = document.getElementById('authNavLink');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

function renderAuthState() {
  const session = window.OdyolojiAuth.getSession();

  if (session && session.loggedIn) {
    authCard.classList.add('is-logged-in');
    authCard.innerHTML = `
      <p>Hoş geldiniz, <strong>${session.displayName}</strong>.</p>
      <p>Artık bu sayfaya giriş yaptınız.</p>
      <button id="logoutButton" type="button">Çıkış yap</button>
    `;
    authNavLink.textContent = 'Çıkış Yap';
    authNavLink.href = '#';
  } else {
    authCard.classList.remove('is-logged-in');
    authCard.innerHTML = `
      <form id="loginForm" class="login-form">
        <label>
          Kullanıcı adı
          <input id="usernameInput" type="text" placeholder="dilan" required />
        </label>
        <label>
          Şifre
          <input id="passwordInput" type="password" placeholder="odyoloji2026" required />
        </label>
        <button type="submit">Giriş yap</button>
      </form>
      <div id="authMessage" class="auth-message" aria-live="polite"></div>
    `;
    authNavLink.textContent = 'Giriş Yap';
    authNavLink.href = '#giris';
  }

  const freshLoginForm = document.getElementById('loginForm');
  if (freshLoginForm) {
    freshLoginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('usernameInput').value;
      const password = document.getElementById('passwordInput').value;
      const result = window.OdyolojiAuth.authenticate(username, password);
      const messageElement = document.getElementById('authMessage');
      if (messageElement) {
        messageElement.textContent = result.message;
      }

      if (result.success) {
        renderAuthState();
      }
    });
  }

  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      window.OdyolojiAuth.clearSession();
      renderAuthState();
    });
  }
}

renderAuthState();
