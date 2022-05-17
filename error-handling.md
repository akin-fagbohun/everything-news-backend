# Possible Errors

This is an _**relatively complete**_ guide to the possible errors that may happen in this app.

I've tried to think about what could go wrong for each route, and the HTTP status code should be sent to the client in each case.
For each thing that could go wrong, a response has been created within the app, with tests in the testing suite.

---

## HTTP Status Codes

- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 404 Not Found
- 405 Method Not Allowed
- 418 I'm a teapot
- 422 Unprocessable Entity
- 500 Internal Server Error

---

## The Express Documentation

[The Express Docs](https://expressjs.com/en/guide/error-handling.html) have a great section all about handling errors in Express.

## Unavailable Routes

- Status: - 404 Not Found

### GET `/not-a-route`

- Status: - 404 Not Found

---

## Available Routes

- Status: - 200 OK

### GET `/api/topics`

- Status: - 200 OK

### GET `/api/users/:username`

-

### GET `/api/articles/:article_id`

- Bad `article_id` (e.g. `/dog`) - Status: - 400 Bad request
- Well formed `article_id` that doesn't exist in the database (e.g. `/999999`) - Status: - 404 Not found

### PATCH `/api/articles/:article_id`

- No `inc_votes` on request body
- Invalid `inc_votes` (e.g. `{ inc_votes : "cat" }`)

### POST `/api/articles/:article_id/comments`

-

### GET `/api/articles/:article_id/comments`

-

### GET `/api/articles`

- Bad queries:
  - `sort_by` a column that doesn't exist
  - `order` !== "asc" / "desc"
  - `topic` that is not in the database
  - `topic` that exists but does not have any articles associated with it

### PATCH `/api/comments/:comment_id`

-

### DELETE `/api/comments/:comment_id`

-

### GET `/api`

-
