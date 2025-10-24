const form = document.getElementById('signupFreelancer');
const messageBox =  document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageBox.textContent = 'Processing...';

    const data ={
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
    };

    try{
        const res = await fetch('/api/freelancer/freelancerRegister', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include', // keeps cookies (future auth)
        });
        
        const result = await res.json();

        if(res.ok){
            messageBox.style.color = 'green';
            messageBox.textContent = result.message;
            form.reset();

            // redirect to login so the user can sign in
            setTimeout(() => {window.location.href = '/freelancer/login';}, 900);
        } else {
            messageBox.style.color = 'red';
            messageBox.textContent = result.message || 'Registration failed';
        }

    } catch(err){
        messageBox.style.color = 'red';
        messageBox.textContent = 'Network error. Please try again.';
    }
});