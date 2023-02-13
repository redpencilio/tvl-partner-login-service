# tvl-partner-login-service

Login microservice for the TVL Linked Data stack to provide authorized API access.

This service will be used by entities that would like to log in to the stack
using an API key that is registered to an account. The client will get an active
session that can be used to e.g. execute SPARQL queries through mu-authorization.

## Getting started
### Add the service to your stack

Add the partner login service to a mu-semtech stack by placing the following
snippet in the `docker-compose.yml` file as a service:

```yaml
partner-login:
  image: redpencil/tvl-partner-login-service
```

Add the following lines to the dispatcher's configuration:

```elixir
post "/login/*path" do
  Proxy.forward conn, path, "http://partner-login/sessions"
end

delete "/logout" do
  Proxy.forward conn, [], "http://partner-login/sessions/current"
end
```

## Reference

### Configuration

Nothing can be configured yet. This section will be completed as soon as some
configuration becomes available.

### API

This service requires requests to be formatted as JSON-LD, but because default
contexts are added to requests, you can send small (further referenced as
'minimal') JSON bodies that are automatically enriched. Responses are always
full JSON-LD, but compacted and framed so that they are human readable and have
a fixed tree structure.

#### POST `/sessions`

Log in as a partner. Supply the URI identifying the partner as the publisher, the
organisation this partner can act on behalf of and the API key as credentials.

**Request body**

The minimal JSON-LD request body looks like this:

```json
{
  "organization": "http://data.lblod.info/id/bestuurseenheden/jdjkq65q4sdfqsdf4456654321fqsd456f321",
  "publisher": {
    "uri": "http://example.com/partner/acme",
    "key": "acme-secret-key"
  }
}
```

For a full description of the JSON-LD context, [look at the
`LoginRequestContext` variable in the `contexts.js`
file](./lib/contexts.js#L1).

**Response**

A typical response you might get from logging in:

`201 Created`

```json
{
  "account": "http://example.com/partner/acme",
  "uuid": "fd0dc8d2-2d8e-4079-8a83-a19c5b131507",
  "created": {
    "@type": "xsd:dateTime",
    "@value": "2022-10-25T15:20:36.528Z"
  }
}
```

For a full description of the JSON-LD context, [look at the
`LoginResponseContext` variable in the `contexts.js`
file](./lib/contexts.js#L16).

`400 Bad Request`

Possible causes are:

* Session header might be missing. The header should be automatically set by
  the identifier.
* Credentials might be incorrect.
* Account might be inactive.

#### DELETE `/sessions/current`

To log out, request with `DELETE` the removal of the current session. No body
needed as this is done through cookies (outside the stack) and HTTP headers
(inside the stack).

`204 No Content`

Logout was successful.

`400 Bad Request`

Session header might be missing or invalid. The header should be automatically
set by the identifier.

### Model

This model is based on the model described in the
[mu-login-service](https://github.com/mu-semtech/login-service).

**Prefixes**

| Prefix    | URI                                         |
|-----------|---------------------------------------------|
| xsd       | http://www.w3.org/2001/XMLSchema#           |
| rdf       | http://www.w3.org/1999/02/22-rdf-syntax-ns# |
| rdfs      | http://www.w3.org/2000/01/rdf-schema#       |
| mu        | http://mu.semte.ch/vocabularies/core/       |
| muAccount | http://mu.semte.ch/vocabularies/account/    |
| session   | http://mu.semte.ch/vocabularies/session/    |
| dct       | http://purl.org/dc/terms/                   |
| oslc      | http://open-services.net/ns/core#           |

#### Session

| Predicate           | Range          | Definition                                                              |
|---------------------|----------------|-------------------------------------------------------------------------|
| `rdf:type`          | `rdfs:Class`   | `session:Session` Class definition.                                     |
| `mu:uuid`           | `xsd:string`   | Mu identifier UUID.                                                     |
| `dct:created`       | `xsd:dateTime` | Creation date of this session.                                          |
| `muAccount:account` | unspecified    | The account for this session. Usually points to the partner credentials. |
