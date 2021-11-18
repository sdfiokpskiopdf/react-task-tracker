from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  # comment this on deployment
from flask_sqlalchemy import SQLAlchemy
from os import path

db = SQLAlchemy()
DB_NAME = "database.db"


def create_app():
    app = Flask(__name__, static_url_path="", static_folder="frontend/build")
    app.config["SECRET_KEY"] = "helloworld"
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_NAME}"

    db.init_app(app)
    CORS(app)
    api = Api(app)

    from .models import Task

    create_database(app)

    @app.route("/", defaults={"path": ""})
    def serve(path):
        return send_from_directory(app.static_folder, "index.html")

    from .tasksApiHandler import TasksApiHandler, TaskApiHandler

    api.add_resource(TasksApiHandler, "/tasks")
    api.add_resource(TaskApiHandler, "/tasks/<int:task_id>")

    return app


def create_database(app):
    if not path.exists("website/" + DB_NAME):
        db.create_all(app=app)
