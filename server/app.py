from flask import Flask

def create(test_source=None):
    app = Flask(__name__)

    @app.route("/")
    def hello_world():
        return "<p>Hello, World!</p>"

    return app