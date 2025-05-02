import datetime
import logging
import string  # for normalize_title
import feedparser  # for RSS parsing
import os # Added for environment variables
import requests # For making HTTP requests (including Unsplash API)
from dotenv import load_dotenv # Added for environment variables
import mongoengine # Added for database interaction
from mongoengine import Document, StringField, DateTimeField, FloatField
from typing import List, Dict # Keep typing for potential future use or consistency
from bs4 import BeautifulSoup # Added for parsing HTML summary
import re # For cleaning title for keywords
import json
import time
import schedule # Added for scheduling

# Configure logging for this script
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Define the AINews model (as provided, might be needed elsewhere or for context)
class AINews(Document):
    title = StringField(required=True)
    excerpt = StringField()
    link = StringField()
    date = DateTimeField(default=datetime.datetime.utcnow) # Use datetime.datetime
    source = StringField()
    author = StringField()
    image = StringField()
    sentiment_score = FloatField()  # Added for AI analysis
    relevance_score = FloatField()  # Added for AI analysis
    topics = StringField()  # Added for AI analysis - comma-separated topics

    meta = {'collection': 'ai_news'}


# --- NEW FUNCTION: Search Unsplash ---
def search_unsplash_image(query: str, api_key: str) -> str | None:
    """Searches Unsplash for an image based on the query and returns a URL."""
    if not api_key:
        logging.warning("Unsplash API key not provided. Cannot search for fallback images.")
        return None
    if not query:
        logging.warning("No query provided for Unsplash search.")
        return None

    search_url = "https://api.unsplash.com/search/photos"
    params = {
        "query": query,
        "per_page": 1,
        "orientation": "landscape", # Prefer landscape images for news typically
        "client_id": api_key
    }
    headers = {"Accept-Version": "v1"}

    try:
        response = requests.get(search_url, params=params, headers=headers, timeout=10)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
        data = response.json()

        if data.get("results"):
            # Prefer 'regular' size, fallback to 'small'
            image_url = data["results"][0]["urls"].get("regular") or data["results"][0]["urls"].get("small")
            logging.info(f"Found Unsplash image for query '{query}': {image_url}")
            return image_url
        else:
            logging.warning(f"No Unsplash image found for query: '{query}'")
            return None
    except requests.exceptions.RequestException as e:
        logging.error(f"Unsplash API request failed for query '{query}': {e}")
        return None
    except Exception as e:
        logging.error(f"Error processing Unsplash response for query '{query}': {e}")
        return None
# --- END NEW FUNCTION ---

# --- SIMPLIFIED AINewsAgent (without Google Generative AI dependency) ---
class AINewsAgent:
    def __init__(self, config: dict):
        self.config = config
        self.has_llm = False
        logging.info("Running in simplified mode without AI analysis capabilities")
            
    def analyze_article(self, article: dict) -> dict:
        """Simplified version that just returns the article without analysis"""
        return article
    
    def analyze_news_batch(self, articles: List[dict]) -> List[dict]:
        """Simplified version that just returns the articles without analysis"""
        logging.info(f"Skipping AI analysis of {len(articles)} articles (running in simplified mode)")
        return articles
        
    def generate_insights(self, articles: List[dict]) -> str:
        """Simplified version that returns a basic message"""
        return f"Collected {len(articles)} AI news articles from various sources."
# --- END SIMPLIFIED CLASS ---

