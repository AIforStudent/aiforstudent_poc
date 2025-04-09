from mongoengine import Document, EmbeddedDocument, StringField, IntField, ListField, EmbeddedDocumentField

class Topic(EmbeddedDocument):
    # Rename from "name" to "title" to match your sample data.
    title = StringField(required=True)
    description = StringField()
    modules = IntField(required=True, min_value=1)
    link = StringField()        # External blog link for the topic
    type = StringField()        # Optional: e.g. "prerequisite", "theoretical", "practical", etc.
    time = StringField()        # Optional: e.g. "2-4 weeks" or "3-4 hours"

# If you plan to support a more structured STEM roadmap with sections,
# define a Section embedded document.
class Section(EmbeddedDocument):
    section_id = StringField(required=True)  # Unique identifier for the section
    title = StringField(required=True)
    estimatedTime = StringField()  # e.g. "2-3 weeks"
    description = StringField()
    topics = ListField(EmbeddedDocumentField(Topic))

class Roadmap(Document):
    title = StringField(required=True)
    description = StringField()
    image = StringField()         # URL or file path to the image
    audience = StringField()      # e.g., "STEM Students", "Developers", etc.
    resources = IntField(min_value=0, default=0)
    difficulty = StringField(choices=["Beginner", "Intermediate", "Advanced"], default="Beginner")
    # For simpler roadmaps, use a flat topics array:
    topics = ListField(EmbeddedDocumentField(Topic))
    # For roadmaps that need a structured breakdown (e.g., STEM), use sections:
    sections = ListField(EmbeddedDocumentField(Section))
    content = StringField()       # Optional additional content for the detail page
    
    meta = {'collection': 'roadmaps'}
    
    
def serialize_topic(topic):
    return {
        "title": topic.title,
        "description": topic.description,
        "modules": topic.modules,
        "link": topic.link,
        "type": topic.type,
        "time": topic.time
    }

def serialize_section(section):
    return {
        "section_id": section.section_id,
        "title": section.title,
        "estimatedTime": section.estimatedTime,
        "description": section.description,
        "topics": [serialize_topic(t) for t in section.topics] if section.topics else []
    }

def serialize_roadmap(roadmap):
    return {
        "id": str(roadmap.id),
        "title": roadmap.title,
        "description": roadmap.description,
        "image": roadmap.image,
        "audience": roadmap.audience,
        "resources": roadmap.resources,
        "difficulty": roadmap.difficulty,
        "topics": [serialize_topic(t) for t in roadmap.topics] if roadmap.topics else [],
        "sections": [serialize_section(s) for s in roadmap.sections] if roadmap.sections else [],
        "content": roadmap.content if roadmap.content else ""
    }