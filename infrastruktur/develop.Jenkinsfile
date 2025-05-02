pipeline {
    agent any
    environment {
        PLAYWRIGHT_BASE_URL = 'http://host.docker.internal:8080'
        COMPOSE_PROJECT_NAME = "ci-${env.BUILD_NUMBER}"
    }
    stages {
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
    }
    post {
        always {
                script {
                    sh 'docker-compose logs'
                }
            }
       
        cleanup {
            script {
                sh 'docker-compose down'
            }
        }
    }
}
