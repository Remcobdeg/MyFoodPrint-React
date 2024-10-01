# Source code for the prototype application MyFoodprint

MyFoodprint is an application that helps individuals or households find opportunities to reduce the carbon footprint of their diet (their 'foodprint'). 

The application allows users to scan (and track) their grocery receipts and receive visualizations showing how their choices (ie, the product that they buy) contribute to their foodprint. They can then click on the items in the visualization to explore alternative options.

An example of what this looks like: [Uncommented demo on Youtube](https://www.youtube.com/watch?v=gFLJKhROnqA&ab_channel=RemcodeGrave)

See also the poster of a 3-week field study with the application, presented at the 5th Global Food Security conference in Leuven 2024
![Poster of the evaluation of the 3-week field study of the application 'MyFoodprint'.](readme_content/PosterA0FoodSecurity.svg "MyFoodprint Fieldstudy Evaluation") 

## Quick start to running the code

1. Create a file `backend/.env` and `react/.env` 
2. Create a MongoDB database and add the following information to `backend/.env`:
    + `MONGO_USER=xxx`
    + `MONGO_PASSWORD=xxx`
    + `PRIVATE_KEY=xxx`
    + `CLUSTER_NAME=xxx`
    + `DATABASE_NAME=xxx`
3. Also define the port to which the backend will serve in `backend/.env`
    + `PORT=5050` (or use any different port)
4. Configure this same port in react/.env
    + `REACT_APP_BACKEND_URL=http://localhost:5050/api`
5. (Optional) Create an API key for AWS Textract [https://aws.amazon.com/textract/](https://aws.amazon.com/textract/) and add the following information to `backend/.env`:
    + `MONGO_USER=xxx`
    + `MONGO_PASSWORD=xxx`
    + `AWSACCESSKEYID=xxx`
    + `AWSSECRETACCESSKEY=xxx`
    + `AWSREGION=xxx`
6. (Optional) Configure a cloud bucket for storing image files and add the following information to `backend/.env`:
    + `DOSPACE_ACCESS_KEY=xxx`
    + `DOSPACE_ACCESS_SECRET=xxx`
    + `DOSPACE_ENDPOINT=xxx`
    + `DOSPACE_BUCKET_NAME=xxx`
    + `DOSPACE_FOLDER=xxx`
7. (Optional) Configure a Google Analytics tracking ID and add the following information to `backend/.env`:
    + `GA_TRACKING_ID=xxx`
8. Fire up the front and backend:
    + Open a shell terminal at `./React` and execute `npm start`
    + Open a shell terminal at `./backend` and execute `npm start`


**Steps 1-4 allow you to fire up the application on a local host (Step 8)** . However, the receipt scanning will not yet work. To make this work, you will have to create an API key for AWS Textract (Step 5) and configure a cloud bucket for storing image files (Step 6)(I used Digital Ocean spaces). Also, you may want to configure a Google Analytics tracking ID (Step 7).

## Notes

The application is built as a MERN (MongoDB Express React.js Node.js) stack + some PWA (Progressive Web App) features + D3.js visualizations.

In the current version, the mapping of extracted receipt fields on products and their footprint is not yet automated! Eg, manual adjustments to the DB entries (or semi-automated, using separate scripts) are needed to make the data available for the visualizations. 