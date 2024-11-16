// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Check if the current page is index.html
    if (document.getElementById('uploader')) {
        console.log("Uploader found, setting up upload functionality.");
        const imageLoader = document.getElementById('uploader');

        imageLoader.addEventListener('change', function (e) {
            const reader = new FileReader();

            reader.onload = function () {
                const imageData = reader.result;
                sessionStorage.setItem('uploadedImage', imageData); // Store the image in sessionStorage
                window.location.href = 'results.html'; // Navigate to results.html
            };

            reader.onerror = function (err) {
                console.error('Error reading file:', err);
            };

            if (e.target.files && e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
            } else {
                console.error("No file selected.");
            }
        });
    }

    // Check if the current page is results.html
    if (document.getElementById('imagePreview')) {
        console.log("Image preview section found, loading image.");
        const imageData = sessionStorage.getItem('uploadedImage');

        if (imageData) {
            const imagePreview = document.getElementById('imagePreview');
            const img = new Image();
            img.src = imageData;

            img.onload = function () {
                imagePreview.innerHTML = ''; // Clear any placeholder text
                imagePreview.appendChild(img); // Display the uploaded image
            };

            img.onerror = function () {
                console.error("Failed to load the image.");
            };
        } else {
            console.error("No image data found in sessionStorage.");
        }
    }
});
