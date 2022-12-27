from flask import Flask, render_template, redirect, request, session
app = Flask(__name__)
app.secret_key = 'keep it secret, keep it safe'

# display route
@app.route('/')
def index():

    if not 'page_count' in session:
        session['page_count'] = 1
    else:
        session['page_count'] += 1

    return render_template('index.html')

# action route
@app.route('/destroy_session')
def submit():

    session.clear()

    return redirect('/')

# !! End of move !!

# !! Keep this at the bottom !!
if __name__=="__main__":
    app.run(debug=True)