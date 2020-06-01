#!/bin/sh

mongo_pod=`oc get pod -l app=mongodb -o jsonpath='{.items[0].metadata.name}'`

echo "Using mongo pod: ${mongo_pod}"

oc exec -i "${mongo_pod}" -- sh -c 'mongoimport --username=developer --password=developer --collection=animals --db=adopt-a-pup --drop' < mongo-data/animals.mongo
oc exec -i "${mongo_pod}" -- sh -c 'mongoimport --username=developer --password=developer --collection=shelters --db=adopt-a-pup --drop' < mongo-data/shelters.mongo
