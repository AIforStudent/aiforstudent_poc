from mongoengine import Document, StringField, IntField, ListField, EmbeddedDocument, EmbeddedDocumentField

class Instructor(EmbeddedDocument):
    name = StringField()
    title = StringField()
    avatar = StringField()

class Course(Document):
    title = StringField(required=True)
    subtitle = StringField()
    thumbnail = StringField()
    category = StringField()
    difficulty = StringField()
    duration = StringField()
    modules = IntField()
    badges = ListField(StringField())
    instructor = EmbeddedDocumentField(Instructor)
    externalLink = StringField()

    meta = {'collection': 'courses'}
