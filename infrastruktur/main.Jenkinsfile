pipeline {
  agent any

  environment {
    STACK_NAME = 'co2footprint'
    BACKEND_SERVICE  = "${STACK_NAME}_backend"
    FRONTEND_SERVICE = "${STACK_NAME}_frontend"
    IMAGE_TAG = "release_${env.BUILD_NUMBER}"
    PLAYWRIGHT_BASE_URL = 'http://host.docker.internal:9080'
    COMPOSE_PROJECT_NAME = "release-${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Rebekka-Strelow/iu-ipwa01-co2-emission.git'
      }
    }
    
    stage('Build'){
      steps {
        git branch: 'main', url: 'https://github.com/Rebekka-Strelow/iu-ipwa01-co2-emission.git'
        script {
            sh 'docker-compose build'
            }
        }
    }
    stage('Static Code Analysis'){
        steps {
            script{
                catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                    echo 'Generating Checkstyle XML ...'
                    sh '''
                        cd co2-emission-frontend
                        npm install --save-dev eslint@8.57.1
                        npx eslint -f checkstyle src > ../eslint.xml
                    '''
                }
                catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                    recordIssues(
                        tools: [checkStyle(pattern: 'eslint.xml')],
                            failOnError: false
                        )
                }
            }
        }
    }

    stage('Unittests'){
            parallel  {
                stage('Backend') {
                    steps {
                        script {
                            echo "Running Unittests for Backend ..."
                            sh 'docker-compose run backend npm test'
                        }
                    }
                }

                stage('Frontend') {
                    steps {
                        script {
                            echo "Running Unittests for Frontend ..."
                            sh '''
                            cd co2-emission-frontend
                            npm run test:unit
                            '''
                        }
                    }
                }
            }
        }
       
       stage('Deploy to TestServer'){
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }

    
        stage('Integrationstests'){
            parallel {
                stage('Backend'){
                    steps {
                        script {
                            echo "Running Integrationstests..."
                            sh 'docker-compose run backend npm run-script integrationtest'
                        }
                    }
                }
                
                stage('Frontend'){
                    steps {
                        script {
                            echo "Running Integrationstests..."
                            sh '''
                                cd co2-emission-frontend
                                npm run test:integration
                            '''
                        }
                    }
                }
            }
        }
     
        stage('Playwright-Tests') {
            steps {
                script {
                    echo "Running Playwright Tests..."
                    sh '''
                        cd co2-emission-frontend
                        npm ci
                        npx playwright install --with-deps
                        npx playwright test
                    '''
                }
            }
        }

       stage('Shut Down TestServer'){
            steps {
                script {
                    sh 'docker-compose down'
                }
            }
        }

    stage('Prepare Deployment to Swarm Instance') {
      steps {
        sh '''
          docker build -t co2-emission-backend:${IMAGE_TAG} ./co2-emission-backend
          docker build -t co2-emission-frontend:${IMAGE_TAG} ./co2-emission-frontend
        '''
        sh 'docker swarm init || true'
      }
    }

    stage('Manual Approval') {
      when {
        expression { return params.IMAGE_TAG != '' }
      }
      steps {
        input message: "Deploy Tag ${params.IMAGE_TAG} to production?"
      }
    }

    stage('Deploy to Prod') {
      steps {

        sh """
          docker service update \
            --image co2-emission-backend:${IMAGE_TAG} \
            --update-parallelism 1 --update-delay 10s \
            --rollback-parallelism 1 --rollback-delay 5s \
            ${BACKEND_SERVICE}
        """

        sh """
          docker service update \
            --image co2-emission-frontend:${IMAGE_TAG} \
            --update-parallelism 1 --update-delay 5s \
            --rollback-parallelism 1 --rollback-delay 2s \
            ${FRONTEND_SERVICE}
        """
      }
    }
  }

  post {
    success {
      echo "Deployment von Tag ${params.IMAGE_TAG} erfolgreich!"
    }
    failure {
      echo "Deployment gescheitert – prüfe die Logs von ${STACK_NAME} im Swarm."
    }
    cleanup {
        script {
            sh 'docker-compose down'
        }
    }

  }
}
