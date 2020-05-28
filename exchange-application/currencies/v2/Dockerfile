FROM ubi8/python-36

ENV FLASK_APP="currencies.py"

COPY src /app
COPY requirements.txt /app

WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 5000

CMD [ "flask", "run", "--host=0.0.0.0"]
