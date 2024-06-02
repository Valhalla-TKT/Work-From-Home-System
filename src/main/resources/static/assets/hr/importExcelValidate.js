/**
 * 
 */

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.import-excel').addEventListener('click', function () {
        document.getElementById('add-data-overlay').style.display = 'block';
        document.getElementById('add-data-modal').style.display = 'block';
    });
    document.querySelector('#add-data-overlay .close').addEventListener('click', function () {
        document.getElementById('add-data-overlay').style.display = 'none';
        document.getElementById('add-data-modal').style.display = 'none';
    });
    document.getElementById('file').addEventListener('change', handleFile, false);

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
                    console.log(result.value);
                    document.getElementById('import').disabled = false;
                } else {
                    document.getElementById('sheetNameInput').value = '';
                    document.getElementById('import').disabled = true;
                }
            });
        };
        reader.readAsArrayBuffer(file);
    }
});