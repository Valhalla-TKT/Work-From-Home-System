document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const statusFilter = document.querySelector('.status-filter');
    const formHistoryCards = Array.from(document.querySelectorAll('.form-history-card'));
    const pagination = document.querySelector('.pagination');
    const pageNumbers = pagination.querySelector('.page-numbers');
    const itemsPerPage = 8;
    let currentPage = 1;
    let filteredCards = formHistoryCards;

    function updatePagination() {
        pageNumbers.innerHTML = '';
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

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
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        formHistoryCards.forEach(card => {
            card.style.display = 'none';
        });

        filteredCards.slice(start, end).forEach(card => {
            card.style.display = 'block';
        });
    }

    function filterHistory() {
        const searchTerm = searchInput.value.toLowerCase();
        const status = statusFilter.value;

        filteredCards = formHistoryCards.filter(card => {
            const title = card.querySelector('.form-history-title').textContent.toLowerCase();
            const date = card.querySelector('.form-history-date').textContent.toLowerCase();
            const statusText = card.querySelector('.form-history-status').classList[1];

            const matchesSearch = title.includes(searchTerm) || date.includes(searchTerm);
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
            } else if (page === 'next' && currentPage < Math.ceil(filteredCards.length / itemsPerPage)) {
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

    updatePagination();
    displayCurrentPage();
});
