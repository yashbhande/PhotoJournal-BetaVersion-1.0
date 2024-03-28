document.getElementById('uploadInput').addEventListener('change', function(event) {
    const files = event.target.files;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const image = document.createElement('img');
                    image.src = e.target.result;
                    const photoBox = document.createElement('div');
                    photoBox.classList.add('photo-box');
                    photoBox.appendChild(image);

                    // Create a remove button
                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'Remove';
                    removeButton.classList.add('remove-button');
                    removeButton.addEventListener('click', function() {
                        photoBox.remove();
                    });
                    photoBox.appendChild(removeButton);

                    // Create a save button
                    const saveButton = document.createElement('button');
                    saveButton.textContent = 'Save';
                    saveButton.classList.add('save-button');
                    saveButton.addEventListener('click', function() {
                        saveImage(image.src);
                    });
                    photoBox.appendChild(saveButton);

                    // Enlarge image on click
                    image.addEventListener('click', function() {
                        image.classList.toggle('enlarged');
                    });

                    document.querySelector('.gallery').appendChild(photoBox);
                };
                reader.readAsDataURL(file);
            }
        }
    }
});

// JavaScript to trigger file input click when upload button is clicked
document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('uploadInput').click();
});

// Function to save image to the server
// Function to save image to the server
function saveImage(imageSrc) {
    // Convert the base64 image data to a Blob object
    fetch(imageSrc)
    .then(response => response.blob())
    .then(blob => {
        // Create a FormData object
        const formData = new FormData();
        // Append the image file to the FormData object
        formData.append('image', blob, 'image.png');

        // Send the FormData object to the server for saving
        fetch('saveImage.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                console.log('Image saved successfully');
            } else {
                console.error('Failed to save image');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

