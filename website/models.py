from . import db


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200))
    day = db.Column(db.String(200))
    reminder = db.Column(db.Boolean)

    def json(self):
        return {
            "id": self.id,
            "text": self.text,
            "day": self.day,
            "reminder": self.reminder,
        }
