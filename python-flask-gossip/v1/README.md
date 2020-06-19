# Gossip Service

The Gossip Service is a small application written in [Python](https://www.python.org/) + [Flask](https://flask.palletsprojects.com) 
which exposes a variable endpoint in order to retrieve news from a specific topic. It Comes with CORS enabled so it can 
be used from browsers.

## How it works

The application exposes a `GET` endpoint `/news/<topic>` on port `5000` by default. Once a GET request hits the service, 
the application uses the `<topic>` part of the endpoint to find a json file with that name. 

In the case of not being able to locate a file with the `<topic>` name, the application throws a 404 error. In any other 
case, the application loads the list of news from the json file, picks 3 randomly and returns the list sorted by their 
timestamp.

Template of the json used to store the news:
```json
{
  "data": [
    {
      "anyFieldKey": "anyFieldValue",
      "timestamp": 1578454302
    }
  ]
}
```

The only requirements for the json files are:
- Be a well formed JSON file
- The `data` field should exists and stores the list of news objects
- Each news element should have a `timestamp` field

## Installation

The Gossip Service is a Python application with Flask so, in order to run in your local machine you need Python + some 
libraries.

A simple approach is to have different Python virtual environments per project. Execute the following command in the
root of this project ot install a virtual environment:
 
```
$ python3 -m virtualenv venv
```

Once the virtual environment is installed in the project, you need to activate this new virtual environment. Execute the 
following command to activate it:

```
. venv/bin/activate
```

After the activation of the virtual environment you need to install all the requirements for the service (unless you did
this step before). Execute the following command to install all the required libraries:

```
pip install -r requirements.txt
```

## Running Gossip in local

To run the Gossip Service in local, execute the following commands:

```
$ cd src  
$ export FLASK_APP=gossip.py  
$ flask run 
```
 
 ## Running Gossip in a containers environment
 
In order to run the Gossip Service in a containers environment you need a container image. A prebuilt image is
available in [quay.io](https://quay.io/repository/redhattraining/ossm-python-flask-gossip)
 