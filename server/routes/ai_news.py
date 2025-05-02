import json
from flask import Blueprint, request, jsonify
from models.ai_news import AINews

ai_news = Blueprint('ai_news', __name__)

def serialize(doc):
    """Convert a MongoEngine document (or QuerySet) to a Python dict/list."""
    return json.loads(doc.to_json())

@ai_news.route('/', methods=['GET'], strict_slashes=False)
def get_ai_news():
    try:
        # Sort by date in descending order (newest first)
        news_items = AINews.objects().order_by('-date')
        # Convert QuerySet to a JSON serializable Python object
        news_data = serialize(news_items)
        return jsonify(news_data), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@ai_news.route('/<string:news_id>', methods=['GET'], strict_slashes=False)
def get_news_item(news_id):
    try:
        news_item = AINews.objects.get(id=news_id)
        return jsonify(serialize(news_item)), 200
    except AINews.DoesNotExist:
        return jsonify({'message': 'News item not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@ai_news.route('/', methods=['POST'], strict_slashes=False)
def create_news_item():
    data = request.get_json()
    try:
        news_item = AINews(**data).save()
        # Convert the saved document to a Python dict
        return jsonify(serialize(news_item)), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@ai_news.route('/<string:news_id>', methods=['PUT'], strict_slashes=False)
def update_news_item(news_id):
    data = request.get_json()
    try:
        news_item = AINews.objects.get(id=news_id)
        news_item.update(**data)
        news_item.reload()
        return jsonify(serialize(news_item)), 200
    except AINews.DoesNotExist:
        return jsonify({'message': 'News item not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@ai_news.route('/<string:news_id>', methods=['DELETE'], strict_slashes=False)
def delete_news_item(news_id):
    try:
        news_item = AINews.objects.get(id=news_id)
        news_item.delete()
        return jsonify({'message': 'News item deleted successfully'}), 200
    except AINews.DoesNotExist:
        return jsonify({'message': 'News item not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500
