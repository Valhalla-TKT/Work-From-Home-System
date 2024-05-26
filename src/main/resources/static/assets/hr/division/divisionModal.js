/**
 * 
 */
document.addEventListener('DOMContentLoaded', function () {
    const addDataButton = document.querySelector('.add-data');
    const addDataOverlay = document.getElementById('add-data-overlay');
    const addDataModal = document.getElementById('add-data-modal');
    const addDataOverlayClose = document.querySelector('#add-data-overlay .close');

    if (addDataButton && addDataOverlay && addDataModal && addDataOverlayClose) {
        addDataButton.addEventListener('click', async function () {
            addDataOverlay.style.display = 'block';
            addDataModal.style.display = 'block';
			await setDivisionCode();
        });

        addDataOverlayClose.addEventListener('click', function () {
            addDataOverlay.style.display = 'none';
            addDataModal.style.display = 'none';
        });
    }

    const manageDataItems = document.querySelectorAll('.manage-data');
    if (manageDataItems.length > 0) {
        manageDataItems.forEach(item => {
            item.addEventListener('click', event => {
                const targetId = event.currentTarget.getAttribute('data-target');
                const modal = document.getElementById(targetId);
                if (modal) {
                    modal.style.display = modal.style.display === 'none' ? 'none' : 'none';
                }
            });
        });
    }
});
