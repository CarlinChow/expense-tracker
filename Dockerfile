FROM eclipse-temurin:21-jdk-alpine

WORKDIR /server

COPY target/*.jar app.jar

ENTRYPOINT ["java","-jar","/server/app.jar"]