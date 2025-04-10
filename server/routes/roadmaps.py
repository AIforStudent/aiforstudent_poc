# blueprints/roadmaps.py
from flask import Blueprint, request, jsonify
from models.roadmap import Roadmap, serialize_roadmap
from bson import ObjectId


roadmaps = Blueprint('roadmaps', __name__)

@roadmaps.route('/', methods=['GET'])
def get_roadmaps():
    try:
        roadmap_list = Roadmap.objects()
        data = [serialize_roadmap(r) for r in roadmap_list]
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@roadmaps.route('/<string:roadmap_id>', methods=['GET'])
def get_roadmap(roadmap_id):
    try:
        # Convert string ID to ObjectId
        roadmap = Roadmap.objects.get(id=ObjectId(roadmap_id))
        return jsonify(serialize_roadmap(roadmap)), 200
    except Roadmap.DoesNotExist:
        return jsonify({'message': 'Roadmap not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@roadmaps.route('/', methods=['POST'])
def create_roadmap():
    data = request.get_json()
    try:
        roadmap = Roadmap(**data).save()
        return jsonify(serialize_roadmap(roadmap)), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@roadmaps.route('/<string:roadmap_id>', methods=['PUT'])
def update_roadmap(roadmap_id):
    data = request.get_json()
    try:
        roadmap = Roadmap.objects.get(id=roadmap_id)
        roadmap.update(**data)
        roadmap.reload()
        return jsonify(serialize_roadmap(roadmap)), 200
    except Roadmap.DoesNotExist:
        return jsonify({'message': 'Roadmap not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@roadmaps.route('/<string:roadmap_id>', methods=['DELETE'])
def delete_roadmap(roadmap_id):
    try:
        roadmap = Roadmap.objects.get(id=roadmap_id)
        roadmap.delete()
        return jsonify({'message': 'Roadmap deleted successfully'}), 200
    except Roadmap.DoesNotExist:
        return jsonify({'message': 'Roadmap not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500