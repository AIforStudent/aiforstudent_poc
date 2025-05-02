import json
from flask import Blueprint, jsonify, request
from models.research_tool import ResearchTool
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

research_tools = Blueprint('research_tools', __name__)

@research_tools.route('/', methods=['GET'])
def get_research_tools():
    try:
        tools_list = ResearchTool.objects()
        # Convert QuerySet to a JSON serializable Python object
        tools_data = json.loads(tools_list.to_json())
        return jsonify(tools_data), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@research_tools.route('/<string:tool_id>', methods=['GET'])
def get_research_tool(tool_id):
    try:
        tool = ResearchTool.objects.get(id=tool_id)
        tool_data = json.loads(tool.to_json())
        return jsonify(tool_data), 200
    except ResearchTool.DoesNotExist:
        return jsonify({'message': 'Research tool not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@research_tools.route('/', methods=['POST'])
def create_research_tool():
    data = request.get_json()
    try:
        tool = ResearchTool(**data).save()
        # Convert the saved document to JSON and then to a Python dict
        tool_data = json.loads(tool.to_json())
        return jsonify(tool_data), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@research_tools.route('/<string:tool_id>', methods=['PUT'])
def update_research_tool(tool_id):
    data = request.get_json()
    try:
        tool = ResearchTool.objects.get(id=tool_id)
        tool.update(**data)
        tool.reload()
        tool_data = json.loads(tool.to_json())
        return jsonify(tool_data), 200
    except ResearchTool.DoesNotExist:
        return jsonify({'message': 'Research tool not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@research_tools.route('/<string:tool_id>', methods=['DELETE'])
def delete_research_tool(tool_id):
    try:
        tool = ResearchTool.objects.get(id=tool_id)
        tool.delete()
        return jsonify({'message': 'Research tool deleted successfully'}), 200
    except ResearchTool.DoesNotExist:
        return jsonify({'message': 'Research tool not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@research_tools.route('/analyze', methods=['POST'])
def analyze_prompt():
    data = request.get_json()
    prompt_text = data.get('prompt', '')
    
    if not prompt_text:
        return jsonify({'message': 'Prompt text is required'}), 400
    
    try:
        # First, get matching tools from our database
        all_tools = ResearchTool.objects()
        
        # Simple ranking algorithm (more sophisticated in real implementation)
        ranked_tools = []
        for tool in all_tools:
            score = 1  # Base score
            
            # Check for direct name mentions
            if tool.name.lower() in prompt_text.lower():
                score += 5
                
            # Check for keyword matches
            for keyword in tool.keywords:
                if keyword.lower() in prompt_text.lower():
                    score += 2
                    
            # Check for feature mentions
            for feature in tool.features:
                feature_words = feature.lower().split(' ')
                for word in feature_words:
                    if word in prompt_text.lower() and len(word) > 3:
                        score += 1
            
            ranked_tools.append({
                'id': str(tool.id),
                'name': tool.name,
                'description': tool.description,
                'features': tool.features,
                'dataSource': tool.dataSource,
                'cost': tool.cost,
                'bestFor': tool.bestFor,
                'score': score
            })
        
        # Sort by score
        ranked_tools.sort(key=lambda x: x['score'], reverse=True)
        
        # Get Gemini's analysis if API key is available
        gemini_response = None
        if GEMINI_API_KEY:
            try:
                # Initialize the Gemini model
                model = genai.GenerativeModel('gemini-pro')
                
                # Construct the prompt
                gemini_prompt = f"""
                The user is looking for AI research tools with this requirement:
                "{prompt_text}"
                
                Based on this requirement and your knowledge about AI research tools, provide:
                1. A brief analysis of what the user needs
                2. Recommendations for tools that might help
                3. Brief explanation of why these tools would be useful
                
                Keep your response concise (max 150 words).
                """
                
                # Get response from Gemini
                response = model.generate_content(gemini_prompt)
                gemini_response = response.text
            except Exception as e:
                gemini_response = f"Could not generate AI response: {str(e)}"
        
        return jsonify({
            'tools': ranked_tools[:5],  # Top 5 tools
            'summary': generate_summary(prompt_text, ranked_tools),
            'ai_analysis': gemini_response
        }), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

def generate_summary(prompt_text, ranked_tools):
    """Generate a simple summary based on the prompt and ranked tools"""
    # Default summary
    summary = "Here are research tools ranked based on your requirements. The top tools match your needs most closely."
    
    # Specific summaries based on keywords
    if 'visual' in prompt_text.lower() or 'map' in prompt_text.lower():
        summary = "Based on your interest in visual research tools, we recommend solutions that provide interactive citation maps and networks to help you discover related papers visually."
    elif 'citation' in prompt_text.lower() or 'cite' in prompt_text.lower():
        summary = "For citation analysis, we've highlighted tools that can help you understand how papers are cited and the context of those citations."
    elif 'summary' in prompt_text.lower() or 'summarize' in prompt_text.lower():
        summary = "You seem interested in summarizing research. The top-ranked tools can help process and condense information from multiple papers."
    
    return summary