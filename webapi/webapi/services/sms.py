from twilio.rest import Client

class MessageClient:
    def __init__(self):
        (twilio_number, twilio_account_sid, twilio_auth_token) = self._load_twilio_config()
        self.twilio_number = twilio_number
        self.twilio_client = Client(twilio_account_sid, twilio_auth_token)

    def send_sms(self, body, to):
        message = self.twilio_client.messages.create(to=to, 
            from_=self.twilio_number,
            body=body)

    def _load_twilio_config(self):
        ''' data from twilio account '''
        twilio_number = "+61448068514"
        twilio_account_sid = "AC6814cfccdf1a3ba97bfeff02802c5e85"
        twilio_auth_token  = "070f1e25094b643b7d96aa9eadf482c7"
        return (twilio_number, twilio_account_sid, twilio_auth_token)
