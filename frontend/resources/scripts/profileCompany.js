const form = document.getElementById('profileForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const res = await fetch('/api/company/profile', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    message.textContent = result.message;
    message.style.color = res.ok ? 'green' : 'red';
  } catch (err) {
    message.textContent = 'Error saving profile.';
    message.style.color = 'red';
  }
});
