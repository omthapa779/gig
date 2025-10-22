const form = document.getElementById('signupForm');
const messageBox = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  messageBox.textContent = 'Processing...';

  const data = {
    companyName: document.getElementById('companyName').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    phone: document.getElementById('phone').value.trim(),
    location: document.getElementById('location').value.trim(),
    website: document.getElementById('website').value.trim(),
  };

  try {
    const res = await fetch('/api/company/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include', // keeps cookies (future auth)
    });

    const result = await res.json();

    if (res.ok) {
      messageBox.style.color = 'green';
      messageBox.textContent = result.message;
      form.reset();
      // redirect to login so the user can sign in
      setTimeout(() => { window.location.href = '/company/login'; }, 900);
    } else {
      messageBox.style.color = 'red';
      messageBox.textContent = result.message || 'Registration failed';
    }
  } catch (err) {
    messageBox.style.color = 'red';
    messageBox.textContent = 'Network error. Please try again.';
  }
});
