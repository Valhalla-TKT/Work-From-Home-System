/**
 * 
 */
document.addEventListener('DOMContentLoaded', function () {
    const loadingOverlay = document.getElementById('loading-overlay')
    const wrapInner = document.getElementById('wrap-inner')
    const excelImportBtn = document.querySelector('.import-excel');
    if(excelImportBtn) {
        excelImportBtn.addEventListener('click', function () {
            document.getElementById('add-data-overlay').style.display = 'block';
            document.getElementById('add-data-modal').style.display = 'block';
        });
    }
    const closeBtn = document.querySelector('#add-data-overlay .close')
    if(closeBtn) {
        closeBtn.addEventListener('click', function () {
            document.getElementById('add-data-overlay').style.display = 'none';
            document.getElementById('add-data-modal').style.display = 'none';
        })
    }
    // document.querySelector('#add-data-overlay .close').addEventListener('click', function () {
    //
    // });

    document.getElementById('file').addEventListener('change', handleFile, false);
    document.getElementById('import').addEventListener('click', submitForm, false);

    function handleFile(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetNames = workbook.SheetNames;

            Swal.fire({
                title: 'Select a sheet',
                input: 'select',
                inputOptions: sheetNames.reduce((options, sheetName) => {
                    options[sheetName] = sheetName;
                    return options;
                }, {}),
                inputPlaceholder: 'Select a sheet',
                showCancelButton: true,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value) {
                            resolve();
                        } else {
                            resolve('You need to select a sheet!');
                        }
                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('sheetNameInput').value = result.value;
                    document.getElementById('import').disabled = false;
                } else {
                    document.getElementById('sheetNameInput').value = '';
                    document.getElementById('import').disabled = true;
                }
            });
        };
        reader.readAsArrayBuffer(file);
    }

    function submitForm() {
        const formData = new FormData(document.getElementById('uploadForm'));
        loadingOverlay.style.display = 'flex';
        document.getElementById('wrap-inner').style.display = 'none';
        document.getElementById('add-data-overlay').style.display = 'none';
        document.getElementById('add-data-modal').style.display = 'none';
        fetch(`${getContextPath()}/api/importExcel`, {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(data => {
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('wrap-inner').style.display = 'block';
                if (data.success) {
                    const currentLocation = window.location.pathname;
                    const adminUserLocation = `${getContextPath()}/admin/user`;
                    Swal.fire({
                        title: 'File Uploaded Successfully',
                        text: currentLocation === adminUserLocation ? 'The page will be refreshed.' : 'You will be signed out.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if (currentLocation === adminUserLocation) {
                                window.location.reload();
                            } else {
                                localStorage.removeItem('currentUser');
                                window.location.href = `${getContextPath()}/signOut`;
                            }
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: data.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }).catch(error => {
            document.getElementById('loading-overlay').style.display = 'none';
            document.getElementById('wrap-inner').style.display = 'block';
            Swal.fire({
                title: 'Error',
                text: 'Error uploading file: ' + error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    }
});
