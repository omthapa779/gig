document.getElementById('editBtn').addEventListener('click', () => {
  window.location.href = '/freelancer/profile/edit';
});

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/api/freelancer/me', { credentials: 'include' });
  if (!res.ok) {
    window.location.href = '/freelancer/login';
    return;
  }
  const data = await res.json();
  const f = data.freelancer;
  const percent = data.completion;

  document.getElementById('fullName').textContent = f.fullName || '—';
  document.getElementById('emailLine').textContent = `Email: ${f.email || '—'}`;
  document.getElementById('phoneLine').textContent = `Phone: ${f.phone || '—'}`;
  document.getElementById('locationLine').textContent = `Location: ${f.location || '—'}`;
  document.getElementById('dobLine').textContent = `DOB: ${f.DOB ? new Date(f.DOB).toLocaleDateString() : '—'}`;
  document.getElementById('bio').textContent = f.bio || 'No bio yet.';
  const skillsList = document.getElementById('skillsList');
  skillsList.innerHTML = '';
  if (Array.isArray(f.skills) && f.skills.length > 0) {
    f.skills.forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      skillsList.appendChild(li);
    });
  } else {
    skillsList.innerHTML = '<li>—</li>';
  }
  document.getElementById('portfolio').href = f.portfolio || '#';
  document.getElementById('portfolio').textContent = f.portfolio ? 'Portfolio' : '—';
  document.getElementById('resume').href = f.resume || '#';
  document.getElementById('resume').textContent = f.resume ? 'Resume' : '—';
  document.getElementById('contactEmail').textContent = `Email: ${f.email || '—'}`;
  document.getElementById('contactPhone').textContent = `Phone: ${f.phone || '—'}`;

  if (f.profile_picture) document.getElementById('profilePicture').src = f.profile_picture;

  // show completion percent
  const percentEl = document.getElementById('completionPercent');
  if (percentEl) percentEl.textContent = `${percent}%`;

  // Logout handler
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/freelancer/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/freelancer/login';
    });
  }
});