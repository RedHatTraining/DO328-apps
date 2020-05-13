# Exchange application

This application serves as a test bench for different Service Mesh labs.

The `frontend` folder contains a React app to consume a basic backend.

The backend API gateway is in `exchange`, implemented as a Quarkus service. This service then consumes `currencies` and `history`, in Python and Node.js respectively.

Additionally, `exchange` also simulates a dependency on an external (outside of the cluster) news service. This service is implemented in `../python-flask-gossip` and should be deployed in an separate OCP project.


## Deployment

Before deploying the application, you need Service Mesh installed in a project called `istio-system`. Instructions [here](https://docs.openshift.com/container-platform/4.3/service_mesh/service_mesh_install/preparing-ossm-installation.html).

You can install the optional "external" news service, `python-flask-gossip`, deployed in its own project, and accessible via a route.

Now, process the template and create the resources, specifying the Istio ingress gateway route in _INGRESS_GW_ and the news external service route in _NEWS_ENDPOINT_.

```sh
oc process -o yaml -f kubefiles/exchange-app-template.yml \
    -p INGRESS_GW=exchange-exchange-app.apps.example.com \
    -p NEWS_ENDPOINT=news-gossip-app.apps.example.com | oc create -f -
```
> WARNING: Do not add a preceding 'http://' to the `INGRESS_GW` and `NEWS_ENDPOINT` variables. It should only be a FQDN hostname string.
