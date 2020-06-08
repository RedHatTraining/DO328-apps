pipeline {
    agent any

    stages {

        stage("Install") {

            agent {
                docker {
                    image 'node:14'
                }
            }

            steps {
                echo "Branch is ${env.BRANCH_NAME}..."

                withNPM() {
                    echo "Performing npm build..."
                    sh 'npm ci'
                }
            }
        }

    }
}
