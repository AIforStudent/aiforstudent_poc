from flask import Blueprint, render_template
from routes.auth import admin_required

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/')
@admin_required
def dashboard():
    return render_template('admin/dashboard.html')

@admin_bp.route('/users')
@admin_required
def users():
    return render_template('admin/users.html') 