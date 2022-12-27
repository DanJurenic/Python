from flask import Flask, render_template, redirect, request, session
from flask_app.models.dojo import Dojo
from flask_app.models.ninja import Ninja
from flask_app import app


### NEVER render ALWAYS redirect on a method=['POST'] ###

# display route
@app.route('/')
def index():
    return redirect('/dojos')

@app.route('/dojos')
def dojos():
    return render_template("index.html",all_dojos=Dojo.get_all())


# action route
@app.route('/dojos/create',methods=['POST'])
def create_dojo():
    data = {
        'name': request.form['dojo_name']
    }

    Dojo.save(data)
    return redirect('/')

@app.route("/dojos/<int:dojo_id>" ,methods=['POST'])
def detail_page(dojo_id):
    data = {
        'id': dojo_id
    }
    return render_template("dojo_details_page.html",dojo=Dojo.get_one(data),ninjas = Ninja.get_my_ninjas(data))