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