oc new-build  openshift/java:latest~https://github.com/jonahkh/DO328-apps --context-dir=adopt-a-pup/animal-service --name=animal-service
oc new-build  openshift/java:latest~https://github.com/jonahkh/DO328-apps --context-dir=adopt-a-pup/adoption-service --name=adoption-service
oc new-build  openshift/java:latest~https://github.com/jonahkh/DO328-apps --context-dir=adopt-a-pup/shelter-service --name=shelter-service
oc new-build  openshift/java:latest~https://github.com/jonahkh/DO328-apps --context-dir=adopt-a-pup/notification-service --name=notification-service

oc new-app --template=openshift/mongodb-persistent --name=mongodb -e MONGODB_USER=developer -e MONGODB_PASSWORD=developer -e MONGODB_DATABASE=adopt-a-pup
oc new-app --name=notification-service notification-service
oc new-app --name=adoption-service adoption-service
oc new-app --name=animal-service animal-service
oc new-app --name=shelter-service shelter-service