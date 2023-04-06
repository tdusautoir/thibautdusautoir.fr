<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

header('Content-type: application/json');

foreach($_POST as $inputName => $value) {
    if(empty($value)) {
        echo json_encode(['error' => "Le champ $inputName est vide !"]);
        die();
    }

    switch($inputName) {
        case 'firstname': 
        case 'lastname':
            ${$inputName} = $value;

            if(strlen($value) > 46) {
                echo json_encode(['error' => "Le champ $inputName est trop long !"]);
                die();
            }
            break;

        case 'email':
            ${$inputName} = $value;

            if(strlen($value) > 80) {
                echo json_encode(['error' => "Le champ $inputName est trop long !"]);
                die();
            }

            if(!(filter_var($value, FILTER_VALIDATE_EMAIL))) {
                echo json_encode(['error' => "L'email n'est pas valide !"]);
                die();
            }

            break;

        case 'content': 
            ${$inputName} = $value;

            if(strlen($value) > 1200) {
                echo json_encode(['error' => "Le champ $inputName est trop long !"]);
                die();
            };
            break;
    }
}

try {
    $mail = new PHPMailer(true);
    //Server settings

    // for debug -> $mail->SMTPDebug = SMTP::DEBUG_SERVER;                
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host = 'mail.thibautdusautoir.fr';                     //Set the SMTP server to send through
    $mail->SMTPAuth = true;                                   //Enable SMTP authentication
    $mail->Username = 'contact@thibautdusautoir.fr';                     //SMTP username
    $mail->Password = '';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    $mail->Encoding = 'base64';
    $mail->CharSet = 'UTF-8';

    //Recipients
    $mail->setFrom('contact@thibautdusautoir.fr');
    $mail->addAddress('thibautdusautoir@gmail.com');

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = "thibautdusautoir - contact";
    $mail->Body =  "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional //EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
    <html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">
        <head>
            <!--[if gte mso 9]>
                <xml>
                <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
                </xml>
            <![endif]-->
            <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">
            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
            <meta name=\"x-apple-disable-message-reformatting\">
            <!--[if !mso]><!--><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><!--<![endif]-->
            <title></title>
        </head>
        <body>
            <h1>Thibautdusautoir.fr</h1>
            <p>Vous avez reçu un message de la part de $firstname $lastname via cette email : $email</p>
            <p>Voici le message : $content</p>
        </body>
    </html>";
    $mail->AltBody = "Email recu de votre site web de la part de $firstname $lastname via le mail, $email.";

    if($mail->send()) {
        echo json_encode(['success' => "Votre message m'a bien été envoyé !"]);
        die();
    }
} catch (Exception $e) {
    echo json_encode(['error' => "Une erreur est survenue !"]);
    die();
}

echo json_encode(['error' => "Une erreur est survenue !"]);