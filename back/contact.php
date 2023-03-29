<?php 

header('Content-type: application/json');

$error = false;

foreach($_POST as $inputName => $value) {
    if(empty($value)) {
        $error = true;
    }

    switch($inputName) {
        case 'firstname': 
        case 'lastname':
            if(strlen($value) > 46) {
                $error = true;
            }
            break;

        case 'email':
            if(strlen($value) > 80) {
                $error = true;
                break;
            }

            if(!(filter_var($value, FILTER_VALIDATE_EMAIL))) {
                $error = true;
                break;
            }

            break;

        case 'content': 
            if(strlen($value) > 1200) {
                $error = true;
                break;
            };
            break;
    }
}

if($error) {
    echo json_encode(['error' => "Une erreur est survenue !"]);
} else {
    echo json_encode(['success' => "Message envoyé"]);
}