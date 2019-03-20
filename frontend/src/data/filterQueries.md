# Filtering Spring JPA Queries
The purpose of this is to explain how to reduce the amount of data being sent over REST services using **Projections**

## Setup
To begin, find the `Repositories` directory in your file tree

- Add an interface, calling it whatever you'd like the search functionality to be
	- Example: `OnlyNames` might be a way to show only the names of users through the `Dao`
- Inside of the newly created interface, declare an interface method signature
	- `public interface NAME_OF_INTERFACE {...}`

## Filtering
Inside of the class body, define the data fields you wish returned from your `Dao` method

- Template: `public DATA_TYPE get_ENTITY_PROPERTY_NAME();`
- Example: `public String getFirstName();` 

As you might have guessed, you need to name these **exactly** the same way as the getters / setters in your `Entity`

So far, the interface would look like this: 
```
package com.projectName.Repositories;

public interface OnlyNames {
        Long getId();
        String getFirstName();
        String getLastName();
}

```

## Implementation
Inside of the corresponding repository, we can make custom queries

Say for example we have a `User` repository that look like this:

`public interface UserRepository extends CrudRepository<User, Long> {}`

This gives us access to all of the `CrudRepository` methods like `.save()`, `.findAll()`, etc

Inside of the interface body, we can add the Projection.

## Defining a Projection
There are a few parts to it, and it's mildly confusing ( at least for me )

1. Define the data type the query will return
	- `List<INTERFACE_NAME>` would look like `List<OnlyNames>`
2. Define what the query will be doing
	- There are too many built in query methods, but you cannot override the ones that come from extending `CrudRespository`
	- This includes method overloading, it **WILL NOT** work

So that leaves us with the final product **inside the** `UserRepository`:
```
import com.burnnotice.burnnotice.Models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    Iterable<OnlyNames> findBy_SOME_OTHER_METHOD();
}
```

## Calling the Repository Method
This works like any other repository call

- Dependency injection for the Dao through `@Autowired` or the other way by putting it in the constructor of the controller

- `Iterable<INTERFACE_NAME> = userDao.findBy_SOME_OTHER_METHOD();`


## Helpful Links:

- [It doesn't work](https://stackoverflow.com/questions/50647623/spring-data-projection-doesnt-work)

- [Docs](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#projections)








