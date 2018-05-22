from twilio.rest import Client

mock_receiver = "+61466389745"
mock_sender = "+61448068514"
mock_message = " message from twilio "

class MessageClient:
    def __init__(self):
        (twilio_number, twilio_account_sid, twilio_auth_token) = load_twilio_config()
        self.twilio_number = twilio_number
        self.twilio_client = Client(twilio_account_sid, twilio_auth_token)

    def send_sms(self, body, to):
        message = self.twilio_client.messages.create(to=to, 
            from_=self.twilio_number,
            body=body)

        print(message.sid)

def load_twilio_config():
    
    ''' data from twilio account '''
    twilio_number = "+61448068514"
    twilio_account_sid = "AC6814cfccdf1a3ba97bfeff02802c5e85"
    twilio_auth_token  = "070f1e25094b643b7d96aa9eadf482c7"

    return (twilio_number, twilio_account_sid, twilio_auth_token)
