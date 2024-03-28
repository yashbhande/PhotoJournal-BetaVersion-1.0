<?php
// Specify the path where the image will be saved
$uploadDir = 'uploads/';

// Generate a unique filename for the image
$filename = uniqid() . '.png';

// Save the image received from the FormData
if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $filename)) {
    echo json_encode(['success' => true, 'message' => 'Image saved successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save image']);
}
?>
