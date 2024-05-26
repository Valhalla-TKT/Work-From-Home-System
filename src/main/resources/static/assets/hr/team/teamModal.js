document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.add-data').addEventListener('click', function () {
        document.getElementById('add-data-overlay').style.display = 'block';
        document.getElementById('add-data-modal').style.display = 'block';
    });
    document.querySelector('#add-data-overlay .close').addEventListener('click', function () {
        document.getElementById('add-data-overlay').style.display = 'none';
        document.getElementById('add-data-modal').style.display = 'none';
    });

    document.querySelector('.edit-data').addEventListener('click', function () {
        document.getElementById('edit-data-overlay').style.display = 'block';
        document.getElementById('edit-data-modal').style.display = 'block';
    });

    document.querySelector('#edit-data-overlay .close').addEventListener('click', function () {
        document.getElementById('edit-data-overlay').style.display = 'none';
        document.getElementById('edit-data-modal').style.display = 'none';
    });

    document.querySelectorAll('.manage-data').forEach(item => {
        item.addEventListener('click', event => {
            const targetId = event.currentTarget.getAttribute('data-target');
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
});