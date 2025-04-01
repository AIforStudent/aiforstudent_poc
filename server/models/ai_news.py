import datetime
from mongoengine import Document, StringField, DateTimeField

class AINews(Document):
    title = StringField(required=True)
    excerpt = StringField()
    link = StringField()
    date = DateTimeField(default=datetime.datetime.utcnow)
    source = StringField()
    author = StringField()
    image = StringField()

    meta = {'collection': 'ai_news'}
