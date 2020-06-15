#!/bin/bash

# Script to deploy MongoDB in a specific namespace
#
# Usage:
#   sh scripts/deploy-mongo.sh [namespace] [user] [password] [database] [admin-password]
#
#   Parameters:
#     - namespace: Namespace for the deployment. (Optional)
#     - user: MongoDB username to be created. (Optional)
#     - password: Password to be assigned to the new MongoDB user. (Optional)
#     - database: Database to be created. (Optional)
#     - admin-password: Password to be assigned to the MongoDB admin user. (Optional)

namespace=${1:-adoptapup}
mongodb_user=${2:-developer}
mongodb_password=${3:-developer}
mongodb_database=${4:-adopt-a-pup}
mongodb_admin_password=${5:-redhat}

oc process -n ${namespace} -f ./kubefiles/mongodb-template.yaml \
  -p MONGODB_USER=${mongodb_user} \
  -p MONGODB_PASSWORD=${mongodb_password} \
  -p MONGODB_DATABASE=${mongodb_database} \
  -p MONGODB_ADMIN_PASSWORD=${mongodb_admin_password} \
  | oc apply -n ${namespace} -f -
