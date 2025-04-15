FROM jenkins/jenkins:lts

# Wechsle in root für Installation von Tools
USER root

# Installiere Docker CLI im Jenkins-Container
RUN apt-get update && \
    apt-get install -y \
    docker.io \
    docker-compose \
    git \
    eslint \
    curl && \
    apt-get clean

# Gebe Jenkins-Nutzer Zugriff auf Docker
#RUN usermod -aG docker jenkins

# Optional: Standard-Plugins vorinstallieren (per Groovy oder CLI möglich)
# Kopiere hier z.B. vorgefertigte Plugin-Listen oder Jobs, wenn du willst

# Wechsle zurück zum jenkins-User
#USER jenkins