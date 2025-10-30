/* app.js - interactive behavior for the landing page
   Replace placeholders (GitHub URL, deployed URL, wireframe image) as needed.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Epic toggles (expand/collapse)
  document.querySelectorAll('.epic-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const ul = btn.nextElementSibling;
      if (ul) {
        ul.style.display = expanded ? 'none' : 'block';
      }
    });
  });

  // Modal system (simple)
  const modalRoot = document.getElementById('modal-root');

  function openModal(title, html) {
    modalRoot.innerHTML = '';
    modalRoot.setAttribute('aria-hidden', 'false');

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.tabIndex = -1;

    modal.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true">
        <h3>${title}</h3>
        <div class="modal-body">${html}</div>
        <button class="btn close-modal">Close</button>
      </div>
    `;

    modalRoot.appendChild(modal);

    // close handlers
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (ev) => {
      if (ev.target === modal) closeModal();
    });

    function closeModal() {
      modalRoot.innerHTML = '';
      modalRoot.setAttribute('aria-hidden', 'true');
    }
  }

  // Wire up open-modal buttons
  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.modal || 'overview-more';
      if (id === 'overview-more') {
        openModal('More about WeatherNow', `
          <p><strong>Tech choices:</strong> HTML, CSS, Vanilla JS — simple, lightweight and easy to grade.</p>
          <p><strong>API:</strong> OpenWeatherMap (replace the demo key with your own in code).</p>
          <p><strong>Testing:</strong> Manual test cases included: valid city, invalid city, network error, loading state.</p>
        `);
      }
    });
  });

  // Demo fetch (non-authenticated demo using a free open endpoint)
  const demoBtn = document.getElementById('demoFetch');
  const demoCity = document.getElementById('demoCity');
  const demoResult = document.getElementById('demoResult');

  demoBtn.addEventListener('click', async () => {
    const city = demoCity.value.trim() || 'Chicago';
    demoResult.textContent = 'Loading…';
    try {
      // NOTE: This demo uses a public sample endpoint that may not exist for your final app.
      // For the real app replace with your API + key.
      const apiKey = 'd68913cdbf891b671d7a9d53e5b0c3bf'; // replace before final demo
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
      if (!res.ok) {
        demoResult.textContent = 'City not found or API key missing.';
        return;
      }
      const data = await res.json();
      demoResult.innerHTML = `
        <strong>${data.name}, ${data.sys.country}</strong><br>
        Temp: ${data.main.temp}°C • Humidity: ${data.main.humidity}% • ${data.weather[0].description}
      `;
    } catch (err) {
      console.error(err);
      demoResult.textContent = 'Network or CORS error. Use localhost or proper API key.';
    }
  });

  // Simple accessible keyboard shortcut: press "?" to open overview modal
  document.addEventListener('keydown', (e) => {
    if (e.key === '?') {
      e.preventDefault();
      const btn = document.querySelector('.open-modal');
      if (btn) btn.click();
    }
  });

  // Replace placeholders with values stored in dataset (if any)
  // Example: in production you might inject these via a simple script or server-side
  const gh = document.getElementById('github-url');
  const deployment = document.getElementById('deployed-url');
  if (gh && gh.dataset.href) gh.href = gh.dataset.href;
  if (deployment && deployment.dataset.href) deployment.href = deployment.dataset.href;
});
