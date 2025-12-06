// Renders company profile + active jobs (no posting/edit form here)
document.getElementById('editBtn').addEventListener('click', () => {
  window.location.href = '/company/profile/edit';
});

document.addEventListener('DOMContentLoaded', async () => {
  // load company info
  const res = await fetch('/api/company/me', { credentials: 'include' });
  if (!res.ok) {
    window.location.href = '/company/login';
    return;
  }
  const data = await res.json();
  const c = data.company;
  const percent = data.completion;

  document.getElementById('companyName').textContent = c.companyName;
  document.getElementById('industry').textContent = `Industry: ${c.industry || '—'}`;
  document.getElementById('size').textContent = `Company Size: ${c.size || '—'}`;
  document.getElementById('location').textContent = `location: ${c.location || '—'}`;
  document.getElementById('about').textContent = c.about || 'No description yet.';
  document.getElementById('email').textContent = `Email: ${c.email}`;
  document.getElementById('phone').textContent = `Phone: ${c.phone || '—'}`;
  document.getElementById('website').textContent = c.website || '—';
  if (c.logo) document.getElementById('companyLogo').src = c.logo;

  // show completion progress
  const progress = document.createElement('div');
  progress.className = 'progress-bar';
  progress.innerHTML = `
    <div class="bar" style="width:${percent}%;"></div>
    <span>${percent}% Complete</span>
  `;
  document.querySelector('.profile-summary').prepend(progress);

  // Keep edit button visible — change label depending on completion
  const editBtn = document.getElementById('editBtn');
  if (editBtn) {
    editBtn.style.display = ''; // ensure visible
    editBtn.textContent = percent >= 100 ? 'Edit Profile' : 'Complete / Edit Profile';
  }

  // fetch and render active jobs
  async function fetchJobs() {
    const r = await fetch('/api/company/jobs', { credentials: 'include' });
    if (!r.ok) return [];
    const jd = await r.json();
    return jd.jobs || [];
  }

  function isImage(filename) { return /\.(png|jpe?g|gif)$/i.test(filename); }

  function renderAttachmentsInline(job) {
    if (!job.attachments || !job.attachments.length) return '';
    const parts = job.attachments.map((p) => {
      const base = p.split('/').pop();
      if (isImage(base)) {
        return `<a href="${escapeHtml(p)}" target="_blank" style="display:inline-block;margin-right:8px;">
                  <img src="${escapeHtml(p)}" alt="${escapeHtml(base)}" style="width:80px;height:60px;object-fit:cover;border-radius:4px;border:1px solid #ddd;"/>
                </a>`;
      } else {
        return `<a href="${escapeHtml(p)}" target="_blank" style="display:inline-block;margin-right:8px;text-decoration:none;">
                  <div style="display:block;padding:8px;border:1px solid #ddd;border-radius:4px;background:#fafafa;width:120px;height:60px;overflow:hidden;text-overflow:ellipsis;">
                    ${escapeHtml(base)}
                  </div>
                </a>`;
      }
    });
    return `<div style="margin-top:8px;">${parts.join('')}</div>`;
  }

  function renderJobs(jobs) {
    const container = document.getElementById('jobList');
    container.innerHTML = '';
    if (!jobs.length) {
      container.innerHTML = '<p>No active jobs posted yet.</p>';
      return;
    }
    jobs.forEach((j) => {
      const card = document.createElement('div');
      // highlight on-site jobs
      if (j.isPhysical) {
        card.style = 'border:2px solid #c66; padding:12px; margin-bottom:10px; border-radius:6px; background:#fff6f6;';
      } else {
        card.style = 'border:1px solid #ddd; padding:12px; margin-bottom:10px; border-radius:6px;';
      }

      const badge = j.isPhysical ? `<span style="background:#c66;color:#fff;padding:3px 6px;border-radius:4px;margin-left:8px;font-size:12px;">On‑site</span>` : `<small style="color:#666">(${escapeHtml(j.category || '—')})</small>`;

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <strong>${escapeHtml(j.title)}</strong> ${badge}
            <div style="margin-top:6px; color:#333;">${escapeHtml(truncate(j.description, 300))}</div>
            <div style="margin-top:8px; color:#444;">
              <span>Pay: ${escapeHtml(j.pay || '—')}</span>
              <span style="margin-left:12px;">Deadline: ${j.deadline ? new Date(j.deadline).toLocaleDateString() : '—'}</span>
              ${j.isPhysical ? `<span style="margin-left:12px;">Location: ${escapeHtml(j.location || '—')}</span>` : ''}
            </div>
            <div style="margin-top:8px;">
              <a href="/company/jobs?edit=${j._id}"><button>Edit</button></a>
              ${j.attachments && j.attachments.length ? '<span style="margin-left:8px;">Attachments:</span>' : ''}
              ${renderAttachmentsInline(j)}
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // small helpers
  function truncate(s, n) { return s && s.length > n ? s.slice(0, n) + '...' : s || '—'; }
  function escapeHtml(str) { if (!str) return ''; return String(str).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

  try {
    const jobs = await fetchJobs();
    renderJobs(jobs);
  } catch (err) {
    console.error('Jobs load error:', err);
  }

  // Logout handler
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/company/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/company/login';
    });
  }
});