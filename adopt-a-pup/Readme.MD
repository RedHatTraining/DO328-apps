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

1. Create a project.
    ```
    oc new-project comprehensive-review
    ```

2. Add the project to the list of SMMR members.    
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
3. Deploy the MongoDB container.
    ```
    sh scripts/deploy-mongo.sh
    ```
   
   See the script [parameters](scripts/deploy-mongo.sh) to customize the data import.

4. Populate the MongoDB database.
    ```
    sh scripts/populate-mongo.sh
    ```
   See the script [parameters](scripts/populate-mongo.sh) to customize the deployment.

5. Deploy the backend services.
    ```
    oc apply -f kubefiles/adoption-service.yaml
    oc apply -f kubefiles/animal-service.yaml
    oc apply -f kubefiles/notification-service.yaml 
    oc apply -f kubefiles/shelter-service.yaml
    ```

6. Deploy the frontend.

    ```
   sh scripts/deploy-frontend.sh
   ```
   See the script [parameters](scripts/deploy-frontend.sh) to customize the deployment.
