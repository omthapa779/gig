document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
  };

  try {
    const res = await fetch('/api/company/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include', // ensure cookie is stored
    });

    const result = await res.json();
    const message = document.getElementById('message');

    if (res.ok) {
      message.textContent = 'Login successful! Redirecting...';
      message.style.color = 'green';
      setTimeout(() => {
        window.location.href = '/company/profile';
      }, 800);
    } else {
      message.textContent = result.message || 'Invalid credentials';
      message.style.color = 'red';
    }
  } catch (err) {
    const message = document.getElementById('message');
    message.textContent = 'Network error. Try again.';
    message.style.color = 'red';
  }
});
