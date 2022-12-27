from flask_app.config.mysqlconnection import MySqlConnection, connectToMySQL
from flask import flash, session
from flask_app import DATABASE, bcrypt
import re

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 

@classmethod
def get_one_by_email(cls, data):
    query = "SELECT * FROM users WHERE email = %(email)s"
    result = connectToMySql(DATABASE).query_db(query, data)

@staticmethod
def validator(data:dict):
    is_valid = True

    if len(data['first_name']) < 1:
        is_valid = False
        flash("Field is required", "err_user_first_name")

    if len(data['last_name']) < 1:
        is_valid = False
        flash("Field is required", "err_user_last_name")

    if len(data['email']) < 1:
        is_valid = False
        flash("Field is required", "err_user_email")
    elif not EMAIL_REGEX.match(data['email']):
            flash("Invalid email address!", "err_user_email")
            is_valid = False
    else:
        potential_user = User.get_one_by_email({'email': data['email']})
        if potential_user:
            flash("Email already in use!", "err_user_email")
            is_valid = False

    if len(data['password']) < 1:
        is_valid = False
        flash("Field is required", "err_user_password")

    if len(data['confirm_password']) < 1:
        is_valid = False
        flash("Field is required", "err_user_confirm_password")

    if data['confirm_password'] != data['password']:
        is_valid = False
        flash("Passwords do not match", "err_user_confirm_password")

    return is_valid

@staticmethod
def validator_login(data:dict):
    is_valid = True

    if len(data['email']) < 1:
        is_valid = False
        flash("Field is required", "err_user_login_email")
    elif not EMAIL_REGEX.match(data['email']):
            flash("Invalid email address!", "err_user_login_email")
            is_valid = False
    else:
        potential_user = User.get_one_by_email({'email': data['email']})
        if not potential_user:
            flash("Email already not found!", "err_user_login_email")
            is_valid = False

    if len(data['password']) < 1:
        is_valid = False
        flash("Field is required", "err_user_login_password")

    if is_valid:
        # check the password
        if not bcrypt.check_password_hash(potential_user.password, data['password']):
            flash("Invalid Credentials!", "err_user_login_password")
            is_valid = False
        else:
            session['id'] = potential_user.id

    return is_valid