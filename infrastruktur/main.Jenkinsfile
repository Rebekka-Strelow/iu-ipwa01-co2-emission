pipeline {
  agent any

  // Gib hier bei manuellem Trigger den gewünschten Release-Tag an, 
  // z.B. "42" oder "v1.0.3"
  parameters {
    string(
      name: 'IMAGE_TAG',
      defaultValue: '',
      description: 'Name der Version'
    )
  }

  environment {
    STACK_NAME = 'co2footprint'
    BACKEND_SERVICE  = "${STACK_NAME}_backend"
    FRONTEND_SERVICE = "${STACK_NAME}_frontend"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Rebekka-Strelow/iu-ipwa01-co2-emission.git'
      }
    }

    stage('Build Docker-Images') {
      steps {
        // Baue und tagge mit IMAGE_TAG
        sh '''
          docker build -t co2-emission-backend:${IMAGE_TAG} ./co2-emission-backend
          docker build -t co2-emission-frontend:${IMAGE_TAG} ./co2-emission-frontend
        '''
      }
    }

    stage('Init Swarm') {
      steps {
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
      echo "✅ Deployment von Tag ${params.IMAGE_TAG} erfolgreich!"
    }
    failure {
      echo "❌ Deployment gescheitert – prüfe die Logs von ${STACK_NAME} im Swarm."
    }
  }
}
