import ballerina/http;
import ballerina/time;

listener http:Listener newsListener = new(8081);

type NewsItem record {
    int id;
    string title;
    string content;
    string timestamp;
};

final NewsItem[] newsItems = [];
int nextId = 1;

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowCredentials: false,
        allowHeaders: ["Content-Type"],
        allowMethods: ["GET", "POST", "DELETE", "OPTIONS"]
    }
}
service /news on newsListener {

    // Get all news
    resource function get list(http:Caller caller, http:Request req) returns error? {
        check caller->respond(newsItems);
    }

    // Add news (admin only)
    resource function post add(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();

        if payload is map<json> {
            string title = payload["title"].toString();
            string content = payload["content"].toString();
            
            NewsItem newItem = {
                id: nextId,
                title: title,
                content: content,
                timestamp: time:utcToString(time:utcNow())
            };
            
            newsItems.push(newItem);
            nextId += 1;

            json res = { "status": "success", "message": "News added successfully", "id": newItem.id };
            check caller->respond(res);
        } else {
            json res = { "status": "error", "message": "Invalid JSON structure" };
            check caller->respond(res);
        }
    }

    // Delete news (admin only)
    resource function delete [int id](http:Caller caller, http:Request req) returns error? {
        int index = -1;
        foreach int i in 0..<newsItems.length() {
            if newsItems[i].id == id {
                index = i;
                break;
            }
        }
        
        if index >= 0 {
            _ = newsItems.remove(index);
            json res = { "status": "success", "message": "News deleted successfully" };
            check caller->respond(res);
        } else {
            json res = { "status": "error", "message": "News item not found" };
            check caller->respond(res);
        }
    }
}