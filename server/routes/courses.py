import json
from flask import Blueprint, jsonify, request
from models.course import Course

courses = Blueprint('courses', __name__)

@courses.route('/', methods=['GET'])
def get_courses():
    try:
        courses_list = Course.objects()
        # Convert QuerySet to a JSON serializable Python object
        courses_data = json.loads(courses_list.to_json())
        return jsonify(courses_data), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@courses.route('/<string:course_id>', methods=['GET'])
def get_course(course_id):
    try:
        course = Course.objects.get(id=course_id)
        return jsonify(course), 200
    except Course.DoesNotExist:
        return jsonify({'message': 'Course not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@courses.route('/', methods=['POST'])
def create_course():
    data = request.get_json()
    try:
        course = Course(**data).save()
        # Convert the saved document to JSON and then to a Python dict
        course_data = json.loads(course.to_json())
        return jsonify(course_data), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@courses.route('/<string:course_id>', methods=['PUT'])
def update_course(course_id):
    data = request.get_json()
    try:
        course = Course.objects.get(id=course_id)
        course.update(**data)
        course.reload()
        return jsonify(course), 200
    except Course.DoesNotExist:
        return jsonify({'message': 'Course not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@courses.route('/<string:course_id>', methods=['DELETE'])
def delete_course(course_id):
    try:
        course = Course.objects.get(id=course_id)
        course.delete()
        return jsonify({'message': 'Course deleted successfully'}), 200
    except Course.DoesNotExist:
        return jsonify({'message': 'Course not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500
