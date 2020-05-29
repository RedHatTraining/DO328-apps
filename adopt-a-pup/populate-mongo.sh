#!/bin/sh

# Run this only after the Mongodb pod is Running

oc port-forward "$(oc get pod -l name=mongodb -o jsonpath='{.items[0].metadata.name}')" 27017:27017
mongoimport --db=adopt-a-pup --collection=animals --username=developer --password=developer adopt-a-pup/mongo-data/animals.mongo
mongoimport --db=adopt-a-pup --collection=shelters --username=developer --password=developer adopt-a-pup/mongo-data/shelters.mongo