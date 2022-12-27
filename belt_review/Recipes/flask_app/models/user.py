# import the function that will return an instance of a connection
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
import re
from flask_app import bcrypt

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
# model the class after the friend table from our database
class User:
    def __init__( self , data ):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
    # Now we use class methods to query our database
    @classmethod
    def get_all(cls):
        query = "SELECT * FROM users;"
        # make sure to call the connectToMySQL function with the schema you are targeting.
        results = connectToMySQL('lnr_users_db').query_db(query)
        # Create an empty list to append our instances of friends
        users = []
        # Iterate over the db results and create instances of friends with cls.
        for user in results:
            users.append( cls(user) )
        return users
            
    @classmethod
    def save(cls,data):
        query = "INSERT INTO users (first_name, last_name, email,password, created_at,updated_at) VALUES (%(first_name)s,%(last_name)s,%(email)s,%(password)s,NOW(),NOW())"
        return connectToMySQL('lnr_users_db').query_db(query,data)

    @classmethod
    def get_one(cls,data):
        query = "SELECT * FROM users WHERE users.id = %(id)s;"
        user_from_db = connectToMySQL('lnr_users_db').query_db(query,data)

        return cls(user_from_db[0])

    @classmethod
    def get_by_email(cls,data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        result = connectToMySQL("lnr_users_db").query_db(query,data)
        # Didn't find a matching user
        if len(result) < 1:
            return False
        return cls(result[0])

    @staticmethod
    def validate_user_reg(data):
        is_valid = True # we assume this is true
        # validate first name
        if len(data['first_name']) < 2 or not data['first_name'].isalpha():
            flash('First name must be at least 2 characters.', 'first_name_reg')
            is_valid = False
        # validate last name
        if len(data['last_name']) < 2 or not data['last_name'].isalpha():
            flash('Last name must be at least 2 characters.', 'last_name_reg')
            is_valid = False
        # validate email
        if not EMAIL_REGEX.match(data['email']): 
            flash('Invalid email address!', 'email_reg')
            is_valid = False
        query = "SELECT * FROM users WHERE users.email = %(email)s;"
        if connectToMySQL('lnr_users_db').query_db(query,data):
            flash('Email address associated with existing user', 'email_reg')
            is_valid = False
            # validate password
        if len(data['password']) < 8:
            flash('Password must be at least 8 characters.', 'password_reg')
            is_valid = False
        # confirm password matches confirm password field
        if data['password'] != data['confirm_password']:
            flash('Passwords do not match.', 'confirm_password_reg')
            is_valid = False
        return is_valid

    @staticmethod
    def validate_user_login(data):
        is_valid = True # we assume this is true
        # validate email
        if not EMAIL_REGEX.match(data['email']): 
            flash('Invalid email address!', 'email_login')
            is_valid = False
        query = "SELECT * FROM users WHERE users.email = %(email)s;"
        email_from_db = connectToMySQL('lnr_users_db').query_db(query,data)
        if not data['email']:
            flash('Invalid email address!', 'email_login')
            is_valid = False
        elif data['email'] != email_from_db[0]['email']:
            flash('Invalid email address!', 'email_login')
            is_valid = False
            # validate password
        return is_valid