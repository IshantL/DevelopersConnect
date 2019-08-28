 Developers Connect - A social media platform for developers.

 Dependencies used

- jwt.io
-  bcrypt.js https://github.com/kelektiv/node.bcrypt.js#readme
- https://github.com/auth0/node-jsonwebtoken#readme


Project flow

Here we are creating API for fetching user profile, so when user wants to fetch any details first they needed to be authenticated. 
For authentication here we are creating a middleware auth.js that verifies user token.

How the token generated?
We used jet for that, when we login in our application we are creating a token and return that, by using that token as header paramas user can make get request to the server.
