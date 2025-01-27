

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    function applyDnDFile(el) {
        if (!el) return; // Avoid errors if element is missing

        const beforeUploadEL = el.querySelector('.before-upload');
        const afterUploadEL = el.querySelector('.after-upload');
        const inputFile = el.querySelector('input[type="file"]');
        const imagePreview = el.querySelector('.after-upload img');
        const clearBtn = el.querySelector('.after-upload .clear-btn');

        if (!beforeUploadEL || !afterUploadEL || !inputFile || !imagePreview || !clearBtn) return;

        // Hide the image preview initially
        afterUploadEL.style.display = 'none';

        // Show the image preview when a file is selected
        function showImagePreview(file) {
            if (file) {
                const blobUrl = URL.createObjectURL(file);
                imagePreview.src = blobUrl;
                afterUploadEL.style.display = 'block';
                beforeUploadEL.style.display = 'none';
            }
        }

        // Open file selector on click
        beforeUploadEL.addEventListener('click', () => inputFile.click());

        // Handle file selection
        inputFile.addEventListener('change', (e) => showImagePreview(e.target.files[0]));

        // Clear uploaded image
        clearBtn.addEventListener('click', () => {
            afterUploadEL.style.display = 'none';
            beforeUploadEL.style.display = 'block';
            inputFile.value = ''; // Reset file input
        });

        // Handle drag-and-drop
        el.addEventListener('dragover', (e) => {
            e.preventDefault();
            el.style.borderColor = '#6c757d'; // Highlight border
        });

        el.addEventListener('dragleave', (e) => {
            e.preventDefault();
            el.style.borderColor = '#ccc'; // Revert border
        });

        el.addEventListener('drop', (e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                inputFile.files = files; // Set input file manually
                showImagePreview(files[0]);
            }
        });
    }

    // Apply the function to all upload sections
    document.querySelectorAll('.image-upload, .post-2nd, .post-3rd').forEach(applyDnDFile);
});
