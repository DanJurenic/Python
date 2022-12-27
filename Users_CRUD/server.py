from urllib.request import DataHandler
from flask import Flask, render_template, redirect, request, session
from user import User
app = Flask(__name__)
app.secret_key = 'keep it secret, keep it safe'


### NEVER render ALWAYS redirect on a method=['POST'] ###

# display route
@app.route('/')
def index():
    return redirect('/users')

@app.route('/users')
def users():
    return render_template("index.html",all_users=User.get_all())

@app.route('/users/new')
def users_new():
    return render_template('add_user.html')

@app.route('/users/<int:user_id>')
def detail_page(user_id):
    data = {
        'id': user_id
    }
    return render_template('details_page.html',user=User.get_one(data))

@app.route('/users/by_name')
def detail_page_by_name():
    data = {
        'first_name':session['first_name'],
        'last_name': session['last_name'],
        'email': session['email']
    }
    return render_template('details_page.html',user=User.get_one_by_name(data))

# action route
@app.route('/create',methods=['POST'])
def create():
    data = {
        'first_name':request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email']
    }
    session['first_name'] = request.form['first_name']
    session['last_name'] = request.form['last_name']
    session['email'] = request.form['email']
    User.save(data)
    return redirect("/users/by_name")

@app.route('/users/<int:user_id>/edit')
def edit_page(user_id):
    data = {
        'id': user_id
    }
    return render_template("edit_page.html", user = User.get_one(data))

@app.route('/update/<int:user_id>', methods=['POST'])
def update(user_id):
    data = {
        'id': user_id,
        "first_name":request.form['first_name'],
        "last_name": request.form['last_name'],
        "email": request.form['email'],
    }
    User.update(data)
    return redirect(f'/users/{user_id}')

@app.route('/delete/<int:user_id>')
def delete(user_id):
    data = {
        'id': user_id,
    }
    User.destroy(data)
    return redirect('/users')

## "bottom" of page
if __name__=="__main__":
    app.run(debug=True)