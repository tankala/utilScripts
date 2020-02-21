# Usual imports
from flask import Flask
import os,signal

# Flask constructor takes the name of current module (__name__) as argument.
app = Flask(__name__)

page_view_counter = 0
counter_file_name = "visitor_counter.txt"


def init():
    """
    Page view counter loads from the file 
    where we stored last time when the application stopped.
    """
    global page_view_counter
    if os.path.exists(counter_file_name):
        counter_file = open(counter_file_name, "r")
        counter = counter_file.read()
        page_view_counter = int(counter)
        counter_file.close()

def on_stop(*args):
    """
    This function is triggered when the application stops and 
    then writes the current page view counter into the file for future use.
    """
    global page_view_counter
    counter_file = open(counter_file_name, "w")
    counter_file.write(str(page_view_counter))
    counter_file.close()

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/hello/<name>")
def hello_there(name):
    """
    This function triggers when the hello route is called.
    This takes the value next to \/hello\/ as argument and 
    forms greeting text with the current page view counter.
    """
    global page_view_counter
    page_view_counter += 1
    content = "Hello there, " + name + "! This page viewed so far " + str(page_view_counter) + " time(s)"
    return content

if __name__ == "__main__":
    """
    This is where code execution starts when the application starts.
    It calls the init() method to load page view counter where we ended last time and 
    convey at what port we need to start the flask application too.
    """
    init()
    app.run(port=1234, threaded=True)

# Adding function on_stop() as listener function when the application stops.
signal.signal(signal.SIGTERM, on_stop)
os.kill(os.getpid(), signal.SIGTERM)