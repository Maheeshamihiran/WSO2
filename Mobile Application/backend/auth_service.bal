import ballerina/http;

listener http:Listener adminListener = new(8080);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"], // your React app
        allowMethods: ["POST", "OPTIONS"],
        allowHeaders: ["Content-Type"]
    }
}
service /auth on adminListener {

    resource function post login(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();

        if payload is map<json> {
            string username = payload["username"].toString();
            string password = payload["password"].toString();

            if username == "admin" && password == "admin123" {
                string token = "fake-jwt-token-123";
                json res = {
                    "success": true,
                    "message": "Login successful",
                    "token": token
                };
                check caller->respond(res);
            } else {
                json res = {
                    "success": false,
                    "message": "Invalid credentials"
                };
                check caller->respond(res);
            }
        } else {
            json res = {
                "success": false,
                "message": "Invalid JSON structure"
            };
            check caller->respond(res);
}
}
}