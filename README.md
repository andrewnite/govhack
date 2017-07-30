# govhack
2017 Sunshine Coast GovHack project!  Project page: [https://2017.hackerspace.govhack.org/project/fun-coast](https://2017.hackerspace.govhack.org/project/fun-coast)

This repository includes the source code for the Alexa Skill as well as the engine for this which is a basic Node Express API.

You can run the node API locally by running these 2 containers (create /data/db if you want mongo data persistence):
```
docker network create gh
docker run -d --network gh --name ghmongo -p 27107:27107 -v /data/db:/data/db -d mongo:3.4
docker run -d --network gh --name ghnode -p 3000:3000 andrewnite/govhacknodeapi:latest
```
This will expose the API on http://localhost:3000/.  Check it's working be doing a GET to http://localhost:3000/random_park.  This should return a random park from the dataset!

Setting up the Alexa skill involves creating a Lambda function on AWS and using main.js as the entry point.  Intents and Sample Utterances can be used when creating the skill - these can be found in [this folder](https://github.com/andrewnite/govhack/tree/master/AlexaApp/speechAssets).

The main dataset for this project can be found [here](https://data.sunshinecoast.qld.gov.au/Recreation/Parks-Sunshine-Coast-List/u7w3-88wx).

I would consider this project to very much be a prototype!
