function populateSelectBox(selector, data, dataName) {
    let selectBox = $(selector);
    selectBox.empty();
    selectBox.append(`<option value="" disabled selected>Select ${dataName} Name</option>`);
    data.forEach(division => {
        let option = $('<option>', {
            value: division.id,
            text: division.name,
            'data-code': division.code
        });
        selectBox.append(option);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const addDataButton = document.querySelector('.add-data');
    const addDataOverlay = document.getElementById('add-data-overlay');
    const addDataModal = document.getElementById('add-data-modal');
    const addDataOverlayClose = document.querySelector('#add-data-overlay .close');
    const editDataButton = document.querySelector('.edit-data');
    const editDataOverlay = document.getElementById('edit-data-overlay');
    const editDataModal = document.getElementById('edit-data-modal');
    const editDataOverlayClose = document.querySelector('#edit-data-overlay .close');
    const manageDataButtons = document.querySelectorAll('.manage-data');

    if (addDataButton) {
        addDataButton.addEventListener('click', function () {
            addDataOverlay.style.display = 'block';
            addDataModal.style.display = 'block';
        });
    }

    if (addDataOverlayClose) {
        addDataOverlayClose.addEventListener('click', function () {
            addDataOverlay.style.display = 'none';
            addDataModal.style.display = 'none';
        });
    }

    if (editDataButton) {
        editDataButton.addEventListener('click', function () {
            editDataOverlay.style.display = 'block';
            editDataModal.style.display = 'block';
        });
    }

    if (editDataOverlayClose) {
        editDataOverlayClose.addEventListener('click', function () {
            editDataOverlay.style.display = 'none';
            editDataModal.style.display = 'none';
        });
    }

    if (manageDataButtons.length > 0) {
        manageDataButtons.forEach(item => {
            item.addEventListener('click', event => {
                const targetId = event.currentTarget.getAttribute('data-target');
                const modal = document.getElementById(targetId);
                if (modal) {
                    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
                } else {
                    console.error(`Modal with id '${targetId}' not found.`);
                }
            });
        });
    }
});
