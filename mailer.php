<?php
/**
 * PHPMailer multiple files upload and send
 */

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require "./PHPMailer/PHPMailer.php";
require "./PHPMailer/SMTP.php";
require "./PHPMailer/Exception.php";

$mail = new PHPMailer(true);
$mail->CharSet = "UTF-8";

//Server settings
$mail->isSMTP();
$mail->Host = "smtp.hostinger.com";
$mail->SMTPAuth = true;
$mail->Username = "noreply@dinonuggets.mx";
$mail->Password = "atHD-3sR2y@2";
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

if (isset($_POST["nombre"]) && isset($_POST["de-acuerdo"])) {
    // Sanitización de todos los campos
    $nombre = strip_tags(trim($_POST["nombre"]));
    $apellido = strip_tags(trim($_POST["apellido"]));
    $telefono = strip_tags(trim($_POST["telefono"]));
    $correo = filter_var(trim($_POST["correo"]), FILTER_SANITIZE_EMAIL);
    $cp = strip_tags(trim($_POST["cp"]));
    $estado = strip_tags(trim($_POST["estado"]));
    $municipio = strip_tags(trim($_POST["municipio"]));
    $pais = strip_tags(trim($_POST["pais"]));
    $esNegocio = isset($_POST["negocio"]) ? $_POST["negocio"] : "";

    // Nuevos campos de negocio
    $nombreNegocio = "";
    $giroNegocio = "";
    if ($esNegocio == "si") {
        $nombreNegocio = strip_tags(trim($_POST["nombre-negocio"]));
        $giroNegocio = strip_tags(trim($_POST["giro-negocio"]));
    }

    $negocioTexto =
        $esNegocio == "si"
            ? "Sí, es dueño de negocio<br>Nombre del negocio: {$nombreNegocio}<br>Giro del negocio: {$giroNegocio}"
            : "No tiene negocio";

    $deAcuerdo = isset($_POST["de-acuerdo"]) ? "Sí" : "No";

    // Eliminar saltos de línea
    $nombre = str_replace(["\r", "\n"], [" ", " "], $nombre);
    $apellido = str_replace(["\r", "\n"], [" ", " "], $apellido);
    if ($nombreNegocio) {
        $nombreNegocio = str_replace(["\r", "\n"], [" ", " "], $nombreNegocio);
    }

    try {
        //Recipients
        $mail->setFrom(
            "noreply@dinonuggets.mx",
            "Correo noreply@dinonuggets.mx"
        );
        $mail->addAddress("jacuna@bafar.com.mx");
        $mail->addReplyTo($correo, "Deseo obtener más información.");

        //Content
        $mail->isHTML(true);
        $mail->Subject = "Nuevo mensaje de " . $nombre . " " . $apellido;

        // Construir el cuerpo del mensaje
        $mail->Body = "
            <strong>Información del contacto:</strong><br>
            Nombre: {$nombre}<br>
            Apellido: {$apellido}<br>
            Teléfono: {$telefono}<br>
            Correo electrónico: {$correo}<br>
            <br>
            <strong>Ubicación:</strong><br>
            Código Postal: {$cp}<br>
            Estado: {$estado}<br>
            Municipio: {$municipio}<br>
            País: {$pais}<br>
            <br>
            <strong>Información adicional:</strong><br>
            <strong>Información del negocio:</strong><br>
            {$negocioTexto}<br>
            <br>
            Aceptó términos y condiciones: {$deAcuerdo}<br>
            <br>
            Este mensaje fue enviado a través del formulario de contacto en el sitio web de Dinonuggets.mx.";

        $mail->send();
        echo "Gracias por contactarnos, nos pondremos en contacto contigo a la brevedad.";
    } catch (Exception $e) {
        echo "Lo sentimos, algo salió mal. Por favor, inténtalo de nuevo. Mailer Error: " .
            $mail->ErrorInfo;
    }
} else {
    echo "Por favor, complete todos los campos requeridos, incluyendo los términos y condiciones.";
}
