from flask import render_template, redirect, request, session
from flask_app import app, bcrypt

# Action route

@app.route('/users/create',methods=['POST'])
def create():
    # validate
    if not User.validator(request.form):
        return redirect('/')
    # hash password
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    #add to db
    data = {
        **request.form,
        'pasword': pw_hash
    }
    id=User.save(data)
    session['id']=id
    return redirect("/success")

@app.route('/users/login',methods=['POST'])
def login():
    #validate
    if not User.validator_login(request.form):
        return redirect('/')

    return redirect('/success')

@app.route('/users/logout')
def logout():
    session['id'] = ""
    return redirect('/')
