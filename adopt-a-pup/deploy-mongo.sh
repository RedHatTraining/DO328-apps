#!/bin/bash

#oc import-image rhscl/mongodb-36-rhel7 --from=registry.access.redhat.com/rhscl/mongodb-36-rhel7 --confirm

oc process -n adopt-a-pup -f templates/mongodb-template.yaml \
-p MONGODB_USER=developer \
-p MONGODB_PASSWORD=developer \
-p MONGODB_DATABASE=adopt-a-pup \
-p MONGODB_ADMIN_PASSWORD=redhat \
| oc apply -n adopt-a-pup -f -
