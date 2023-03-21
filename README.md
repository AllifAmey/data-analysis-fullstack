This will be a full stack application with a backend/data analysis focus.

The frontend will be React and the backend Django Rest Framework.

The aim of this app is to practice data analysis with Numpy/Panda and to see ,
it's viablity in Django. As well as to explore Python on a much deeper level.

Another crucial aim is to allow me to get a deeper understanding of data analytics and backend development.

# Setup instructions:

Run both frontend and backend for the application to work as intended.

Frontend -

cd data_analysis_app_frontend

npm run start

go to http://localhost:3000 to see frontend

Backend -

cd data_analysis_app_backend

python manage.py runserver

go to http://localhost:8000/admin to see backend data

# Current phase -

## Phase 1 - Set up phase

- &#9745; Set up Django and React
- &#9745; Attempt to construct a long-term folder structure for React components
- &#9745; Decide on a framework to allow for data visualisation for Kluster project. - chartjs & chakra
- &#9745; Create homepage for frontend
- &#9745; Set up Django Rest Framework and Swagger for automatic api documentation.

## Phase 2 - Create kluster sales api and attach to frontend

- &#9745; Create models, views, serializer, api endpoints/urls for Kluster API
- &#9745; Ensure the frontend can communicate to the API by utilising CORs
- &#9745; Display the data on the frontend and the analysis.
- &#9745; Add functionality to the top 3 buttons - Add 5, Delete 5, Bulk Delete
- &#9745; Make the data displayed responsive to the inputs of the top 3 buttons.
- &#9745; Add the CRUD functionality and ensure the data is responsive

## Phase 3 - Consolidation Of Kluster sales API

- &#9745; Optimise APIs by reducing queries
- &#9745; Ensure readability, maintainability and sustainability by documenting, refactoring and simplifying logic.
- &#9745; Code split more on the frontend , restructure folders slightly

# Current Phase - Creation of YellowSubHydro API/APP Tracking flood severity levels

- &#9745; Documented, tested and created YellowSubHydro API
- &#9744; Grab data from http://environment.data.gov.uk/flood-monitoring/id/floods ,
  parse revelant data - county and flood severity level
- &#9745; Funnel the parsed data into YellowSubHydro API
- &#9745; Attach the data to a graph to display
- &#9744; Add a setTimeOut() feature to ensure real-time recording of the data acts accordingly
- &#9745; Create logic to seperate the data accordingly and allow the correct plotting on the graph

## Phase 4 - Understanding web scrapping to grab data for analytics

- &#9744; Understand how to web scrap to expand data analytics project beyond just manually inputting data.

## Phase 5 - Creation of data analytics for a ecommerce and fintech .

- &#9744; Establish the frontend foundation
- &#9744; Establish the backend foundation
- &#9744; Know what to target in the fintech space and what to target for ecommerce
