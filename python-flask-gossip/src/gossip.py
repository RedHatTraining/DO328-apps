import json
import random
from flask import abort, Flask, jsonify
from flask_cors import CORS
from markupsafe import escape

app = Flask(__name__)
CORS(app)

NUM_OF_NEWS = 3

def sortByTimestamp(element):
  return element['timestamp']

@app.errorhandler(404)
def topicNotFound(error):
    return "Unable to find the specific topic", 404

@app.route('/news/<string:topic>')
def getNewsForTopic(topic):
    try:
        # Loading the file which has the topic news
        with open('./data/%s.json' % escape(topic)) as topicFile:
            news = json.load(topicFile)

        # Picking only a few elements from the list of news
        randomSelection = random.sample(news['data'], NUM_OF_NEWS)

        # Sorting the resulting list by the timestamp
        randomSelection.sort(key=sortByTimestamp)

        return jsonify(randomSelection)

    # If we can not find a file for the topic, we throw a 404 error
    except IOError:
        abort(404)
