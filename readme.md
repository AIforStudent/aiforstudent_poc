# AI for Students

An educational platform dedicated to making artificial intelligence and programming education accessible to all students.

![USC Logo](/client/public/images/home-page/usc-logo.png)

## About the Project

AI for Students is a collaborative initiative at the University of Southern California (USC) to address the growing need for accessible, high-quality educational resources in artificial intelligence and programming. Recognizing that AI literacy will be crucial for future generations, our team of educators, researchers, and students created this platform to democratize AI education.

### Features

- **Learning Roadmaps**: Structured learning paths from beginner to advanced levels
- **Curated Courses**: Carefully selected courses for various programming and AI topics
- **AI News**: Latest updates and developments in artificial intelligence
- **Blog Posts**: In-depth explanations of complex AI and programming concepts
- **Responsive Design**: Fully accessible on all devices

## Tech Stack

### Frontend
- React 19
- React Router v7
- CSS3 with custom styling
- Font Awesome for icons

### Backend
- Python 3.12
- Flask
- MongoDB with MongoEngine
- Flask-CORS for cross-origin requests

## Getting Started

These instructions will help you set up a copy of the project running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v16+)
- npm (v8+)
- Python (3.8+)
- MongoDB

### Installation

#### Client (React Frontend)

1. Clone the repository
```bash
git clone https://github.com/yourusername/aiforstudent_poc.git
cd aiforstudent_poc
```

2. Install frontend dependencies
```bash
cd client
npm install
```

3. Start the frontend development server
```bash
npm start
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

#### Server (Flask Backend)

1. Create and activate a virtual environment
```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Install backend dependencies
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the server directory with:
```
MONGO_URI=mongodb://localhost:27017/aiforstudents
PORT=5001
```

4. Start the backend server
```bash
python app.py
```

The API will be running at [http://localhost:5001](http://localhost:5001)

## Project Structure

```
aiforstudent_poc/
├── client/               # React frontend
│   ├── public/           # Static files
│   └── src/              # Source files
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       └── styles/       # CSS files
└── server/               # Flask backend
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    └── scripts/          # Utility scripts
```

## API Endpoints

### Courses API
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get a specific course

### Roadmaps API
- `GET /api/roadmaps` - Get all roadmaps
- `GET /api/roadmaps/:id` - Get a specific roadmap

### Blogs API
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get a specific blog post

### AI News API
- `GET /api/ai-news` - Get all AI news
- `POST /api/fetch-and-save-news` - Fetch and save news from external sources

## Deployment

### Frontend Deployment
The frontend is configured for deployment on Netlify. The build process is handled by the `npm run build` command.

```bash
cd client
npm run build
```

### Backend Deployment
The backend can be deployed to various platforms supporting Python applications. Make sure to set the appropriate environment variables in your production environment.

## License

This project is available as open source under the terms of the MIT License.
