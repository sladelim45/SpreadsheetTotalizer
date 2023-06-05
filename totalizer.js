
// triggered by user pressing Upload button
function handleFileUpload(event) {
    event.preventDefault();
    console.log("called");

    // obtain files
    const files = document.getElementById('fileUpload').files;
    
    // make sure user actually uploaded a file
    if (files.length === 0) {
        alert('Please select at least one file.');
        return;
    }
    
    // clear the spreadsheet preview
    document.getElementById('contentPreview').innerHTML = "";

    // process each file, if there are multiple
    for (var i = 0; i < files.length; i++) {
        const file = files[i];

        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function() {
            processFile(file.name, reader.result);
        };

        reader.onerror = function() {
            console.log(reader.error);
        }
    }
}


function processFile(filename, fileContents) {
    console.log('Filename: ' + filename);
    console.log('Contents: ' + fileContents);

    // parse the TSV
    var rows = fileContents.split('\n');
    var data = [];

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].split('\t');
        data.push(cells);
    }

    displaySpreadsheet(data);



}

function displaySpreadsheet(data) {
    var spreadsheet = document.createElement('table');

    for (var i = 0; i < data.length; i++) {
        var row = document.createElement('tr');

        for (var j = 0; j < data[i].length; j++) {
            var cell = document.createElement('td');
            cell.textContent = data[i][j];
            row.appendChild(cell);
        }

        spreadsheet.appendChild(row);
    }

    document.getElementById('contentPreview').appendChild(spreadsheet);
}
