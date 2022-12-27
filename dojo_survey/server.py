from flask import Flask, render_template, redirect, request, session
app = Flask(__name__)
app.secret_key = 'keep it secret, keep it safe'

# display route
@app.route('/')
def index():
    return render_template('index.html')

# action route
@app.route('/result', methods = ['post'])
def process():
    return render_template('result.html')

# !! End of move !!

# !! Keep this at the bottom !!
if __name__=="__main__":
    app.run(debug=True)