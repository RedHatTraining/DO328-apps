FROM openjdk:8-jre-alpine

ENV VERTICLE_FILE maven-simplest-3.9.0-fat.jar

# Set the location of the verticles
ENV VERTICLE_HOME /usr/verticles

EXPOSE 8080

COPY target/$VERTICLE_FILE $VERTICLE_HOME/

# Launch the verticle
WORKDIR $VERTICLE_HOME

ENTRYPOINT ["sh", "-c"]

CMD ["exec java -jar $VERTICLE_FILE"]
