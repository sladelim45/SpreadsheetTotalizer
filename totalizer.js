

function handleFileUpload(event) {
    event.preventDefault();
    console.log("called");

    // obtain files
    const files = document.getElementById('fileUpload').files;

    if (files.length === 0) {
        alert('Please select at least one file.');
        return;
      }

    // process each file, if there are multiple
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function() {
            processFile(file, reader.result);
        };

        reader.onerror = function() {
            console.log(reader.error);
        }
    }
}

function processFile(file, fileContents) {
    console.log('File: ' + file);
    console.log('Contents: ' + fileContents);
}
