#!/bin/sh

# All objects will be created in current namespace. I recommend uncommenting the below line
# Important - run as a user with the ability to run `oc adm policy add-scc-to-user anyuid` command
# oc new-project adopt-a-pup

# Process templates
oc create -f templates/adoption-service-template.yaml
oc create -f animal-service-template.yaml
oc create -f email-service-template.yaml
oc create -f envoy-gateway-template.yaml
oc create -f notification-service-template.yaml
oc create -f shelter-service-template.yaml

# Create service account for maildev/email-service pod so it can listen on ports 25 and 80 (25 is default smtp server port)
oc create serviceaccount maildev
oc patch dc/email-service --patch '{"spec":{"template":{"spec":{"serviceAccountName": "maildev"}}}}'
oc adm policy add-scc-to-user anyuid -z maildev

# Create apps
oc new-app --template=openshift/mongodb-persistent --name=mongodb -e MONGODB_USER=developer -e MONGODB_PASSWORD=developer -e MONGODB_DATABASE=adopt-a-pup -n adopt-a-pup
oc new-app --name=adoption-service --template=adoption-service
oc new-app --name=animal-service --template=animal-service
oc new-app --name=email-service --template=email-service
oc new-app --name=envoy-gateway --template=envoy-gateway
oc new-app --name=notification-service --template=notification-service
oc new-app --name=shelter-service --template=shelter-service

