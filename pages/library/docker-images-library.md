---
layout: library
title: Docker Image Library
categories: [library, docker]
---

A curated list of Docker images useful for Java developers; look for your tool to setup on Docker and follow the steps. 
Before you follow the instructions, make sure your Docker is running on the computer.

{% accordion a-unique-id %}
{% collapsible Jenkins %}
   *Image: [jenkins/jenkins:lts-jdk11](https://hub.docker.com/layers/jenkins/jenkins/lts-jdk11/images/sha256-bde1c86c0e6bac9477b2220cb0d5c33d3a80daa37e995397cd17795525d19a00?context=explore)*{: .badge .badge-pill .badge-info}
   
   1. {% ihighlight terminal %}$ docker pull jenkins/jenkins:lts-jdk11{% endihighlight %}  
      Pull Jenkins image
   2. *$ docker run -d --name jenkins -p 8085:8080 -v E:/code/docker_volume/jenkins:/var/jenkins_home jenkins/jenkins:lts-jdk11*{: #terminal_tx}  
      Run newly downloaded Jenkins image
      * **-d** Runs container in background
      * **--name** This container will run under the name of 'jenkins'
      * **-p** Jenkins will run on port 8080, so we are mapping to 8085 on the local host
      * **-v** We configured volume because Jenkins will store job information, so next time when we restart, we will see all previous ran jobs in the history
   3. *$ docker container logs jenkins*{: #terminal_tx}  
      Verify if Jenkins started and make sure the last line in the log says 'Jenkins is fully up and running'
   4. From your browser access Jenkins at [http://localhost:8085](http://localhost:8085)
   5. Since this is the first time we are accessing Jenkins, so we need to extract the password from this default file '/var/jenkins_home/secrets/initialAdminPassword'
   6. Access jenkins container file system by executing command *$ docker container exec -it jenkins /bin/bash*{: #terminal_tx}
   7. Read password from '/var/jenkins_home/secrets/initialAdminPassword' *$ cat /var/jenkins_home/secrets/initialAdminPassword*{: #terminal_tx} Copy the output and paste in the Jenkins login page.
      Then click on 'Continue'.
   8. Click on 'Suggested Plugin Option'. Necessary plugins will get installed. It will take a couple of minutes, so wait for the setup.
   9. 'Create First Admin User'
{% endcollapsible %}

{% collapsible My SQL %}
   *Image: [jenkins/jenkins:lts-jdk11](https://hub.docker.com/layers/jenkins/jenkins/lts-jdk11/images/sha256-bde1c86c0e6bac9477b2220cb0d5c33d3a80daa37e995397cd17795525d19a00?context=explore)*{: #options_tx}
   
   1. {% ihighlight terminal %}$ docker pull jenkins/jenkins:lts-jdk11{% endihighlight %}  
      Pull Jenkins image
   2. *$ docker run -d --name jenkins -p 8085:8080 -v E:/code/docker_volume/jenkins:/var/jenkins_home jenkins/jenkins:lts-jdk11*{: #terminal_tx}  
      Run newly downloaded Jenkins image
      * **-d** Runs container in background
      * **--name** This container will run under the name of 'jenkins'
      * **-p** Jenkins will run on port 8080, so we are mapping to 8085 on the local host
      * **-v** We configured volume because Jenkins will store job information, so next time when we restart, we will see all previous ran jobs in the history
   3. *$ docker container logs jenkins*{: #terminal_tx}  
      Verify if Jenkins started and make sure the last line in the log says 'Jenkins is fully up and running'
   4. From your browser access Jenkins at [http://localhost:8085](http://localhost:8085)
   5. Since this is the first time we are accessing Jenkins, so we need to extract the password from this default file '/var/jenkins_home/secrets/initialAdminPassword'
   6. Access jenkins container file system by executing command *$ docker container exec -it jenkins /bin/bash*{: #terminal_tx}
   7. Read password from '/var/jenkins_home/secrets/initialAdminPassword' *$ cat /var/jenkins_home/secrets/initialAdminPassword*{: #terminal_tx} Copy the output and paste in the Jenkins login page.
      Then click on 'Continue'.
   8. Click on 'Suggested Plugin Option'. Necessary plugins will get installed. It will take a couple of minutes, so wait for the setup.
   9. 'Create First Admin User'
{% endcollapsible %}

{% collapsible PostGres %}
   Third collapsible content.
   1. Which
   2. is
   3. markdown
{% endcollapsible %}
{% endaccordion %}
   

