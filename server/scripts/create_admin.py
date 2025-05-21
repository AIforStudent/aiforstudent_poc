import os
import sys
from pathlib import Path

# Add the server directory to the Python path
server_dir = str(Path(__file__).parent.parent)
sys.path.append(server_dir)

from app import app
from models.user import User
from mongoengine import connect
from dotenv import load_dotenv

load_dotenv()

def create_admin_user(username, password):
    # Connect to MongoDB
    MONGO_URI = os.getenv("MONGO_URI")
    if not MONGO_URI:
        print("Error: MONGO_URI not found in environment variables")
        sys.exit(1)
        
    connect(host=MONGO_URI)
    
    # Check if admin user already exists
    admin = User.objects(username=username).first()
    if admin:
        print(f"Admin user '{username}' already exists.")
        return

    # Create new admin user
    admin = User(username=username, is_admin=True)
    admin.set_password(password)
    admin.save()
    print(f"Admin user '{username}' created successfully.")

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python create_admin.py <username> <password>")
        sys.exit(1)
    
    username = sys.argv[1]
    password = sys.argv[2]
    create_admin_user(username, password) 