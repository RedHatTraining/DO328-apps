# serviceb microservice

This is a simple microservice that responds with a string message.

This project uses `Quarkus`, the Supersonic Subatomic Java Framework.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```
mvn clean package quarkus:dev
```

## Packaging and running the application

The application is packageable using `mvn clean package`.
It produces the executable `serviceb-1.0.0-runner.jar` file in `/target` directory.

The application is now runnable using `java -jar target/serviceb-1.0.0-runner.jar`.

## Creating a native executable

You can create a native executable using: `mvn clean package -Pnative`.

Or you can use Docker to build the native executable using: `mvn clean package -Pnative -Dquarkus.native.container-build=true`.

You can then execute your binary: `./target/serviceb-1.0.0-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/building-native-image-guide .