document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
  };

  const res = await fetch('/api/company/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  const message = document.getElementById('message');

  if (res.ok) {
    message.textContent = 'Login successful! Redirecting...';
    message.style.color = 'green';
    setTimeout(() => {
      window.location.href = '/company/profile';
    }, 1500);
  } else {
    message.textContent = result.message || 'Invalid credentials';
    message.style.color = 'red';
  }
});
