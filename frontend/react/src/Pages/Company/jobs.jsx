import { useEffect } from "react"

export default function Jobs() {

    useEffect(() => {
        document.title = "Manage Jobs — Company | Gig";
    }, []);

    return(
        <div>
            <div className="jobs-container" style={{ maxWidth: '900px', margin: '20px auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Post / Edit Job</h2>
                    <div>
                        <a href="/company/profile"><button>Back to Profile</button></a>
                        <button id="logoutBtn">Logout</button>
                    </div>
                </div>

                <form id="jobForm" style={{ marginTop: '18px' }} encType="multipart/form-data">
                    <input type="hidden" id="editJobId" value="" />

                    <div>
                    <input
                        id="jobTitle"
                        name="title"
                        placeholder="Job title"
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                    </div>

                    <div style={{ marginTop: '8px' }}>
                    <input
                        id="jobCategory"
                        name="category"
                        placeholder="Category (e.g. Music, IT, Delivery)"
                        style={{ width: '48%', padding: '8px' }}
                    />
                    <input
                        id="jobPay"
                        name="pay"
                        placeholder="Pay (e.g. $50/hr or 1000 NPR)"
                        style={{ width: '48%', padding: '8px', marginLeft: '4%' }}
                    />
                    </div>

                    <div style={{ marginTop: '8px' }}>
                    <textarea
                        id="jobDescription"
                        name="description"
                        placeholder="Describe the job..."
                        rows="6"
                        required
                        style={{ width: '100%', padding: '8px' }}
                    ></textarea>
                    </div>

                    <div style={{ marginTop: '8px' }}>
                    <label>
                        <input type="checkbox" id="jobIsPhysical" /> Physical / on-site
                    </label>
                    <input
                        id="jobLocation"
                        name="location"
                        placeholder="Location (required if physical)"
                        style={{ width: '60%', padding: '8px', marginLeft: '12px' }}
                    />
                    <input
                        id="jobDeadline"
                        name="deadline"
                        type="date"
                        style={{ padding: '8px', marginLeft: '8px' }}
                    />
                    </div>

                    <div style={{ marginTop: '8px' }}>
                    <label>
                        Supporting files (images, pdf) — optional, up to 5 files, 5MB each
                    </label>
                    <br />
                    <input
                        id="jobAttachments"
                        name="attachments"
                        type="file"
                        multiple
                        accept=".png,.jpg,.jpeg,.gif,.pdf,.doc,.docx"
                    />
                    {/* NEW: preview / selected files UI */}
                    <div id="attachmentsPreview" style={{ marginTop: '8px' }}></div>
                    {/* when editing, show existing attachments (server URLs) */}
                    <div id="existingAttachments" style={{ marginTop: '8px' }}></div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                    <button id="jobSubmit">Save Job</button>
                    <span id="jobMessage" style={{ marginLeft: '12px' }}></span>
                    </div>
                </form>

                <hr style={{ margin: '20px 0' }} />

                <h3>Your active jobs</h3>
                <div id="jobList" style={{ marginTop: '12px' }}></div>
                </div>
        </div>
    )
}
