# What is the Cloudflare API?

The Cloudflare API is a RESTful API based on HTTPS requests and JSON responses. If you are registered with Cloudflare, you can obtain your API key from the bottom of the "API Tokens" page, found here: Go to My account.

## Endpoints
The API is accessed by making HTTPS requests to a specific version endpoint URL, in which GET, POST, PUT, PATCH, and DELETE methods dictate how your interact with the information available. Every endpoint is accessed only via the SSL-enabled HTTPS (port 443) protocol.

Everything (methods, parameters, etc.) is fixed to a version number, and every call must contain one. The latest version is Version 4.

The stable base URL for all Version 4 HTTPS endpoints is:

https://api.cloudflare.com/client/v4/

## Responses
Format
Each response is a JSON object. The data requested is wrapped in the tag. If you have a response, it will always be within the field. We also include a flag, an array of potential , and in the response. Some responses can have additional pagination info wrapped in the

An error object will contain an integer field and a

Date fields will always be in UTC ISO-8601 format, including microseconds