# Replaced fetch_ai_news function with the one from ai_news_dag.py
def fetch_ai_news():
    logging.info("Starting AI news fetching via RSS feeds (top 5 per feed)...")
    all_articles = []
    max_items_per_feed = 5

    # Load Unsplash API Key once
    load_dotenv()
    unsplash_key = os.getenv('UNSPLASH_ACCESS_KEY')
    if not unsplash_key:
        logging.warning("UNSPLASH_ACCESS_KEY not found in .env file. Fallback image search disabled.")

    feeds_to_parse = [
        {'name': 'TechCrunch AI', 'url': 'https://techcrunch.com/tag/artificial-intelligence/feed/'},
        {'name': 'Wired AI',    'url': 'https://www.wired.com/feed/tag/ai/latest/rss'},
        {'name': 'MIT Tech Review AI', 'url': 'https://www.technologyreview.com/topic/artificial-intelligence/feed/'},
        {
            'name': 'The Verge AI',
            'url': 'https://www.theverge.com/rss/index.xml',
            'filter_fn': lambda e: any(tag.get('term','').lower() in ('ai','artificial intelligence') for tag in getattr(e, 'tags', []))
        }
    ]

    for feed_info in feeds_to_parse:
        name, url = feed_info['name'], feed_info['url']
        logging.info(f"Fetching RSS feed: {name} ({url})")
        try:
            feed = feedparser.parse(url)
            if feed.bozo:
                logging.warning(f"Feedparser bozo for {name}: {feed.bozo_exception}")


            entries = feed.entries or []
            if 'filter_fn' in feed_info:
                entries = [e for e in entries if feed_info['filter_fn'](e)]

            logging.info(f"Found {len(entries)} entries in {name}. Processing top {max_items_per_feed}.")
            processed_count = 0
            for entry in entries:
                if processed_count >= max_items_per_feed:
                    break

                title = entry.get('title', 'N/A')
                link  = entry.get('link')
                if title == 'N/A' or not link:
                    logging.warning(f"Skipping entry in {name}: missing title or link.")
                    continue

                summary = entry.get('summary', '')
                image_url = None

                # --- IMAGE EXTRACTION (IMPROVED Logic) ---
                # 1. Try finding the first <img> tag in the summary HTML
                if summary:
                    soup = BeautifulSoup(summary, 'html.parser')
                    img_tag = soup.find('img')
                    if img_tag and img_tag.get('src'):
                        image_url = img_tag['src']
                        logging.debug(f"Found image via <img> tag in summary for {name}: {title[:30]}...")

                # 2. Check for media:thumbnail (specific to Wired.com format)
                if not image_url and hasattr(entry, 'media_thumbnail') and entry.media_thumbnail:
                    for media in entry.media_thumbnail:
                        if media.get('url'):
                            image_url = media.get('url')
                            logging.debug(f"Found image via media:thumbnail for {name}: {title[:30]}...")
                            break

                # 3. Check for figure/img tags with srcset (specific to MIT Tech Review format)
                if not image_url and summary:
                    # Look for img tags with srcset attribute
                    soup = BeautifulSoup(summary, 'html.parser')
                    img_tags_with_srcset = soup.select('img[srcset]')
                    for img in img_tags_with_srcset:
                        if img.get('srcset'):
                            # Extract the first URL from srcset (usually the highest resolution)
                            srcset = img.get('srcset')
                            urls = re.findall(r'(https?://[^\s]+)', srcset)
                            if urls:
                                image_url = urls[0].split(' ')[0]  # Get URL before width descriptor
                                logging.debug(f"Found image via srcset for {name}: {title[:30]}...")
                                break

                # 4. Special handling for The Verge (platform.theverge.com URLs)
                if not image_url and summary:
                    # Look for img tags with src containing platform.theverge.com
                    soup = BeautifulSoup(summary, 'html.parser')
                    verge_imgs = soup.select('img[src*="platform.theverge.com"]')
                    if verge_imgs:
                        for img in verge_imgs:
                            if img.get('src'):
                                # Clean up the URL by removing query parameters
                                src_url = img.get('src')
                                clean_url = src_url.split('?')[0] if '?' in src_url else src_url
                                image_url = clean_url
                                logging.debug(f"Found The Verge image: {image_url[:50]}...")
                                break

                # 5. Fallback to media_content
                if not image_url and 'media_content' in entry and entry.media_content:
                    for media in entry.media_content:
                         if media.get('medium') == 'image' and media.get('url'):
                             image_url = media.get('url')
                             logging.debug(f"Found image via media_content for {name}: {title[:30]}...")
                             break # Take the first image found

                # 6. Fallback to enclosure links
                if not image_url and 'links' in entry:
                    for l in entry.links:
                        if l.get('rel') == 'enclosure' and l.get('type', '').startswith('image/'):
                            image_url = l.get('href')
                            logging.debug(f"Found image via enclosure link for {name}: {title[:30]}...")
                            break

                # --- NEW: FALLBACK TO UNSPLASH SEARCH ---
                if not image_url and unsplash_key:
                    logging.info(f"No image found in feed for '{title[:50]}...'. Trying Unsplash search.")
                    # Basic keyword extraction from title
                    clean_title = re.sub(r'[^\w\s]', '', title.lower()) # Remove punctuation
                    keywords = " ".join(clean_title.split()[:5]) # Use first 5 words as query
                    image_url = search_unsplash_image(keywords, unsplash_key)
                # --- END FALLBACK ---


                # --- Skip if no image URL found after all attempts ---
                if not image_url:
                    logging.warning(f"Skipping entry in {name} (title: {title[:50]}...): No image found in feed or via Unsplash.")
                    continue # Skip this article entirely

                # --- Parse Date, Excerpt, Author (Existing Logic) ---
                # parse date
                if entry.get('published_parsed'):
                    ts = entry.published_parsed
                    published = datetime.datetime(*ts[:6], tzinfo=datetime.timezone.utc)
                else:
                    published = datetime.datetime.now(datetime.timezone.utc)

                # Basic excerpt logic from RSS feed (strip HTML for cleaner excerpt)
                plain_summary = BeautifulSoup(summary, 'html.parser').get_text(separator=' ', strip=True)
                excerpt = plain_summary[:250] + ('...' if len(plain_summary)>250 else '')
                author  = entry.get('author', 'N/A')


                all_articles.append({
                    'title':   title,
                    'link':    link,
                    'date':    published,
                    'excerpt': excerpt,
                    'source':  name,
                    'author':  author,
                    'image':   image_url, # Use extracted or Unsplash image_url
                    'body':    None
                })
                processed_count += 1
                logging.debug(f"Parsed RSS entry from {name}: {title}")
        except Exception as e:
            logging.error(f"Error processing feed {name} ({url}): {e}", exc_info=True)

    # --- Deduplication (Existing Logic) ---
    def normalize_title(t):
        t = t.lower().translate(str.maketrans('','',string.punctuation))
        return ''.join(t.split())

    seen = set()
    filtered = []
    for art in all_articles:
        norm = normalize_title(art['title'])
        if norm not in seen:
            filtered.append(art)
            seen.add(norm)
        else:
            logging.info(f"Filtered duplicate title: {art['title']}")


    logging.info(f"Finished fetching. Unique articles processed (with images): {len(filtered)}")
    return filtered

