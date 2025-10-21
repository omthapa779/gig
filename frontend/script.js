document.getElementById('checkBtn').addEventListener('click', async () => {
  const res = await fetch('/');
  if (res.ok) {
    alert('✅ Server Connected Successfully!');
  } else {
    alert('❌ Server Error');
  }
});
