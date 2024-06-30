document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const statusFilter = document.querySelector('.status-filter');
    const formHistoryContainer = document.querySelector('.form-history-listing');
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

    function renderFormHistory() {
        formHistoryContainer.innerHTML = '';

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = filteredData.slice(start, end);

        pageData.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('form-history-card');
            card.innerHTML = `
                <div class="form-history-info">
                    <h2 class="form-history-title">For ${item.signedDate}</h2>
                    <div class="form-history-details">
                        <p class="form-history-date">For ${item.signedDate}</p>
                        <p class="form-history-status ${item.status.toLowerCase()}-status">${item.status}</p>
                    </div>
                </div>
            `;
            formHistoryContainer.appendChild(card);
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
        userProfilePicture.src = `/assets/profile/${currentUser.profile}`;
        userProfilePicture.alt = currentUser.name;
        formHistoryData = await fetchUserFormHistory(userId);
        filteredData = [...formHistoryData];
        updatePagination();
        displayCurrentPage();
    })();
});
