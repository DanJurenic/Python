from flask import render_template, redirect, session, request

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