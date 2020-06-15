#!/bin/bash

# Script to deploy the front end of the comprehensive review
#
# Usage:
#   sh scripts/deploy-frontend.sh [namespace] [adoption-endpoint] [animal-endpoint] [shelter-endpoint] [news-enabled] [news-endpoint]
#
#   Parameters:
#     - namespace: Namespace for the deployment. (Optional)
#     - adoption-endpoint: Adoption endpoint URL. (Optional)
#     - animal-endpoint: Animal endpoint URL. (Optional)
#     - shelter-endpoint: Shelter endpoint URL. (Optional)
#     - news-enabled: Boolean flag to enable the news section in the front end. (Optional)
#     - news-endpoint: News endpoint URL. (Optional)

default_ingress_endpoint="http://istio-ingressgateway-istio-system.apps.ocp4.example.com/"

namespace=${1:-adoptapup}
adoption_endpoint=${2:-${default_ingress_endpoint}}
animal_endpoint=${3:-${default_ingress_endpoint}}
shelter_endpoint=${4:-${default_ingress_endpoint}}
news_enabled=${5:-1}
news_endpoint=${6:-"http://news-adoptapup-news.apps.ocp4.example.com"}
email_endpoint=${7:-"http://email-adoptapup.apps.ocp4.example.com/"}

oc process -n ${namespace} -f ./kubefiles/frontend-template.yaml \
  -p REACT_APP_ADOPTION_SERVICE_URL=${adoption_endpoint} \
  -p REACT_APP_ANIMAL_SERVICE_URL=${animal_endpoint} \
  -p REACT_APP_SHELTER_SERVICE_URL=${shelter_endpoint} \
  -p REACT_APP_NEWS_ENABLED=${news_enabled} \
  -p REACT_APP_NEWS_SERVICE_URL=${news_endpoint} \
  -p REACT_APP_EMAIL_APP_URL=${email_endpoint} \
  | oc apply -n ${namespace} -f -
