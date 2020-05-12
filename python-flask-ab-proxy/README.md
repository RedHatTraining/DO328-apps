# AB Proxy

The AB Proxy is a small application written in [Python](https://www.python.org/) + [Flask](https://flask.palletsprojects.com) 
which acts as a proxy for an endpoint and appends custom headers to all requests. 

## How it works

The application exposes several endpoints to manage the behaviour of the proxy:
 
 - `GET /headers`: returns the list of headers the proxy is going to add to all requests.
 - `DELETE /headers`: removes any configuration.
 - `POST /headers`: sets the list of headers the proxy is going to add to all requests.

Setting headers example:
```  
curl -d '{"version":"beta"}' -H "Content-Type: application/json" -X POST http://localhost:5000/headers
```
## Installation

The AB proxy is a Python application with Flask so, in order to run in your local machine you need Python + some 
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

## Running the AB proxy in local

To run the AB proxy in local, execute the following commands:

```
$ cd src  
$ export FLASK_APP=ab-proxy.py  
$ flask run 
```
 
 ## Running the AB proxy in a containers environment
 
In order to run the AB proxy in a containers environment you need a container image. A prebuilt image is
available in [quay.io](https://quay.io/repository/redhattraining/ossm-ab-proxy)
 