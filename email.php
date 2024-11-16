<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$name = htmlspecialchars($_POST['name']);
$number = htmlspecialchars($_POST['number']);
$email = htmlspecialchars(string: $_POST['email']);

// Recipient email 
$to = "sajidkhan87394@gmail.com";

//email subject 
$subject = "New Contact Form Submission";


//Email content
  $message = "You have received a new contact form submission:\n\n";
    $message .= "Name: $name\n";
    $message .= "Number: $number\n";
    $message .= "Email: $email\n";

  // Headers
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();


    // Send email
    if (mail($to, $subject, $message, $headers)) {
        // Redirect to thank you page
        header("Location: thankyou.html");
        exit();
    } else {
        echo "Sorry, there was an error sending your message. Please try again later.";
    }
} else {
   echo "Invalid request.";
}
?>