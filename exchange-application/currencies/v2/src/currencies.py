import os
from flask import abort, Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ERROR_DIVISOR = int(os.environ.get('ERROR_DIVISOR', 0))
ERROR_RESPONSE = int(os.environ.get('ERROR_RESPONSE', 500))

requestsCounter = 0

def failCheck():
    global requestsCounter
    if ERROR_DIVISOR and requestsCounter % ERROR_DIVISOR != 0 :
        abort(ERROR_RESPONSE)

def trackRequest():
    global requestsCounter
    requestsCounter += 1

@app.route('/')
def currenciesList():
    trackRequest()
    failCheck()

    return jsonify('EUR', 'USD')
