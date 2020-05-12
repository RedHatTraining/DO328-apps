import http
import json
import os
from flask import abort, Flask, request
from requests import get

app = Flask(__name__)

HEADERS_FILE_PATH = './data/headers.json'
INGRESS_GATEWAY = os.environ.get('INGRESS_GATEWAY')

@app.errorhandler(404)
def topicNotFound(error):
    return 'Route not found', 404

@app.route('/headers', methods=['POST'])
def setHeaders():
    newHeaders = request.get_json()

    with open(HEADERS_FILE_PATH, 'w') as headersFile:
        json.dump(newHeaders, headersFile)

    return '', http.HTTPStatus.NO_CONTENT

@app.route('/headers', methods=['DELETE'])
def deleteHeaders():
    with open(HEADERS_FILE_PATH, 'w') as headersFile:
        json.dump({}, headersFile)

    return '', http.HTTPStatus.NO_CONTENT

@app.route('/headers', methods=['GET'])
def getHeaders():
    try:
        with open(HEADERS_FILE_PATH) as headersFile:
            return json.load(headersFile)
    except IOError:
        abort(404)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
  with open(HEADERS_FILE_PATH) as headersFile:
    customHeaders = json.load(headersFile)

  return get(f'{INGRESS_GATEWAY}{path}', headers=customHeaders).content
