from mongoengine import Document, StringField, IntField, ListField, EmbeddedDocument, EmbeddedDocumentField

class Topic(EmbeddedDocument):
    name = StringField()
    description = StringField()
    modules = IntField()

class Roadmap(Document):
    title = StringField(required=True)
    description = StringField()
    image = StringField()
    audience = StringField()
    resources = IntField()
    difficulty = StringField()
    topics = ListField(EmbeddedDocumentField(Topic))

    meta = {'collection': 'roadmaps'}
