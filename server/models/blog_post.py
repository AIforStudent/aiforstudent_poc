import datetime
from mongoengine import Document, StringField, DateTimeField, ListField, EmbeddedDocument, EmbeddedDocumentField, IntField

class Author(EmbeddedDocument):
    name = StringField(required=True)
    avatar = StringField()
    title = StringField()

class BlogPost(Document):
    title = StringField(required=True)
    excerpt = StringField()
    coverImage = StringField()
    category = StringField()
    author = EmbeddedDocumentField(Author)
    date = DateTimeField(default=datetime.datetime.utcnow)
    readTime = IntField()
    tags = ListField(StringField())
    externalLink = StringField()

    meta = {'collection': 'blog_posts'}
