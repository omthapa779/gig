document.addEventListener('DOMContentLoaded', async () => {
  let initialLoad = true;

  // load existing data
  try {
    const res = await fetch('/api/freelancer/profile/data', { credentials: 'include' });
    if (!res.ok) {
      alert('Please log in');
      window.location.href = '/freelancer/login';
      return;
    }
    const data = await res.json();
    const f = data.freelancer;

    document.getElementById('fullNameDisplay').textContent = f.fullName || '';
    document.getElementById('fullName').value = f.fullName || '';
    document.getElementById('DOB').value = f.DOB ? new Date(f.DOB).toISOString().slice(0,10) : '';
    document.getElementById('location').value = f.location || '';
    document.getElementById('bio').value = f.bio || '';
    document.getElementById('portfolio').value = f.portfolio || '';
    document.getElementById('resume').value = f.resume || '';
    document.getElementById('skills').value = Array.isArray(f.skills) ? f.skills.join(', ') : (f.skills || '');

  } catch (err) {
    console.error('Profile load error:', err);
  } finally {
    initialLoad = false;
  }

  const form = document.getElementById('profileForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const hasFields = Array.from(formData.keys()).some(k => k && (k !== 'profile_picture' || (formData.get('profile_picture') && formData.get('profile_picture').size > 0)));
    if (!hasFields) {
      const msg = document.getElementById('message');
      msg.textContent = 'No changes to save.';
      msg.style.color = 'gray';
      return;
    }

    try {
      const res = await fetch('/api/freelancer/profile', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      const result = await res.json();
      const msg = document.getElementById('message');
      if (res.ok) {
        msg.textContent = result.message || 'Profile updated successfully.';
        msg.style.color = 'green';
        // update display name
        if (result.freelancer && result.freelancer.fullName) {
          document.getElementById('fullNameDisplay').textContent = result.freelancer.fullName;
        }
      } else {
        msg.textContent = result.message || 'Failed to update profile.';
        msg.style.color = 'red';
      }
    } catch (err) {
      console.error('Save error:', err);
      const msg = document.getElementById('message');
      msg.textContent = 'Network error while saving.';
      msg.style.color = 'red';
    }
  });

  const inputs = document.querySelectorAll('#profileForm input, #profileForm textarea');
  inputs.forEach((i) =>
    i.addEventListener('change', () => {
      if (initialLoad) return;
      // debounce auto-save could be added; here just auto-submit on change if non-empty
      if (i.value && String(i.value).trim() !== '') {
        form.dispatchEvent(new Event('submit'));
      }
    })
  );

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/freelancer/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/freelancer/login';
    });
  }
});