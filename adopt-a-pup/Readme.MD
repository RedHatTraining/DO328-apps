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
    oc new-project comprehensive-review-news
    ```

2. Deploy the news service.
    ```
    oc apply -f kubefiles/news-service.yaml
    ```

3. Create a project for the Adopt a Pup application.
    ```
    oc new-project comprehensive-review
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
     - comprehensive-review
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


## Development

Use the following instructions if you need to do development in one of the application services.

### Frontend web-app

For specific instructions about how to run the frontend web-app in development environments, head to
the [Frontend web-app README](web-app/README.md)

### Backend services

TODO...