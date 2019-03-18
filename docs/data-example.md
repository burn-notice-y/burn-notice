# Data Models sent through fetch methods
`Content-Type` will be `application/json` unless otherwise specified

# User Actions

## Register a New User

### Route
- `"/api/register"`

### Method
- `POST`

### Body

```
{
	"firstName": "Jermaine",
	"lastName": "Cole",
	"email": "coleW0rld@no-blanket.com",
	"sap": "111111",
	"password": "password"
}
```


## Login

### Route
- `"/api/login"`

### Content-Type
- `URL Encoded`

### Method
- `POST`

### Body
```
"?sap=123450&password=password"
```

## Retrieve Logged In User

### Route
- `"/api/logged-user"`

### Method
- `GET`


## Create Report

### Method 
- `POST`

### Route
- `"/api/create-report`

### Body
```
{
	"createDate": "2019-02-29",
	"exposedToChemicals": "true",
	"timeDispatched": "unix maybe?",
	"timeArrived": "unix?",
	"fireRetardantPresent": "true",
	"primaryTeamActions": "what the primary team did",
	"secondaryTeamActions": "what the secondary team did",
	"description": "catch all for anything outside of team actions",
	"user": {
		"id": "23"
		// the creator of the report
	},
	"type": {
		"id": 2,
		"name": "Single Family Dwelling"
		// type of incident
	}
}
```

