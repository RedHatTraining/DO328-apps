# Adopt a Pup Application

This application consists of the following services:

- Adoption
- Animal
- Email
- Frontend
- Notification
- Shelter

## Deployment

Note that this application is written for OpenShift Service Mesh.
The project where you deploy this application should be managed by OSSM
(i.e. be in the ServiceMeshMemberRoll resource).

1. Create a project for the news service.

    ```
    oc new-project adoptapup-news
    ```

2. Deploy the news service.
    ```
    oc apply -f kubefiles/news-service.yaml
    ```

3. Create a project for the Adopt a Pup application.
    ```
    oc new-project adoptapup
    ```

4. Add the project to the list of SMMR members.
    ```
   oc edit smmr -n istio-system
   ```

   The list of members should look like:
   ```
   ...
   spec:
     members:
     - adoptapup
   ...
   ```

5. Deploy the MongoDB container.
    ```
    sh scripts/deploy-mongo.sh
    ```

   See the script [parameters](scripts/deploy-mongo.sh) to customize the data import.

6. Populate the MongoDB database.
    ```
    sh scripts/populate-mongo.sh
    ```
   See the script [parameters](scripts/populate-mongo.sh) to customize the deployment.

7. Deploy the backend services.
    ```
    oc apply -f kubefiles/service-mesh.yaml
    oc apply -f kubefiles/adoption-service.yaml
    oc apply -f kubefiles/animal-service.yaml
    oc apply -f kubefiles/email-service.yaml
    oc apply -f kubefiles/notification-service.yaml
    oc apply -f kubefiles/shelter-service.yaml
    ```

8. Deploy the frontend.
    ```
    sh scripts/deploy-frontend.sh
    ```
   See the script [parameters](scripts/deploy-frontend.sh) to customize the deployment.

## Animal Photos

All dog photos are stored in a shared Google Photos folder. To add a new photo for the app:

1. Upload the photo to [the shared Google Photos folder](https://photos.google.com/share/AF1QipN1a1vFP53lRgGUAoHoN67SYofoFe16zgj0DbzorjfPW5GKg6iGuzPjcQBd4nzAaQ?key=bUtEM2U4SlNsVVJtNXBBSnNTV3dfTXFQa2NsV0Rn).

2. Click the `share` button and select the `copy link` option at the bottom. 

3. Paste the photo's link into  [BYTENBIT](https://app.bytenbit.com/). This will extract the actual photo link from the shared image's html response. (The shareable link returns html with the photo embedded so this must be extracted somehow)

Now that you have the image, you can either 1) add it to the preloaded list of adoptable animals or 2) for the list of photos
that are available to choose from upon creating a new animal.

If you want to add a preloaded animal or modify an existing preloaded animal's image:

1. Open `mongo-data/animals.mongo`

2. a) Add a new JSON object with VALID new Animal fields (ideally, create JSON using postman or swagger to ensure validity).
      Set the `photoUrl` field to the extracted link from BYTENBIT mentioned above.
   b) Override one of the existing `photoUrl` fields with the new link.
   
### If using locally
3. Changes must be pushed and the Mongo pods re-created from scratch (scripts must be run to create all animals and to not overwrite any data)
   a) You can manually insert into Mongo 
        ```
        oc rsh <mongo-pod>
        mongo -u developer -p developer adopt-a-pup
        db.animals.insert(<animal-json>)
         OR
        db.animals.update({animalName: "<animal-name>"}, {$set: {photoUrl: "<URL>"}})
        ```
For images that are selectable when creating a new animal, use the same process for getting the link. Then, (For now) add
the link to the `photos` array in the `renderPhotoPickerModal` function in `AnimalCreateForm.tsx`  

## Development

Use the following instructions if you need to do development in one of the application services.

### Frontend web-app

For specific instructions about how to run the frontend web-app in development environments, head to
the [Frontend web-app README](web-app/README.md)

### Backend services

The best way to run the backend environment is to deploy the apps in a [local CRC (CodeReady Containers) environment](https://developers.redhat.com/products/codeready-containers/overview)

Otherwise, ensure that you have Mongo running locally. Change the `resources/application.properties` file in the service(s) 
that will be run and change the `spring.data.mongodb.host=mongodb` property to `spring.data.mongodb.host=localhost`  

Then run `mvn spring-boot:run -f <service location>`. Multiple services will have to be run on different ports. Append 
`-D server.port=<newPort>` to the end of the `mvn` command to use specific port.