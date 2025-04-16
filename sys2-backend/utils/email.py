import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content
import os
from config import settings # Assuming config.py is one level up

def send_email(to_email: str, subject: str, html_content: str):
    """Sends an email using SendGrid."""
    sg = sendgrid.SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)
    
    # Ensure you have a verified sender email configured in SendGrid
    # Replace 'verified_sender@example.com' with your actual verified sender email
    from_email = Email("verified_sender@example.com") 
    
    to_email_obj = To(to_email)
    content = Content("text/html", html_content)
    mail = Mail(from_email, to_email_obj, subject, content)

    try:
        response = sg.client.mail.send.post(request_body=mail.get())
        print(f"Email sent to {to_email}. Status code: {response.status_code}")
        # You might want to add more robust logging or return status
    except Exception as e:
        print(f"Error sending email to {to_email}: {e}")
        # Handle the error appropriately (e.g., log it, raise exception)
        
# Example usage (optional, remove or comment out for production)
# if __name__ == '__main__':
#     # Make sure .env file with SENDGRID_API_KEY is present and loaded correctly
#     # Requires a settings object instance if run directly
#     test_to_email = "test_recipient@example.com" 
#     test_subject = "Test Email from SendGrid"
#     test_html_content = "<strong>This is a test email.</strong>"
#     send_email(test_to_email, test_subject, test_html_content)
