pipeline {
    agent any
    tools {
        jdk 'jdk21'
        maven 'maven3'
        nodejs 'node20'
    }
    options {
        timeout(time: 20, unit: 'MINUTES')
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
        timestamps()
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        JACOCO = 'org.jacoco:jacoco-maven-plugin:0.8.15'
        CI = 'true'
    }
    stages {
        stage('Checkout GitHub') {
            steps {
                checkout scm
                sh 'git log -1 --format="Commit: %h %s"'
            }
        }
        stage('Build and Test') {
            parallel {
                stage('Java - JUnit and JaCoCo') {
                    steps {
                        dir('backend') {
                            sh 'mvn -B -ntp clean $JACOCO:prepare-agent verify $JACOCO:report'
                        }
                    }
                }
                stage('JavaScript - Node test') {
                    steps {
                        dir('frontend') {
                            sh 'npm run test:ci'
                        }
                    }
                }
            }
            post {
                always {
                    junit testResults: 'backend/target/surefire-reports/*.xml,frontend/reports/junit.xml'
                }
                success {
                    archiveArtifacts artifacts: 'backend/target/*.jar', fingerprint: true
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '"$SCANNER_HOME/bin/sonar-scanner" -Dsonar.projectVersion="$BUILD_NUMBER"'
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
    post {
        success {
            echo 'GitHub checkout, build, tests, SonarQube and Quality Gate passed.'
        }
    }
}
