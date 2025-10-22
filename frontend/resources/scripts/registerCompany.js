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
    address: document.getElementById('address').value.trim(),
    website: document.getElementById('website').value.trim(),
    description: document.getElementById('description').value.trim(),
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
    } else {
      messageBox.style.color = 'red';
      messageBox.textContent = result.message || 'Registration failed';
    }
  } catch (err) {
    messageBox.style.color = 'red';
    messageBox.textContent = 'Network error. Please try again.';
  }
});
