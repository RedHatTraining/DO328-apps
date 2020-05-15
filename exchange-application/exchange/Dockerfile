FROM quay.io/quarkus/centos-quarkus-maven:20.0.0-java11 AS build

WORKDIR /usr/src/app

# Cache dependencies
COPY pom.xml .
RUN mvn clean dependency:resolve

# Build native image
COPY src /usr/src/app/src
RUN mvn clean package -Pnative

## Stage 2 : create the docker final image
FROM registry.access.redhat.com/ubi8/ubi-minimal
WORKDIR /work/
COPY --from=build /usr/src/app/target/*-runner /work/application
RUN chmod 775 /work
EXPOSE 8080
CMD ["./application", "-Dquarkus.http.host=0.0.0.0"]
