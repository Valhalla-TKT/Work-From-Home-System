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

                row.innerHTML = `
                    <td>${start + index + 1}</td>
                    <td>${month}</td>
                    <td>${year}</td>
                    <td>${statusIcon}</td>
                    <td><span class="view-detail-btn">View Detail</span></td>
                `;
                formHistoryTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error in renderFormHistory:', error);
        }
    }

    function setupRowClickHandlers() {
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
                }
            });
        });
    }

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
        setupRowClickHandlers();
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
