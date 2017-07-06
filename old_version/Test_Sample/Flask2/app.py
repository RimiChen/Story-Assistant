from flask import render_template
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
  school_count = 350
  return render_template('index.html', count=school_count)

if __name__ == '__main__':
    app.run(debug=True)