from mongoengine import Document, StringField, ListField, FloatField, BooleanField, EmbeddedDocument, EmbeddedDocumentField, EmbeddedDocumentListField

class Feature(EmbeddedDocument):
    name = StringField(required=True)
    
class ResearchTool(Document):
    name = StringField(required=True)
    description = StringField(required=True)
    features = ListField(StringField())
    dataSource = StringField()
    cost = StringField()
    bestFor = StringField()
    fullDescription = StringField()
    shortDescription = StringField()
    website = StringField()
    keywords = ListField(StringField())
    
    meta = {'collection': 'research_tools'}