from flask import Blueprint, render_template, request, redirect, url_for, flash, session, jsonify
from functools import wraps
from datetime import datetime
from models.user import User

auth_bp = Blueprint('auth', __name__)

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('user_id'):
            return jsonify({'error': 'Please log in to access this page.'}), 401
        
        user = User.objects(id=session['user_id']).first()
        if not user or not user.is_admin:
            return jsonify({'error': 'You do not have permission to access this page.'}), 403
        
        return f(*args, **kwargs)
    return decorated_function

@auth_bp.route('/api/auth/check', methods=['GET'])
def check_auth():
    if not session.get('user_id'):
        return jsonify({'isAdmin': False})
    
    user = User.objects(id=session['user_id']).first()
    return jsonify({'isAdmin': bool(user and user.is_admin)})

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.objects(username=username).first()
    
    if user and user.check_password(password):
        session['user_id'] = str(user.id)
        user.last_login = datetime.utcnow()
        user.save()
        
        return jsonify({
            'success': True,
            'isAdmin': user.is_admin
        })
    
    return jsonify({
        'success': False,
        'error': 'Invalid username or password'
    }), 401

@auth_bp.route('/api/auth/logout', methods=['GET'])
def logout():
    session.pop('user_id', None)
    return jsonify({'success': True}) 