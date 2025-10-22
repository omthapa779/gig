// =============================
// profileCompany.js
// =============================

document.addEventListener('DOMContentLoaded', async () => {
    let initialLoad = true; // prevent autosave while we populate fields

    // 1️⃣ Load existing data for the logged-in company
    try {
        const res = await fetch('/api/company/profile/data', { credentials: 'include' });
        if (!res.ok) {
        alert('Please log in again');
        window.location.href = '/company/login';
        return;
        }

        const data = await res.json();
        const c = data.company;

        document.getElementById('companyName').textContent = c.companyName;
        document.getElementById('name').value = c.companyName || '';
        document.getElementById('industry').value = c.industry || '';
        document.getElementById('size').value = c.size || '';
        document.getElementById('about').value = c.about || '';
        document.getElementById('website').value = c.website || '';
        document.getElementById('location').value = c.location || '';

    } catch (err) {
        console.error('Profile load error:', err);
    } finally {
        initialLoad = false; // now allow autosave
    }

    // 2️⃣ Save profile manually on submit
    const form = document.getElementById('profileForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        // if no keys other than possibly the file are present, avoid silent success
        const hasFields = Array.from(formData.keys()).some(k => k && (k !== 'logo' || formData.get('logo').size > 0));
        if (!hasFields) {
            const msg = document.getElementById('message');
            msg.textContent = 'No changes to save.';
            msg.style.color = 'gray';
            return;
        }

        try {
        const res = await fetch('/api/company/profile', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        const result = await res.json();
        const msg = document.getElementById('message');
        if (res.ok) {
            msg.textContent = result.message || 'Profile updated successfully.';
            msg.style.color = 'green';
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

    const inputs = document.querySelectorAll('#profileForm input, #profileForm textarea, #profileForm select');
    inputs.forEach((i) =>
    i.addEventListener('change', () => {
        if (initialLoad) return; // ignore changes while loading
        if (i.value && i.value.trim() !== '') {
        document.getElementById('profileForm').dispatchEvent(new Event('submit'));
        }
    })
    );
});
