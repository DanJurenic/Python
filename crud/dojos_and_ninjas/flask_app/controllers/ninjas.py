from flask import Flask, render_template, redirect, request, session
from flask_app.models.ninja import Ninja
from flask_app.models.dojo import Dojo
from flask_app import app


### NEVER render ALWAYS redirect on a method=['POST'] ###

#display route
@app.route('/ninjas')
def ninjas():
    return render_template("new_ninja.html",all_ninjas=Ninja.get_all(),all_dojos=Dojo.get_all())

# action route

# this one will be the /ninjas page where we add ninjas
@app.route('/ninjas/create',methods=['POST'])
def create_ninja():
    data = {
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'age': request.form['age'],
        'dojo_id' : request.form['dojo_location']
    }
    Ninja.save(data)
    return redirect('/')