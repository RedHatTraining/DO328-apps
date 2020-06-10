#!/bin/bash

# Script to import data into MongoDB
#
# Usage:
#   sh scripts/populate-mongo.sh [kubernetes-app-tag]
#
#   Parameters:
#     - kubernetes-app-tag: Tag assigned in kubernetes to the MongoDB pod. (Optional)

kubernetes_app_tag=${1:-mongodb}

mongo_pod=`oc get pod -l app=${kubernetes_app_tag} -o jsonpath='{.items[0].metadata.name}'`
mongo_container=${kubernetes_app_tag}

echo "Using mongo pod: ${mongo_pod}"

oc exec -i "${mongo_pod}" -c "${mongo_container}" -- sh -c 'mongoimport --username=developer --password=developer --collection=animals --db=adopt-a-pup --drop' < ./mongo-data/animals.mongo
oc exec -i "${mongo_pod}" -c "${mongo_container}" -- sh -c 'mongoimport --username=developer --password=developer --collection=shelters --db=adopt-a-pup --drop' < ./mongo-data/shelters.mongo
