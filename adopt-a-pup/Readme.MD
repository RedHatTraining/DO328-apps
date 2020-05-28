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

## Load data into Mongo
# There is dummy data in the adopt-a-pup/mongo-data directory that can be imported into the newly created mongo instance
# You must have mongodb-org installed (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)

oc port-forward <mongo-pod-name> 27017:27017
mongoimport --db=adopt-a-pup --collection=animals --username=developer --password=developer adopt-a-pup/mongo-data/animals.mongo 
mongoimport --db=adopt-a-pup --collection=shelters --username=developer --password=developer adopt-a-pup/mongo-data/shelters.mongo

# Swagger
<ocp-host>/swagger-ui.html for all of them

# There are now two shelters each with 2 animals created.

Denver Doggos: e038ae3c-592f-403e-9233-4b6eeab30e3c
    - Harvey: e22d494c-c2be-4d32-bceb-ec675fd5540a
    - Gus: d52a8d58-9024-49dd-92b6-d443c6049ffe
Minneapolis Mutts: 6a432062-96a4-4a66-b888-1ab7225e6b2c
    - Theo: b62977ad-fe79-4480-a550-06f717923017
    - Winston: aac7ea0a-2374-4d4b-8d3a-71e4f896e751
    
Once all the data has been loaded and the application is running, you can test by applying for adoption with the following request:

curl -X POST "http://{{adoption-service-host}}/adoption/applyForAdoption" -H "accept: */*" -H "Content-Type: application/json" -d "{ \"animalId\": \"e22d494c-c2be-4d32-bceb-ec675fd5540a\", \"email\": \"harvey@gmail.com\", \"kidsUnder16\": false, \"occupation\": \"Engineer\", \"ownOtherAnimals\": true, \"residency\": \"HOUSE\", \"squareFootageOfHome\": 2000, \"username\": \"Dog-Dad\"}"