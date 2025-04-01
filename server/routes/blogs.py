import json
from flask import Blueprint, request, jsonify
from models.blog_post import BlogPost

blogs = Blueprint('blogs', __name__)

@blogs.route('/', methods=['GET'])
def get_blogs():
    try:
        posts = BlogPost.objects()
        # Convert QuerySet to a JSON serializable Python object
        posts_data = json.loads(posts.to_json())
        return jsonify(posts_data), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@blogs.route('/<string:post_id>', methods=['GET'])
def get_blog(post_id):
    try:
        post = BlogPost.objects.get(id=post_id)
        # Convert the document to a Python dict before returning
        return jsonify(json.loads(post.to_json())), 200
    except BlogPost.DoesNotExist:
        return jsonify({'message': 'Blog not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@blogs.route('/', methods=['POST'])
def create_blog():
    data = request.get_json()
    try:
        blog = BlogPost(**data).save()
        # Convert the saved document to a Python dict
        blog_data = json.loads(blog.to_json())
        return jsonify(blog_data), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@blogs.route('/<string:post_id>', methods=['PUT'])
def update_blog(post_id):
    data = request.get_json()
    try:
        blog = BlogPost.objects.get(id=post_id)
        blog.update(**data)
        blog.reload()
        return jsonify(json.loads(blog.to_json())), 200
    except BlogPost.DoesNotExist:
        return jsonify({'message': 'Blog not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@blogs.route('/<string:post_id>', methods=['DELETE'])
def delete_blog(post_id):
    try:
        blog = BlogPost.objects.get(id=post_id)
        blog.delete()
        return jsonify({'message': 'Blog deleted successfully'}), 200
    except BlogPost.DoesNotExist:
        return jsonify({'message': 'Blog not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500
