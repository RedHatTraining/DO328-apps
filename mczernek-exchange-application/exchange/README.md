# Exchange project

This project uses Quarkus, the Supersonic Subatomic Java Framework.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .


## Packaging and running the application

The application is packageable using `mvn clean package`.
It produces the executable `exchange-1.0-SNAPSHOT-runner.jar` file in `/target` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/lib` directory.

The application is now runnable using `java -jar target/exchange-1.0-SNAPSHOT-runner.jar`.

## Creating a native executable

A dockerfile was created for building a native executable. 

Execute `podman build -t $quay_registry/exchange:$version .` to build a native executable.
