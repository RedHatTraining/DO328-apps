# The "oc" commands in this script can be run to create the adopt-a-pup application. This will deploy all of the backend services including adoption, shelter, animal, and notification services. It will also build a fake smtp service that can be used to test email delivery

oc new-project adopt-a-pup

oc new-build  openshift/java:latest~https://github.com/jonahkh/DO328-apps --context-dir=adopt-a-pup/animal-service --name=animal-service -n adopt-a-pup
oc new-build  openshift/java:latest~https://github.com/jonahkh/DO328-apps --context-dir=adopt-a-pup/adoption-service --name=adoption-service -n adopt-a-pup
oc new-build  openshift/java:latest~https://github.com/jonahkh/DO328-apps --context-dir=adopt-a-pup/shelter-service --name=shelter-service -n adopt-a-pup
oc new-build  openshift/java:latest~https://github.com/jonahkh/DO328-apps --context-dir=adopt-a-pup/notification-service --name=notification-service -n adopt-a-pup

# Run these after the builds have completed so that the image streams can be created
oc new-app --template=openshift/mongodb-persistent --name=mongodb -e MONGODB_USER=developer -e MONGODB_PASSWORD=developer -e MONGODB_DATABASE=adopt-a-pup -n adopt-a-pup
oc new-app --name=notification-service adopt-a-pup/notification-service -n adopt-a-pup
oc new-app --name=adoption-service adopt-a-pup/adoption-service -n adopt-a-pup
oc new-app --name=animal-service adopt-a-pup/animal-service -n adopt-a-pup
oc new-app --name=shelter-service adopt-a-pup/shelter-service -n adopt-a-pup

# Do this to allow the maildev pod to listen on port 25
oc create serviceaccount maildev
oc patch dc/email-service --patch '{"spec":{"template":{"spec":{"serviceAccountName": "maildev"}}}}'
oc adm policy add-scc-to-user anyuid -z maildev

# This is a custom-built image from https://github.com/maildev/maildev. Currently public in quay.io/redhattraining
oc new-app --name=email-service quay.io/redhattraining/maildev:latest