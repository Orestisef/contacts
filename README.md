This folder contains a simple project challenge with MERN stack.

## Installation

###MongoDB

You must have installed in your local machine the mongo database. If not go to:

https://www.mongodb.com/download-center/community

Go to https://docs.mongodb.com/manual/administration/install-on-linux/ for the installation guide. 

####Dependencies

Install the dependencies using `npm`. 

from the server directory, run:

$npm install

from the client directory, run:

$npm install

Due to the following bug (https://github.com/facebook/create-react-app/issues/6603?fbclid=IwAR0gK9I6UZ3JlJ1J8ou7oys1narU1ef0CBBU0fR2mEsWxVK2SdtVJ5UOygQ) please install 'react-scripts' globally

$npm i -g 'react-scripts'



##### Running the code

Open the comunnication with DB dy running:

$mongod

When mongod starts then open new terminal and run:

$mongo

After that run

$use contacts 

to create a new empty db name contacts.
!Done with mongo!

Scripts have been provided in `package.json` (server directory) for running both servers (react-express). To compile the code and run the servers, run from the server directory:

$npm run dev

Then go to http://localhost:3000/ (if browser does not automatically open in this address)

ENJOY :) 
# contacts
# contacts
# contacts
