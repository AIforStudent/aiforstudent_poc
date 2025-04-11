import requests
from datetime import datetime
from mongoengine import Document, StringField, DateTimeField
from typing import List, Dict
from apscheduler.schedulers.blocking import BlockingScheduler
from pytz import timezone

# Define the AINews model (as provided)
class AINews(Document):
    title = StringField(required=True)
    excerpt = StringField()
    link = StringField()
    date = DateTimeField(default=datetime.utcnow)
    source = StringField()
    author = StringField()
    image = StringField()

    meta = {'collection': 'ai_news'}

# News API key
NEWS_API_KEY = "8b1821e75ad1499da56f0b74b02597cf"

def fetch_ai_news() -> List[Dict]:
    """
    Fetches AI-related news from News API with a refined focus on 
    large language models (LLMs) and research/education related news.
    Limits the results to at most 20 articles.
    """
    base_url = "https://newsapi.org/v2/everything"
    
    # Define refined keywords
    llm_keywords = ['"large language model"', 'LLM', 'GPT-4', 'ChatGPT', '"transformers"', 'BERT']
    education_keywords = ['university', 'research', 'study', 'academia', 'institute', 'faculty', 'education', 'curriculum']
    refined_keywords = llm_keywords + education_keywords
    query = " OR ".join(refined_keywords)
    
    # Limit results to 20
    params = {
        "q": query,
        "pageSize": 20,
        "language": "en",
        "sortBy": "publishedAt",
        "apiKey": NEWS_API_KEY
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        articles = data.get("articles", [])
        
        formatted_news = []
        for article in articles:
            formatted_article = {
                "title": article.get("title", "No Title"),
                "excerpt": (
                    article.get("description") or
                    ((article.get("content", "")[:200] + "...") if article.get("content") else "No summary available")
                ),
                "link": article.get("url"),
                "date": datetime.fromisoformat(
                    article.get("publishedAt").replace("Z", "+00:00")
                ) if article.get("publishedAt") else datetime.utcnow(),
                "source": article.get("source", {}).get("name", "Unknown Source"),
                "author": article.get("author", "Unknown Author"),
                "image": article.get("urlToImage", "")
            }
            formatted_news.append(formatted_article)
        return formatted_news

    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")
        return []
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return []

def job():
    """Job executed at the scheduled time to fetch and process AI news."""
    print(f"Job started at {datetime.now()}")
    ai_news_list = fetch_ai_news()
    # Process the articles as desired (e.g., store to MongoDB, post to your backend, etc.)
    for news_item in ai_news_list:
        # For demonstration, we simply print the article details.
        print(news_item)
        print("-" * 20)
    print(f"Job finished at {datetime.now()}")

if __name__ == "__main__":
    # Set up the scheduler for Eastern Time
    eastern = timezone('US/Eastern')
    scheduler = BlockingScheduler(timezone=eastern)
    
    # Schedule the job to run daily at 6:00 AM Eastern Time
    scheduler.add_job(job, 'cron', hour=6, minute=0)
    
    print("Starting scheduler. The job will run every day at 6:00 AM Eastern Time.")
    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        print("Scheduler stopped.")
