import os
from flask import Flask, jsonify
from flask_cors import CORS
from mongoengine import connect
from dotenv import load_dotenv
from models.ai_news import AINews
from scripts.fetch_ai_news import fetch_ai_news
from models.user import bcrypt
from flask_session import Session

load_dotenv() 

app = Flask(__name__)

# Configure Flask Session
app.config['SESSION_TYPE'] = 'mongodb'
app.config['SESSION_MONGODB'] = connect(host=os.getenv("MONGO_URI"))
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['PERMANENT_SESSION_LIFETIME'] = 86400  # 24 hours
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')

# Initialize Session
Session(app)

# Configure CORS
CORS(app, supports_credentials=True, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://aiforstudent-poc.onrender.com",
            "https://aiforstudent-poc.vercel.app"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True,
        "expose_headers": ["Content-Type", "Authorization"],
        "max_age": 600
    }
})

# Initialize bcrypt
bcrypt.init_app(app)

# Connect to MongoDB using the URI from .env
MONGO_URI = os.getenv("MONGO_URI")
connect(host=MONGO_URI)

# Register Blueprints
from routes.blogs import blogs
from routes.courses import courses
from routes.roadmaps import roadmaps
from routes.ai_news import ai_news
from routes.auth import auth_bp
from routes.admin import admin_bp

app.register_blueprint(blogs, url_prefix="/api/blogs")
app.register_blueprint(courses, url_prefix="/api/courses")
app.register_blueprint(roadmaps, url_prefix="/api/roadmaps")
app.register_blueprint(ai_news, url_prefix="/api/ai-news")
app.register_blueprint(auth_bp)
app.register_blueprint(admin_bp)

@app.route("/api/fetch-and-save-news", methods=["POST"])
def fetch_and_save_news():
    try:
        news_list = fetch_ai_news()

        if news_list:
            for news_data in news_list:
                news_item = AINews(**news_data)
                news_item.save()

            return jsonify({"message": "News fetched and saved successfully"}), 200
        else:
            return jsonify({"message": "No news fetched or an error occurred"}), 500

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route("/")
def index():
    return "API is running..."

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    app.run(host="0.0.0.0", port=port)
