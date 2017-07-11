from flask import Flask, flash, redirect, render_template, request, session, abort, send_file, send_from_directory
from datetime import datetime
import time
import json
from process_nouns import *

app = Flask(__name__)
# prepare log file
log_file_name = "log_"+str(time.strftime("%d_%m_%Y"))+".txt"
log_file = open(log_file_name, 'w')
log_file.write(str(datetime.now())+" == System: open log file.")


input_file = ""


# URL routing
## root directory:  /
@app.route("/")
def index():
    log_file.write(str(datetime.now())+" == System: python function routing in here!\n")
    return render_template(
        'Index.html')



@app.route('/postmethod', methods = ['POST'])
def get_post_javascript_data():
    jsdata = request.form['javascript_data']
    input_file = jsdata
    #print("====================================\n\n\n")
    #print(input_file)  
    # process input file
    last_show = str(input_file).rfind("/")
    input_file = str(input_file)[last_show+1:]
    #print("remove path: "+input_file)
    preprocessing_text_file(input_file)
    return jsdata    

##tool ui: /ui/index.html
@app.route("/ui")
def ui():
    log_file.write(str(datetime.now())+" == System: run python script for chosen file\n")
    # read assigned file here
    print("====================================\n\n\n")
    print(input_file)
    #preprocessing_text_file(input_file)
    
    return render_template(
        'ui/index.html')  

@app.route("/Text_sample/<path:path>")
def send_text_file(path):
    log_file.write(str(datetime.now())+" == System: read file\n")
    return send_from_directory('Text_sample', path)

@app.route("/Img/<path:path>")
def send_image_file(path):
    log_file.write(str(datetime.now())+" == System: read Image\n")
    return send_from_directory('Img', path)
            
# app starts from here
if __name__ == "__main__":
    # record tool log for tracking the system
    app.run(host='0.0.0.0', port=8116)
    # close log file after finish
    log_file.close()