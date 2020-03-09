from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def currenciesList():
    return jsonify('EUR', 'USD')
