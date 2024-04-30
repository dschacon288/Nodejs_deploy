pipeline {
    agent any
    environment {
        REGISTRY_URL = 'aws_account_id.dkr.ecr.region.amazonaws.com' // credenciales ejemplo
        IMAGE_NAME = 'mi-app-node'
        ECR_CREDENTIALS_ID = 'id-credenciales-aws' // credenciales ejemplo
        KUBE_CONFIG = 'id-config-kube' // credenciales ejemplo
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${REGISTRY_URL}/${IMAGE_NAME}:${env.BUILD_ID}")
                }
            }
        }
        stage('Push Image to ECR') {
            steps {
                script {
                    docker.withRegistry("https://${REGISTRY_URL}", ECR_CREDENTIALS_ID) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Configuracion de las credenciales de kubectl
                    withCredentials([file(credentialsId: KUBE_CONFIG, variable: 'KUBECONFIG')]) {
                        // Despliega usando kubectl
                        sh "kubectl apply -f node-app-deployment.yaml"
                        sh "kubectl apply -f redis-deployment.yaml"
                    }
                }
            }
        }
    }
}
