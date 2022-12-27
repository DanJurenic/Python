from flask import Flask, render_template, redirect, request, session, flash
from flask_app.models.user import User
from flask_app import app, bcrypt


@app.route('/register/user', methods=['POST'])
def register():
    # validate the form here ...
    # create the hash
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    print(pw_hash)
    # put the pw_hash into the data dictionary
    data = {
        "username": request.form['username'],
        "password" : pw_hash
    }
    # Call the save @classmethod on User
    user_id = User.save(data)
    # store user id into session
    session['id'] = user_id
    return redirect("/dashboard")

### NEVER render ALWAYS redirect on a method=['POST'] ###

# display route
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/success')
def detail_page():
    if not session['id']:
        return redirect('/')
    
    data = {
        'id': session['id']
    }
    return render_template('welcome.html',user=User.get_one(data))

# action route
@app.route('/users/create',methods=['POST'])
def create():
    
    if not User.validate_user_reg(request.form):
        return redirect('/')

    pw_hash = bcrypt.generate_password_hash(request.form['password'])

    data = {
        **request.form
    }
    data['password'] = pw_hash
    session['id']=User.save(data)
    return redirect("/success")

@app.route('/users/login',methods=['POST'])
def login():

    if not User.validate_user_login(request.form):
        return redirect('/')

    # see if the username provided exists in the database
    data = { "email" : request.form["email"] }
    user_in_db = User.get_by_email(data)
    # user is not registered in the db
    if not user_in_db:
        flash("Invalid Email/Password")
        return redirect("/")
    if not bcrypt.check_password_hash(user_in_db.password, request.form['password']):
        # if we get False after checking the password
        flash("Invalid Email/Password")
        return redirect('/')
    # if the passwords matched, we set the id into session
    session['id'] = user_in_db.id
    # never render on a post!!!

    return redirect('/success')

@app.route('/users/logout')
def logout():
    session['id'] = ""
    return redirect('/')