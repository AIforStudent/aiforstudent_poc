import os
from flask import Flask
from flask_cors import CORS
from mongoengine import connect
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Connect to MongoDB using the URI from .env
MONGO_URI = os.getenv("MONGO_URI")
connect(host=MONGO_URI)

# Register Blueprints
from routes.blogs import blogs
from routes.courses import courses
from routes.roadmaps import roadmaps
from routes.ai_news import ai_news

app.register_blueprint(blogs, url_prefix="/api/blogs")
app.register_blueprint(courses, url_prefix="/api/courses")
app.register_blueprint(roadmaps, url_prefix="/api/roadmaps")
app.register_blueprint(ai_news, url_prefix="/api/ai-news")

@app.route("/")
def index():
    return "API is running..."

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    app.run(host="0.0.0.0", port=port)
