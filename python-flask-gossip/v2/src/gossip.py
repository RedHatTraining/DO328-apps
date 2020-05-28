import json
import os
import random
from flask import abort, Flask, jsonify
from flask_cors import CORS
from markupsafe import escape

app = Flask(__name__)
CORS(app)

NUM_OF_NEWS = 3
DATA_FOLDER = escape(os.environ.get('DATA_FOLDER', 'data'))
ERROR_RESPONSE = int(os.environ.get('ERROR_RESPONSE', 404))

def sortByTimestamp(element):
  return element['timestamp']

@app.errorhandler(404)
def topicNotFound(error):
    return "Unable to find the specific topic", 404

@app.route('/news/<string:topic>')
def getNewsForTopic(topic):
    try:
        # Loading the file which has the topic news
        with open('./%s/%s.json' % (DATA_FOLDER, escape(topic))) as topicFile:
            news = json.load(topicFile)

        # Picking only a few elements from the list of news
        randomSelection = random.sample(news['data'], NUM_OF_NEWS)

        # Sorting the resulting list by the timestamp
        randomSelection.sort(key=sortByTimestamp)

        return jsonify(randomSelection)

    # If we can not find a file for the topic, we throw an error
    except IOError:
        abort(ERROR_RESPONSE)
