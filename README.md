# contacts-api

An API to manage contacts

## Features
* Can add a new contact
* Can edit contact
* Can view contact and its edit history
* Can delete contact


## Tools used in Project Creation
* Node.js, & Express
* Babel
* Eslint & Prettier
* Git
* Heroku

## Requirements and Installation
These instructions will get you a copy of the project up and running on your local machine for development

To install and run this project you would need to have installed:
* Git
* Node 

To run: 

``` 
$ https://github.com/Jayne-darl/contacts-api.git
$ cd contacts-api.
$ npm install
$ npm start 
```

## HTTP Request Methods

These are the HTTP request methods used in this project.

| Method	| Action |
| --- | --- |
| `GET` |	This method is used to get a resource|
| `POST`	| This method is used to create a resource or send data |

## HTTP Response Status Codes

These are the HTTP response codes used in this project.

| Status Codes | Indication |
| --- | --- |
| `200` |	This OK status code indicates that a request has succeeded |
| `201` |	This created status code indicates that a resource has been created |
| `400` |	This bad request error status code indicates that the request sent to the server is incorrect |
| `404` |	Returned when the request is valid, but the resource you try to access does not exist, or is outside your scope |
| `500` |	This internal server error status code indicates that something has gone wrong on the web server |

## API Endpoints
| Endpoint |	Functionality |
| --- | --- |
| POST /api/v1/contact | Create a new contact|
| PATCH /api/v1/contact/:id |	Edit a contact |
| GET /api/v1/contact/:id |	Get a contact |
| GET /api/v1/contact/ |	Get all contacts |
| DELETE /api/v1/contact/:id |	Delete a contact |

## The API Endpoints are hosted on heroku
https://nodecontacts-app.herokuapp.com/api/v1

## Author
Jane U. Onwumere

## License
This is licensed for your use, modification and distribution under the [MIT license](https://opensource.org/licenses/MIT).
