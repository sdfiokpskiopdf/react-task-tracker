from flask_restful import Api, Resource, reqparse
from .models import Task
from . import db


class TasksApiHandler(Resource):
    def get(self):
        data = [task.json() for task in Task.query.all()]
        return data

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("day")
        parser.add_argument("reminder", type=bool)
        parser.add_argument("text")
        args = parser.parse_args()

        task = Task(text=args["text"], day=args["day"], reminder=args["reminder"])
        db.session.add(task)
        db.session.commit()

        return task.json(), 201


class TaskApiHandler(Resource):
    def get(self, task_id):
        task = Task.query.filter_by(id=task_id).first()
        return task.json()

    def put(self, task_id):
        parser = reqparse.RequestParser()
        parser.add_argument("day")
        parser.add_argument("reminder", type=bool)
        parser.add_argument("text")
        args = parser.parse_args()

        task = Task.query.filter_by(id=task_id).first()
        task.day = args["day"]
        task.reminder = args["reminder"]
        task.text = args["text"]

        db.session.add(task)
        db.session.commit()

        return task.json(), 201

    def delete(self, task_id):
        task = Task.query.filter_by(id=task_id).first()
        db.session.delete(task)
        db.session.commit()

        return task.json(), 201