# --- NEW FUNCTION: Process and save news ---
def process_and_save_news():
    """Process and save AI news to the database"""
    logging.info("Starting scheduled AI news processing task...")
    print(f"Running scheduled news fetch at {datetime.datetime.now()}")
    
    # Load dotenv for environment variables
    load_dotenv()
    news_list = fetch_ai_news()

    if news_list:
        print(f"Fetched {len(news_list)} unique articles. Attempting to analyze with AI agent...")
        
        # --- AI Analysis with Agent ---
        try:
            # Load configuration
            config = {}
            config_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'config.json')
            if os.path.exists(config_path):
                with open(config_path, 'r', encoding="utf-8") as file:
                    config = json.load(file)
            else:
                # Fallback to environment variables
                config = {
                    'genai_api_key': os.getenv('GENAI_API_KEY'),
                    'model_name': os.getenv('GENAI_MODEL_NAME', 'gemini-1.5-pro')
                }
                
            # Initialize and use the agent
            if config.get('genai_api_key'):
                agent = AINewsAgent(config)
                news_list = agent.analyze_news_batch(news_list)
                
                # Generate insights if we have at least 3 articles
                if len(news_list) >= 3:
                    insights = agent.generate_insights(news_list)
                    print("\n=== AI NEWS INSIGHTS ===")
                    print(insights)
                    print("=======================\n")
            else:
                print("No Google Generative AI API key found. Skipping AI analysis.")
        except Exception as e:
            logging.error(f"Error during AI analysis: {e}", exc_info=True)
            print(f"Error during AI analysis: {e}")
        
        print(f"Attempting to save to MongoDB...")
        # --- Database saving logic ---
        db_host = os.getenv('MONGO_URI')

        if not db_host:
            logging.error("MONGO_URI not set in .env file. Cannot connect to database.")
            print("Error: MONGO_URI not found in .env file.")

        else:
            try:
                # Connect to the default database specified in MONGO_URI
                mongoengine.connect(host=db_host, alias='default')
                logging.info("Connected to MongoDB.")

                inserted, errors = 0, 0
                for item in news_list:
                    try:
                        # Use upsert=True to insert if not exists, update if exists based on link
                        update_data = {
                            'set__title': item['title'],
                            'set__excerpt': item['excerpt'],
                            'set__date': item['date'],
                            'set__source': item['source'],
                            'set__author': item['author'],
                            'set__image': item['image'] # Save the potentially updated image URL
                        }
                        
                        # Add AI analysis fields if they exist
                        if 'sentiment_score' in item:
                            update_data['set__sentiment_score'] = item['sentiment_score']
                        if 'relevance_score' in item:
                            update_data['set__relevance_score'] = item['relevance_score']
                        if 'topics' in item:
                            update_data['set__topics'] = item['topics']
                            
                        AINews.objects(link=item['link']).modify(
                            upsert=True,
                            **update_data
                        )
                        inserted += 1
                    except Exception as e:
                        logging.error(f"Failed upsert for {item.get('link', 'N/A')}: {e}")
                        errors += 1

                # --- NEW: Delete old news articles (older than 48 hours) ---
                try:
                    # Calculate the cutoff time (48 hours ago)
                    cutoff_time = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=48)
                    
                    # Find and delete old articles
                    old_articles = AINews.objects(date__lt=cutoff_time)
                    deleted_count = old_articles.count()
                    
                    if deleted_count > 0:
                        old_articles.delete()
                        logging.info(f"Deleted {deleted_count} news articles older than 48 hours")
                        print(f"Deleted {deleted_count} news articles older than 48 hours")
                    else:
                        logging.info("No old news articles to delete")
                except Exception as e:
                    logging.error(f"Error deleting old news articles: {e}")
                    print(f"Error deleting old news articles: {e}")
                # --- END NEW CODE ---

                print(f"Database update complete. Upserted: {inserted}, Errors: {errors}")
                logging.info(f"Finished saving news. Upserts: {inserted}, Errors: {errors}")

            except Exception as e:
                logging.error(f"MongoDB connection or operation failed: {e}", exc_info=True)
                print(f"Error connecting to or saving data in MongoDB: {e}")

            finally:
                # Disconnect from the default alias
                mongoengine.disconnect(alias='default')
                logging.info("Disconnected from MongoDB.")

    else:
        print("No articles fetched or an error occurred during fetching.")
    
    logging.info("Completed scheduled AI news processing task")

