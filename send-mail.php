<?php
$action = $_POST['action'];
$lang = $_POST['lang'];
$country = $_POST['country'];
$email = $_POST['email'];
$name = $_POST['name'];
$subject = $_POST['subject'];
$date_from = $_POST['checkin'];
$date_to = $_POST['checkout'];
$notes = $_POST['notes'];
$phone = $_POST['phone'];
$room = $_POST['room'];
$payment = $_POST['payment'];

$to = "hotelerato@yahoo.com"; // "borisenko100283@gmail.com";  // 

if($action == "reservation"){
    $header = "Reservation from Erato Neos Panteleimonas Greece";
    $textForOwner = "Subject: $header. \nName: $name. \nCountry: $country. \nRoom: $room. \nDates: $date_from - $date_to. \nE-mail: $email. \nTel: $phone. \nPayment: $payment. \nNotes: $notes.";

    if($lang == "en"){
        $textForClient = "Thank you for your reservation, <strong>$name!</strong> <br>Your room: $room. <br>Check in: $date_from. <br>Check out: $date_to. <br>Payment: $payment. <br><br>Address: <br>Athanasiou Diakou, 1 <br>Neos Panteleimonas <br>Dion Olympos <br>Pieria <br>Central Macedonia <br>Greece, 60065. <br>E-mail: hotelerato@yahoo.com. <br>Tel: +306986607051. <br><br>We will contact you.";
    }
    else{
        $textForClient = "Σας ευχαριστούμε για την κράτησή σας, <strong>$name !</strong> <br>Το δωμάτιο σάς: $room. <br>Check in: $date_from. <br>Check out: $date_to. <br>Πληρωμή: $payment. <br><br>Διεύθυνση: <br>Αθανασίου Διάκου, 1 <br>Νέος Παντελεήμονας <br>Δήμος: Δίου Ολύμπου<br>Νομός Πιερίας <br>Κεντρική Μακεδονία<br>Ελλάδα τ.κ 60065. <br>E-mail: hotelerato@yahoo.com. <br>Κινητό: +306986607051. <br><br>Θα επικοινωνήσουμε μαζί σας.";
    }

    mail($email, $header, $textForClient, "Content-type:text/html; charset=UTF-8\r\nFrom:reservation@erato-greece.com");
}
elseif($action == "feedback"){
    $header = "Feedback from Erato Neos Panteleimonas Greece";
    $textForOwner = "Subject: $header. \nName: $name. \nE-mail: $email. \nSubject: $subject. \nNotes: $notes.";
}

mail($to, $header, $textForOwner, "Content-type:text/plain; charset=UTF-8\r\nFrom:$email");

echo json_encode(["messageCode" => "send-ok", "textForClient" => $textForClient]);
?>