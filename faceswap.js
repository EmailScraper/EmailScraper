import { Client } from "https://cdn.jsdelivr.net/gh/EmailScraper/EmailScraper/index.min.js";
const client = await Client.connect("tuan2308/face-swap");

$(function () {    
    const fileUploadElement = document.getElementById('fileUpload');
    const chosenFileElement = document.getElementById('chosen-file');
    const customUploadLabel = document.getElementById('labeluploadfile');
    const imagePreview = document.getElementById('imagePreview');

    const fileUploadElement2 = document.getElementById('fileUpload2');
    const chosenFileElement2 = document.getElementById('chosen-file2');
    const customUploadLabel2 = document.getElementById('labeluploadfile2');
    const imagePreview2 = document.getElementById('imagePreview2');

    const submitButton = document.getElementById('submitBtn');
    const outputPreview = document.getElementById('outputPreview');

    fileUploadElement.addEventListener('change', function () {
        displayImage(this.files[0]);
    });

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        customUploadLabel.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        customUploadLabel.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        customUploadLabel.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    customUploadLabel.addEventListener('drop', handleDrop, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        customUploadLabel.style.borderColor = '#666'; // Change as necessary
    }

    function unhighlight(e) {
        customUploadLabel.style.borderColor = '#ccc';
    }

    function handleDrop(e) {
        var dt = e.dataTransfer;
        var files = dt.files;

        if (files.length) {
            fileUploadElement.files = files;
            displayImage(files[0]);
        }
    }

    function displayImage(file) {
        if (file && file.type.startsWith('image/')) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                chosenFileElement.textContent = file.name;
            };
            reader.readAsDataURL(file);
        } else {
            chosenFileElement.textContent = 'No file chosen';
            imagePreview.style.display = 'none';
        }
    }

///////////////////////////////
    fileUploadElement2.addEventListener('change', function () {
        displayImage2(this.files[0]);
    });

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        customUploadLabel2.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        customUploadLabel2.addEventListener(eventName, highlight2, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        customUploadLabel2.addEventListener(eventName, unhighlight2, false);
    });

    // Handle dropped files
    customUploadLabel2.addEventListener('drop', handleDrop2, false);

    function highlight2(e) {
        customUploadLabel2.style.borderColor = '#666'; // Change as necessary
    }

    function unhighlight2(e) {
        customUploadLabel2.style.borderColor = '#ccc';
    }

    function handleDrop2(e) {
        var dt = e.dataTransfer;
        var files = dt.files;

        if (files.length) {
            fileUploadElement2.files = files;
            displayImage2(files[0]);
        }
    }

    function displayImage2(file) {
        if (file && file.type.startsWith('image/')) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imagePreview2.src = e.target.result;
                imagePreview2.style.display = 'block';
                chosenFileElement2.textContent = file.name;
            };
            reader.readAsDataURL(file);
        } else {
            chosenFileElement2.textContent = 'No file chosen';
            imagePreview2.style.display = 'none';
        }
    }
////////////////////////////////////////////////////////////

    async function processImage(srcfile, targetfile) {
        
        const result = await client.predict(
            "/predict",{
              source_file: srcfile,
              target_file: targetfile,
              doFaceEnhancer: true,
          });

        const imageUrl = result.data[0].url;
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const localUrl = URL.createObjectURL(blob);
        return localUrl;
    }

    function loadingStart() {
        submitButton.classList.remove('btn-success')
        submitButton.classList.add('loading')
        submitButton.innerText = 'Processing...'
    }

    function loadingEnd() {
        submitButton.classList.remove('loading')
        submitButton.classList.add('btn-success')
        submitButton.innerText = 'Submit'
    }

    submitButton.addEventListener('click', function(event) {
        const srcfile = fileUploadElement.files[0];
        const targetfile = fileUploadElement2.files[0];

        if (srcfile && srcfile.type.startsWith('image/') && targetfile && targetfile.type.startsWith('image/')) {
            loadingStart();

            processImage(srcfile, targetfile).then(result => {
                outputPreview.src = result;
                loadingEnd();
            }).catch(error => {
                loadingEnd();
                console.log(error.message)
                alert('Our Server is busy. Please try on another machine or try again later!');
            })

        } else {
            alert('No file chosen!');
        }

        // Optional: Prevent the form from submitting to see the alert
        event.preventDefault();
    });
});