# express-json-status-codes

Extend the Express response object to set the status code and return JSON

## Usage

`npm install --save express-json-status-codes`

```
var express = require('express'),
    statusCodes = require('express-json-status-codes');

// Add the new responses to the `express.response` prototype
var extendedExpress = statusCodes(express);

var app = extendedExpress();
...
app.get('/', function(req, res) {
  res.ok('What's up');
});
```

## Available API

From `http-status-codes`:

```
accepted 202
badGateway 502
badRequest 400
conflict 409
continue 100
created 201
expectationFailed 417
failedDependency 424
forbidden 403
gatewayTimeout 504
gone 410
httpVersionNotSupported 505
insufficientSpaceOnResource 419
insufficientStorage 507
internalServerError 500
lengthRequired 411
locked 423
methodFailure 420
methodNotAllowed 405
movedPermanently 301
movedTemporarily 302
multiStatus 207
multipleChoices 300
networkAuthenticationRequired 511
noContent 204
nonAuthoritativeInformation 203
notAcceptable 406
notFound 404
notImplemented 501
notModified 304
ok 200
partialContent 206
paymentRequired 402
preconditionFailed 412
preconditionRequired 428
processing 102
proxyAuthenticationRequired 407
requestHeaderFieldsTooLarge 431
requestTimeout 408
requestTooLong 413
requestUriTooLong 414
requestedRangeNotSatisfiable 416
resetContent 205
seeOther 303
serviceUnavailable 503
switchingProtocols 101
temporaryRedirect 307
tooManyRequests 429
unauthorized 401
unprocessableEntity 422
unsupportedMediaType 415
useProxy 305
```
