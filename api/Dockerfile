FROM openjdk:8

RUN apt-get install curl tar bash procps

# Downloading and installing Maven
# 1- Define a constant with the version of maven you want to install
ARG MAVEN_VERSION=3.6.3

# 2- Define a constant with the working directory
ARG USER_HOME_DIR="/root"

# 4- Define the URL where maven can be downloaded from
ARG BASE_URL=https://apache.osuosl.org/maven/maven-3/${MAVEN_VERSION}/binaries

# 5- Create the directories, download maven, validate the download, install it, remove downloaded file and set links
RUN mkdir -p /usr/share/maven /usr/share/maven/ref \
  && echo "Downlaoding maven" \
  && curl -fsSL -o /tmp/apache-maven.tar.gz ${BASE_URL}/apache-maven-${MAVEN_VERSION}-bin.tar.gz \
  \
  \
  && echo "Unziping maven" \
  && tar -xzf /tmp/apache-maven.tar.gz -C /usr/share/maven --strip-components=1 \
  \
  && echo "Cleaning and setting links" \
  && rm -f /tmp/apache-maven.tar.gz \
  && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

# 6- Define environmental variables required by Maven, like Maven_Home directory and where the maven repo is located
ENV MAVEN_HOME /usr/share/maven
ENV MAVEN_CONFIG "$USER_HOME_DIR/.m2"


COPY cplex_studio.linux-x86-64.bin /cplex/cplex_studio.linux-x86-64.bin
COPY response.properties /cplex/response.properties

RUN chmod u+x /cplex/cplex_studio.linux-x86-64.bin
RUN /cplex/cplex_studio.linux-x86-64.bin -f /cplex/response.properties
RUN rm -rf /cplex

ADD src/ /app/src/
ADD api_example.json/ /app/


WORKDIR /app
RUN apt-get update && apt-get install -y vim
ADD pom_deploy.xml/ /app/pom.xml
#
RUN mvn install:install-file -DgroupId=cplex -DartifactId=cplex -Dversion=20.1 -Dpackaging=jar -Dfile=/opt/ibm/ILOG/CPLEX_Studio_Community201/cplex/lib/cplex.jar
RUN mvn clean package
# mvn compile
# mvn package
CMD java -Djava.library.path=/opt/ibm/ILOG/CPLEX_Studio_Community201/cplex/bin/x86-64_linux/ -jar target/test-1.0-SNAPSHOT-shaded.jar
# docker build -t kibs_api .
# docker run -p 0.0.0.0:7000:7000 -t kibs_api