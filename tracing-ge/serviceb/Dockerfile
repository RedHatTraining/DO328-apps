####
# This Dockerfile is used in order to build a container that runs the Quarkus application in JVM mode
#
# Before building the docker image run:
#
# mvn clean package
#
# Then, build the image with:
#
# docker build -t <your_tag> .
#
# Then run the container using:
#
# docker run -i --rm -p 8080:8080 <your_tag>
#
###
FROM registry.access.redhat.com/ubi8:8.1

ENV JAVA_OPTIONS="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV AB_ENABLED=jmx_exporter

# Be prepared for running in OpenShift too
RUN mkdir /deployments \
  && adduser -G root --no-create-home -u 1001 quarkus \
  && chown -R 1001 /deployments \
  && chmod -R "g+rwX" /deployments \
  && chown -R 1001:root /deployments

RUN yum -y install java-1.8.0-openjdk-devel

COPY target/*-runner.jar /deployments/app.jar
EXPOSE 8080 8778 9779

# run with user 1001
USER 1001

CMD ["java","-jar","/deployments/app.jar"]
