document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const statusFilter = document.querySelector('.status-filter');
    const formHistoryTableBody = document.querySelector('#form-history-table tbody');
    const pagination = document.querySelector('.pagination');
    const pageNumbers = pagination.querySelector('.page-numbers');
    const itemsPerPage = 8;
    let currentPage = 1;
    let formHistoryData = [];
    let filteredData = [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userName = document.querySelector('.user-name');
    const userEmail = document.querySelector('.user-email');
    const userProfilePicture = document.querySelector('.profile-picture');
    const noRecordsMessage = document.querySelector('.no-records-message');

    function renderFormHistory() {
        try {
            formHistoryTableBody.innerHTML = '';
            if (filteredData.length === 0) {
                noRecordsMessage.style.display = 'block';
                return;
            }

            noRecordsMessage.style.display = 'none';

            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageData = filteredData.slice(start, end);

            pageData.forEach((item, index) => {
                const row = document.createElement('tr');
                row.dataset.formId = item.formId;
                const signedDate = item.signedDate || 'N/A';
                const [month, year] = signedDate.split(', ');
                let statusIcon = '';

                switch (item.status.toLowerCase()) {
                    case 'approve':
                        statusIcon = '<i class="fas fa-check-circle status-icon status-approve"></i> Approved';
                        break;
                    case 'pending':
                        statusIcon = '<i class="fas fa-hourglass-half status-icon"></i> Pending';
                        break;
                    case 'reject':
                        statusIcon = '<i class="fas fa-times-circle status-icon status-reject"></i> Rejected';
                        break;
                    default:
                        statusIcon = item.status;
                        break;
                }

                const wfaAction = item.wfauser
                    ? '<span class="view-wfa-checklist-btn">View WFA Checklist</span>'
                    : '<span class="add-wfa-checklist-btn">Add WFA Checklist</span>';

                row.innerHTML = `
                    <td>${start + index + 1}</td>
                    <td>${month}</td>
                    <td>${year}</td>
                    <td>${statusIcon}</td>
                    <td><span class="view-detail-btn">View Detail</span> / ${wfaAction}</td>
                `;
                formHistoryTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error in renderFormHistory:', error);
        }
    }

    function setupDetailClickHandlers() {
        document.querySelectorAll('.view-detail-btn').forEach(button => {
            button.addEventListener('click', function () {
                const formId = this.closest('tr').dataset.formId;
                if (formId) {
                    fetch(`${getContextPath()}/form/generateToken`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ formId })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                window.location.href = `${getContextPath()}${data.redirectUrl}`;
                            } else {
                                console.error('Error in generating form token:', data.message);
                            }
                        })
                        .catch(error => {
                            console.error('Error in generating form token:', error);
                        });
                } else {
                    location.reload();
                }
            });
        });
    }

    // Add for ver 2.2 (Manual ver 1.8 - including WFA)
    const setupWFADetailClickHandlers = () => {
        document.querySelectorAll('.view-wfa-checklist-btn').forEach(button => {
            button.addEventListener('click', function () {
                const formId = this.closest('tr').dataset.formId;
                if (formId) {
                    fetch(`${getContextPath()}/form/wfa/generateToken`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ formId })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                window.location.href = `${getContextPath()}${data.redirectUrl}`;
                            } else {
                                console.error('Error in generating form token:', data.message);
                            }
                        })
                        .catch(error => {
                            console.error('Error in generating form token:', error);
                        });
                } else {
                    location.reload();
                }
            });
        });
    };

    const setupAddWFACheckListClickHandlers = () => {
        document.querySelectorAll('.add-wfa-checklist-btn').forEach(button => {
            button.addEventListener('click', function () {
                const formId = this.closest('tr').dataset.formId;
                if (formId) {
                    Swal.fire({
                        title: 'Checked by Applicant',
                        width: '800px',
                        html: `
                        <div class="wfa-checklist-form">
                            <div class="checklist-item mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <input type="checkbox" id="hr-info-check" class="form-check-input me-2">
                                    <label for="hr-info-check" class="form-check-label" style="color: #000;">
                                        WFA information must be informed to HR Dept.<span style="color: red;">*</span>
                                    </label>
                                </div>
                                <div class="d-flex justify-content-between gap-3">
                                    <div class="flex-grow-1">
                                        <label class="d-block mb-1">Name</label>
                                        <input type="text" id="hr-info-name" class="form-control rounded-3">
                                    </div>
                                    <div style="width: 200px;">
                                        <label class="d-block mb-1">Signed Date</label>
                                        <input type="date" id="hr-info-date" class="form-control rounded-3">
                                    </div>
                                </div>
                            </div>

                            <div class="checklist-item">
                                <div class="d-flex align-items-center mb-2">
                                    <input type="checkbox" id="env-check" class="form-check-input me-2">
                                    <label for="env-check" class="form-check-label" style="color: #000;">
                                        WFA working environment must be ready.<span style="color: red;">*</span>
                                    </label>
                                </div>
                                <div class="d-flex justify-content-between gap-3">
                                    <div class="flex-grow-1">
                                        <label class="d-block mb-1">Name</label>
                                        <input type="text" id="env-name" class="form-control rounded-3">
                                    </div>
                                    <div style="width: 200px;">
                                        <label class="d-block mb-1">Signed Date</label>
                                        <input type="date" id="env-date" class="form-control rounded-3">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <style>
                            .wfa-checklist-form {
                                text-align: left;
                                padding: 20px;
                            }
                            .form-control {
                                border: 1px solid #ccc;
                                padding: 8px 12px;
                            }
                            .form-check-input {
                                width: 20px;
                                height: 20px;
                            }
                            .form-check-label {
                                font-size: 16px;
                            }
                        </style>
                    `,
                        showCancelButton: true,
                        confirmButtonText: 'Submit',
                        cancelButtonText: 'Cancel',
                        preConfirm: () => {
                            // Validation
                            const hrInfoChecked = document.getElementById('hr-info-check').checked;
                            const envChecked = document.getElementById('env-check').checked;

                            if (!hrInfoChecked || !envChecked) {
                                Swal.showValidationMessage('Please check all required items');
                                return false;
                            }

                            return {
                                hrInfo: {
                                    checked: hrInfoChecked,
                                    name: document.getElementById('hr-info-name').value,
                                    date: document.getElementById('hr-info-date').value
                                },
                                environment: {
                                    checked: envChecked,
                                    name: document.getElementById('env-name').value,
                                    date: document.getElementById('env-date').value
                                }
                            };
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {

                            const bodyPayload = new URLSearchParams({
                                applicantAppliedDate: result.value.hrInfo.date,
                                formId: formId
                            });

                            fetch(`${getContextPath()}/api/wfa/update-wfa-checklist`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: bodyPayload
                            })
                                .then(response => response.text())
                                .then(data => {
                                    Swal.fire('Updated!', 'The WFA checklist has been updated.', 'success');
                                })
                                .catch(error => {
                                    Swal.fire('Error!', 'There was an issue updating the checklist.', 'error');
                                });

                        }
                    });
                } else {
                    location.reload();
                }
            });
        });
    };

    function updatePagination() {
        pageNumbers.innerHTML = '';
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.classList.add('page-link');
            pageLink.dataset.page = i;
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            pageNumbers.appendChild(pageLink);
        }
    }

    function displayCurrentPage() {
        renderFormHistory();
        setupDetailClickHandlers();

        // Add for ver 2.2 (Manual ver 1.8 - including WFA)
        setupWFADetailClickHandlers();
        setupAddWFACheckListClickHandlers();
    }

    function filterHistory() {
        const searchTerm = searchInput.value.toLowerCase();
        const status = statusFilter.value;

        filteredData = formHistoryData.filter(item => {
            const title = item.signedDate.toLowerCase();
            const statusText = item.status.toLowerCase();

            const matchesSearch = title.includes(searchTerm);
            const matchesStatus = status === 'all' || statusText.includes(status);

            return matchesSearch && matchesStatus;
        });

        currentPage = 1;
        updatePagination();
        displayCurrentPage();
    }

    pagination.addEventListener('click', function (event) {
        if (event.target.classList.contains('page-link')) {
            event.preventDefault();
            const page = event.target.dataset.page;
            if (page === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (page === 'next' && currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
                currentPage++;
            } else if (!isNaN(page)) {
                currentPage = parseInt(page);
            }
            displayCurrentPage();
            updatePagination();
        }
    });

    searchInput.addEventListener('input', filterHistory);
    statusFilter.addEventListener('change', filterHistory);

    (async function initialize() {
        const userId = currentUser.id;
        userName.innerText = currentUser.name;
        userEmail.innerText = currentUser.email;
        userProfilePicture.src = `${getContextPath()}/assets/profile/${currentUser.profile}`;
        userProfilePicture.alt = currentUser.name;
        formHistoryData = await fetchUserFormHistory(userId);
        filteredData = [...formHistoryData];
        updatePagination();
        displayCurrentPage();
    })();
});
