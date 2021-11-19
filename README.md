# react-task-tracker
a Full-Stack Task tracker app built with ReactJS, Flask, and SQL.

This project was done to practice my newfound ReactJS skills. I am aware this website makes no sense in production because it is just using one database that anyone can edit.

# Backend

The backend is built in flask and interacts with an SQL Database. There are API endpoints in the flask app that read and write to the database and return JSON information for the frontend to read. The main parts of the backend are:


```
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
```

These classes use flask-sqlalchemy to interact with the database.

# Frontend
This was my first time working in reactJS so I followed a tutorial for most of the UI. The Javascript frontend sends requests to my flask server to send and recieve information, which it then uses to update state, thus re-rendering the tasks component. An example is the frontend function used to add a new task:

```
//Add Task 
    const addTask = async (task) => {
        console.log(task)
        const res = await fetch(`http://192.168.0.19:5000/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(task) })
        const data = await res.json()
        console.log(data)

        setTasks([...tasks, data])
    }
```

This uses the javascript `fetch` method to post a new JSON task object to the server, which then adds the object to the server, and finally returns the newly created object. It then sets the state to the returned object. I don't know if I should be doing it like this, or updating the UI first and then sending the requesst, to make the website feel more responsive. I've just left it like this as it's what i've seen from looking at most code.

