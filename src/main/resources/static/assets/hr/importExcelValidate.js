/**
 * 
 */

function promptForSheetName() {
    var sheetName = prompt("Enter sheet name:");
    if (sheetName === null || sheetName.trim() === "") {
        alert("Sheet name cannot be null or empty. Please try again.");
    } else {
        document.getElementById("sheetNameInput").value = sheetName;
        document.getElementById("uploadForm").submit();
    }
}