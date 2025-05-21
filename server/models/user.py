from mongoengine import Document, StringField, BooleanField, DateTimeField
from flask_bcrypt import Bcrypt
from datetime import datetime

bcrypt = Bcrypt()

class User(Document):
    username = StringField(required=True, unique=True)
    password_hash = StringField(required=True)
    is_admin = BooleanField(default=False)
    created_at = DateTimeField(default=datetime.utcnow)
    last_login = DateTimeField()

    meta = {'collection': 'users'}

    def set_password(self, password):
        """Hash and set the user's password."""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """Check if the provided password matches the hash."""
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>' 