# --- NEW FUNCTION: Setup scheduler ---
def setup_scheduler():
    """Set up the scheduler to run at 9 AM EST every day"""
    # Schedule the job to run at 9 AM EST (UTC-5 or UTC-4 during DST)
    # We'll use 14:00 UTC which is 9 AM EST during standard time
    # and 15:00 UTC which is 9 AM EST during daylight saving time
    
    # Check if we're in daylight saving time
    # This is a simple check - for production you might want a more robust solution
    is_dst = time.localtime().tm_isdst > 0
    
    if is_dst:
        # During daylight saving time (EDT)
        schedule.every().day.at("13:00").do(process_and_save_news)
        logging.info("Scheduled news fetching for 9:00 AM EDT (13:00 UTC) daily")
    else:
        # During standard time (EST)
        schedule.every().day.at("14:00").do(process_and_save_news)
        logging.info("Scheduled news fetching for 9:00 AM EST (14:00 UTC) daily")
    
    # Also add an immediate run option
    logging.info("Running initial news fetch immediately")
    process_and_save_news()

# --- Main execution block ---
if __name__ == "__main__":
    print("AI News Fetcher with Scheduler")
    print("==============================")
    
    # Check if we should run in scheduler mode or one-time mode
    run_scheduler = os.getenv('RUN_SCHEDULER', 'false').lower() == 'true'
    
    if run_scheduler:
        print("Starting in scheduler mode - will run daily at 9 AM EST")
        setup_scheduler()
        
        # Keep the script running
        try:
            while True:
                schedule.run_pending()
                time.sleep(60)  # Check every minute
        except KeyboardInterrupt:
            print("Scheduler stopped by user")
    else:
        print("Running in one-time mode")
        process_and_save_news()
