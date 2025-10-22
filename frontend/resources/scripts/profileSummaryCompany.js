document.getElementById('editBtn').addEventListener('click', () => {
  window.location.href = '/company/profile/edit';
});

document.addEventListener('DOMContentLoaded', async () => {
  // include credentials so cookie is sent
  const res = await fetch('/api/company/me', { credentials: 'include' });

  if (!res.ok) {
    // not authenticated -> redirect to login
    window.location.href = '/company/login';
    return;
  }

  const data = await res.json();

  const c = data.company;
  const percent = data.completion;

  // fill data like before...
  document.getElementById('companyName').textContent = c.companyName;
  document.getElementById('industry').textContent = `Industry: ${c.industry || '—'}`;
  document.getElementById('size').textContent = `Company Size: ${c.size || '—'}`;
  document.getElementById('location').textContent = `location: ${c.location || '—'}`;
  document.getElementById('about').textContent = c.about || 'No description yet.';
  document.getElementById('email').textContent = `Email: ${c.email}`;
  document.getElementById('phone').textContent = `Phone: ${c.phone || '—'}`;
  document.getElementById('website').textContent = c.website || '—';
  if (c.logo) document.getElementById('companyLogo').src = c.logo;

  const editBtn = document.getElementById('editBtn');
  if (percent >= 100) {
    editBtn.style.display = 'none';
  }

  // show progress bar
  const progress = document.createElement('div');
  progress.className = 'progress-bar';
  progress.innerHTML = `
    <div class="bar" style="width:${percent}%;"></div>
    <span>${percent}% Complete</span>
  `;
  document.querySelector('.profile-summary').prepend(progress);

  // Logout handler
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/company/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/company/login';
    });
  }
});
