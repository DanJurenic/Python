from ctypes.wintypes import WORD
from flask import Flask, render_template # Import Flask to allow us to create our app
app = Flask(__name__)         # Create a new instance of the Flask class called "app"

# !! This is going to move locations !! -- controllers
# return render_template('index.html')
@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/dojo')
def dojo():
    return 'Dojo!'

@app.route('/say/<name>')
def say_hi(name):
    return f'Hi {name}!'

@app.route('/repeat/<num>/<word>')
def repeat_word(num, word):
    return f'{word}\n'*int(num)
# !! End of move !!

# !! Keep this at the bottom !!
if __name__=="__main__":
    app.run(debug=True)