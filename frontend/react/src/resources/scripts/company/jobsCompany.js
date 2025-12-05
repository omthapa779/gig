document.addEventListener('DOMContentLoaded', async () => {
  const jobForm = document.getElementById('jobForm');
  const jobMessage = document.getElementById('jobMessage');
  const jobList = document.getElementById('jobList');
  const fileInput = document.getElementById('jobAttachments');
  const attachmentsPreview = document.getElementById('attachmentsPreview');
  const existingAttachmentsContainer = document.getElementById('existingAttachments');

  // keep track of files user selected (incremental)
  let selectedFiles = []; // File objects
  let currentEditingJobAttachments = []; // existing attachments URLs when editing

  async function fetchJobs() {
    const r = await fetch('/api/company/jobs', { credentials: 'include' });
    if (!r.ok) return [];
    const d = await r.json();
    return d.jobs || [];
  }

  function truncate(s, n) { return s && s.length > n ? s.slice(0, n) + '...' : s || '—'; }
  function escapeHtml(str) { if (!str) return ''; return String(str).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
  function isImage(filename) { return /\.(png|jpe?g|gif)$/i.test(filename); }

  function renderAttachments(job) {
    if (!job.attachments || !job.attachments.length) return '';
    const parts = job.attachments.map((p) => {
      const base = p.split('/').pop();
      if (isImage(base)) {
        return `<div class="attach-item" style="display:inline-block;margin-right:8px;text-align:center;">
                  <a href="${escapeHtml(p)}" target="_blank"><img src="${escapeHtml(p)}" alt="${escapeHtml(base)}" style="width:80px;height:60px;object-fit:cover;border-radius:4px;border:1px solid #ddd;"/></a>
                </div>`;
      } else {
        return `<div class="attach-item" style="display:inline-block;margin-right:8px;text-align:center;">
                  <a href="${escapeHtml(p)}" target="_blank" style="display:block;padding:8px;border:1px solid #ddd;border-radius:4px;background:#fafafa;width:120px;height:60px;">
                    <div style="font-size:12px;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(base)}</div>
                  </a>
                </div>`;
      }
    });
    return `<div style="margin-top:8px;">${parts.join('')}</div>`;
  }

  function renderJobs(jobs) {
    jobList.innerHTML = '';
    if (!jobs.length) { jobList.innerHTML = '<p>No active jobs.</p>'; return; }
    jobs.forEach(j => {
      const div = document.createElement('div');
      div.style = j.isPhysical
        ? 'border:2px solid #c66; padding:12px; margin-bottom:10px; border-radius:6px; background:#fff6f6;'
        : 'border:1px solid #ddd; padding:12px; margin-bottom:10px; border-radius:6px;';
      div.innerHTML = `
        <strong>${escapeHtml(j.title)}</strong> ${j.isPhysical ? '<span style="background:#c66;color:#fff;padding:3px 6px;border-radius:4px;margin-left:8px;">On‑site</span>' : '<small style="color:#666">('+escapeHtml(j.category||'—')+')</small>'}
        <div style="margin-top:6px;">${escapeHtml(truncate(j.description, 300))}</div>
        <div style="margin-top:8px;">
          <span>Pay: ${escapeHtml(j.pay||'—')}</span>
          <span style="margin-left:12px;">Deadline: ${j.deadline ? new Date(j.deadline).toLocaleDateString() : '—'}</span>
          ${j.isPhysical ? `<span style="margin-left:12px;">Location: ${escapeHtml(j.location||'—')}</span>` : ''}
        </div>
        <div style="margin-top:8px;">
          <button data-id="${j._id}" class="editBtn" style="margin-right:8px;">Edit</button>
          ${j.attachments && j.attachments.length ? '<span style="margin-left:8px;">Attachments:</span>' : ''}
          ${renderAttachments(j)}
        </div>
      `;
      jobList.appendChild(div);
    });
  }

  // show selectedFiles preview (new files)
  function renderSelectedFilesPreview() {
    attachmentsPreview.innerHTML = '';
    if (!selectedFiles.length) return;
    selectedFiles.forEach((file, idx) => {
      const base = file.name;
      const readerContainer = document.createElement('div');
      readerContainer.style = 'display:inline-block;margin-right:8px;text-align:center;';

      if (isImage(base)) {
        const img = document.createElement('img');
        img.style = 'width:80px;height:60px;object-fit:cover;border-radius:4px;border:1px solid #ddd;';
        const reader = new FileReader();
        reader.onload = (e) => img.src = e.target.result;
        reader.readAsDataURL(file);
        readerContainer.appendChild(img);
      } else {
        const box = document.createElement('div');
        box.style = 'display:block;padding:8px;border:1px solid #ddd;border-radius:4px;background:#fafafa;width:120px;height:60px;';
        box.textContent = base;
        readerContainer.appendChild(box);
      }

      const btn = document.createElement('div');
      btn.style = 'font-size:12px;margin-top:4px;';
      btn.innerHTML = `<button data-idx="${idx}" class="removeSelectedFileBtn" style="font-size:11px;">Remove</button>`;
      readerContainer.appendChild(btn);
      attachmentsPreview.appendChild(readerContainer);
    });
  }

  // existing attachments (URLs) preview when editing — includes delete buttons
  function renderExistingAttachmentsList(urls, jobId) {
    existingAttachmentsContainer.innerHTML = '';
    if (!urls || !urls.length) return;
    urls.forEach((p) => {
      const base = p.split('/').pop();
      const wrap = document.createElement('div');
      wrap.style = 'display:inline-block;margin-right:8px;text-align:center;';
      if (isImage(base)) {
        const a = document.createElement('a');
        a.href = p; a.target = '_blank';
        const img = document.createElement('img');
        img.src = p; img.style = 'width:80px;height:60px;object-fit:cover;border-radius:4px;border:1px solid #ddd;';
        a.appendChild(img);
        wrap.appendChild(a);
      } else {
        const a = document.createElement('a');
        a.href = p; a.target = '_blank';
        a.style = 'display:block;padding:8px;border:1px solid #ddd;border-radius:4px;background:#fafafa;width:120px;height:60px;';
        a.textContent = base;
        wrap.appendChild(a);
      }
      const btn = document.createElement('div');
      btn.style = 'font-size:12px;margin-top:4px;';
      btn.innerHTML = `<button data-job="${jobId}" data-filename="${encodeURIComponent(base)}" class="removeExistingAttachBtn" style="font-size:11px;">Remove</button>`;
      wrap.appendChild(btn);
      existingAttachmentsContainer.appendChild(wrap);
    });
  }

  // load initial jobs
  try {
    const jobs = await fetchJobs();
    renderJobs(jobs);
  } catch (err) { console.error('Load jobs error:', err); }

  // prefill when ?edit=ID in url
  const params = new URLSearchParams(window.location.search);
  const editId = params.get('edit');
  if (editId) {
    try {
      const jobs = await fetchJobs();
      const job = jobs.find(j => j._id === editId);
      if (job) {
        document.getElementById('editJobId').value = job._id;
        document.getElementById('jobTitle').value = job.title || '';
        document.getElementById('jobCategory').value = job.category || '';
        document.getElementById('jobDescription').value = job.description || '';
        document.getElementById('jobPay').value = job.pay || '';
        document.getElementById('jobDeadline').value = job.deadline ? new Date(job.deadline).toISOString().slice(0,10) : '';
        document.getElementById('jobIsPhysical').checked = !!job.isPhysical;
        document.getElementById('jobLocation').value = job.location || '';
        // show existing attachments for removal (if any)
        currentEditingJobAttachments = job.attachments || [];
        renderExistingAttachmentsList(currentEditingJobAttachments, job._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) { console.error('Prefill error:', err); }
  }

  // file input: incremental add, maintain selectedFiles array
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    for (const f of files) {
      if (selectedFiles.length >= 5) break;
      // avoid duplicates by name+size
      const exists = selectedFiles.some(x => x.name === f.name && x.size === f.size);
      if (!exists) selectedFiles.push(f);
    }
    // clear native input so user can pick more files in next interaction
    fileInput.value = '';
    renderSelectedFilesPreview();
  });

  // remove a selected (new) file before upload
  attachmentsPreview.addEventListener('click', (ev) => {
    if (!ev.target.classList.contains('removeSelectedFileBtn')) return;
    const idx = Number(ev.target.getAttribute('data-idx'));
    if (!isNaN(idx)) {
      selectedFiles.splice(idx, 1);
      renderSelectedFilesPreview();
    }
  });

  // remove existing attachment (server-side)
  existingAttachmentsContainer.addEventListener('click', async (ev) => {
    if (!ev.target.classList.contains('removeExistingAttachBtn')) return;
    const jobId = ev.target.getAttribute('data-job');
    const filename = decodeURIComponent(ev.target.getAttribute('data-filename'));
    if (!confirm('Remove this existing attachment?')) return;
    try {
      const r = await fetch(`/api/company/jobs/${jobId}/attachments?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const j = await r.json();
      if (r.ok) {
        // refresh existing attachments preview and job list
        currentEditingJobAttachments = j.attachments || [];
        renderExistingAttachmentsList(currentEditingJobAttachments, jobId);
        const fresh = await fetchJobs();
        renderJobs(fresh);
      } else {
        alert(j.message || 'Failed to remove attachment');
      }
    } catch (err) {
      console.error('Remove existing attachment error:', err);
      alert('Network error while removing attachment');
    }
  });

  // submit handler (multipart if attachments)
  jobForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    jobMessage.textContent = '';
    const id = document.getElementById('editJobId').value;
    const isPhysical = document.getElementById('jobIsPhysical').checked;
    const locationVal = document.getElementById('jobLocation').value.trim();
    if (isPhysical && !locationVal) {
      jobMessage.style.color = 'red';
      jobMessage.textContent = 'Location is required for physical/on-site jobs.';
      return;
    }

    // build FormData to support files (use selectedFiles array)
    const fd = new FormData();
    fd.append('title', document.getElementById('jobTitle').value.trim());
    fd.append('category', document.getElementById('jobCategory').value.trim());
    fd.append('description', document.getElementById('jobDescription').value.trim());
    fd.append('pay', document.getElementById('jobPay').value.trim());
    if (document.getElementById('jobDeadline').value) fd.append('deadline', document.getElementById('jobDeadline').value);
    fd.append('isPhysical', isPhysical ? 'true' : 'false');
    fd.append('location', locationVal);

    if (selectedFiles.length) {
      if (selectedFiles.length > 5) {
        jobMessage.style.color = 'red';
        jobMessage.textContent = 'You can upload up to 5 files.';
        return;
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        fd.append('attachments', selectedFiles[i]);
      }
    }

    try {
      const url = id ? `/api/company/jobs/${id}` : '/api/company/jobs';
      const method = id ? 'PUT' : 'POST';
       const res = await fetch(url, {
        method,
        body: fd,
        credentials: 'include'
      });

      const contentType = (res.headers.get('content-type') || '').toLowerCase();
      let result;
      if (contentType.includes('application/json')) {
        result = await res.json();
      } else {
        const text = await res.text();
        console.error('Non-JSON response from server:', res.status, text);
        jobMessage.style.color = 'red';
        jobMessage.textContent = `Server error (${res.status})`;
        return;
      }
      if (res.ok) {
        jobMessage.style.color = 'green';
        jobMessage.textContent = result.message || (id ? 'Job updated' : 'Job posted');

        // reset form for new create when just created
        if (!id) {
          jobForm.reset();
          selectedFiles = [];
          attachmentsPreview.innerHTML = '';
          existingAttachmentsContainer.innerHTML = '';
          document.getElementById('editJobId').value = '';
        } else {
          // for edit: clear selectedFiles (new files) but keep existing attachments preview from server result
          selectedFiles = [];
          attachmentsPreview.innerHTML = '';
          currentEditingJobAttachments = result.job.attachments || [];
          renderExistingAttachmentsList(currentEditingJobAttachments, result.job._id);
        }

        // refresh job list
        const fresh = await fetchJobs();
        renderJobs(fresh);
      } else {
        jobMessage.style.color = 'red';
        jobMessage.textContent = result.message || 'Failed';
      }
    } catch (err) {
      console.error('Submit error:', err);
      jobMessage.style.color = 'red';
      jobMessage.textContent = 'Network error';
    }
  });

  // delegate edit clicks from jobList
  jobList.addEventListener('click', (ev) => {
    if (!ev.target.classList.contains('editBtn')) return;
    const id = ev.target.getAttribute('data-id');
    window.location.href = `/company/jobs?edit=${id}`;
  });

  // logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/company/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/company/login';
    });
  }
});