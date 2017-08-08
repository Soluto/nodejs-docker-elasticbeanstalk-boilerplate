# This boilerplate includes:
1. nodejs express service
2. blackbox tests against the express service
3. smoke tests against the express service after it has been deployed
4. ci build yml files for Codefresh CI to build, test, and deploy the service to elastic beanstalk

        
# How to use this boilerplate:
1. create a repository in aws container registry to hold your service's docker image: https://console.aws.amazon.com/ecs/home?region=us-east-1#/repositories

2. create the necessary elastic beanstalk environments to run your service:    
we use a docker image called soluto/aws-tools that contains the necessary scripts needed to do this.
first, run the docker image interactively so you have access to the scripts. use your own aws credentials.   
```
docker run -it -e AWS_ACCESS_KEY_ID=your-access-key -e AWS_SECRET_ACCESS_KEY=your-access-secret -e AWS_REGION=us-east-1 soluto/aws-tools 
```
    
now, lets create the service environments.    
```
aws-tools create-web-service —application-name your-app-name —service-name your-service-name
```    
* application-name:    
elastic beanstalk application to create the environments under.    
if you have a few services that belong to the same domain, its convenient to group them under the same app.       
for instance: a few services that handle the onboarding process can be grouped under "onboarding" app.    
this is your choice, you can use an application-name that is identical to your service-name if you want.    
it doesnt mean much besides grouping your environments.

* service-name:    
how you want to call your service. for instance: registration-api    

    the script will create 3 environments for you:
    * playground - to deploy the latest image on every push to master/merge of pull request
    * staging - to deploy your image to staging when you manually deploy from CI.
    * production - a production environment to swap to when you manually swap from CI.

3. create source files for you service.
    * clone this repo to a folder with your service name   
    ```
    git clone https://github.com/Soluto/nodejs-docker-elasticbeanstalk-boilerplate your-service-name
    ```
    * replace placeholders in the template (search for \*replace\*)

    * reset the git repo    
    ``` 
    cd your-service-name
    rm -rf .git # delete .git folder
    git init # init a new git repo
    git add .
    git commit -m "initial commit"
    ```    
4. push your newly created service repostiory to github
    * create a private github repository name as your service name
    * push the code the github repo
    ```
    git remote add origin https://github.com/Soluto/your-service-name.git
    git push -u origin master
    ```
5. create codefresh repository 
    * go to https://g.codefresh.io
    * make sure your using the soluto account
    * create a repository from the github repo you just created
    * create 3 pipelines:
        * build - use YML build file location - ./ci/build.codefresh.yml
        * deploy - use YML build file location - ./ci/deploy.codefresh.yml
        * swap - use YML build file location - ./ci/swap.codefresh.yml
    * in the general tap of your codefresh repository add the following environment variables:
        * __AWS_ACCESS_KEY_ID__=ci-agent-1's key id (check encrypted)
        * __AWS_SECRET_ACCESS_KEY__=ci-agent-1's secret access key (check encrypted)
        * __AWS_REGION__=us-east-1
        * __AWS_APPLICATION_NANE__=your application name (from before)
        * __AWS_SERVICE_NAME__=your service name (from before)
        * __AWS_REPOSITORY_NAME__=the repository name for the docker repository you created, including namespace (e.g soluto/sample-service)
        * __AWS_PLAYGROUND_URL__=the url for your aws playground environment (from before)
        * __AWS_STAGING_URL__=the url for your aws staging environment (from before)

6. build it,deploy it,swap it
    * run the build pipeline
    * run the deploy pipeline
    * run the swap pipeline


That's it! 
you're up and running with the service in elastic beanstalk.
now feel free to change your own project repo as you see fit.
