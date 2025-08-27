import ballerina/http;
import ballerina/log;
import ballerina/time;

type WeatherData record {
    string city;
    int temperature;
    string condition;
    int humidity;
    string timestamp;
};

type MarineWeatherData record {
    decimal latitude;
    decimal longitude;
    decimal waveHeight;
    decimal windSpeed;
    decimal windDirection;
    decimal waterTemperature;
    string timestamp;
};

type OpenWeatherResponse record {
    record {
        decimal temp;
        int humidity;
    } main;
    record {
        string main;
    }[] weather;
    string name;
};

final http:Client weatherClient = check new ("https://api.openweathermap.org");
final http:Client stormGlassClient = check new ("https://api.stormglass.io");
final string API_KEY = "b9c0f85939a74e2ca546e823f747f950";
final string STORMGLASS_API_KEY = "f6273616-8325-11f0-b41a-0242ac130006-f6273698-8325-11f0-b41a-0242ac130006";

function getWeatherData(string city) returns WeatherData|error {
    string endpoint = "/data/2.5/weather?q=" + city + "&appid=" + API_KEY + "&units=metric";
    json response = check weatherClient->get(endpoint);
    
    string cityName = check response.name;
    json mainData = check response.main;
    decimal temp = check mainData.temp;
    int humidity = check mainData.humidity;
    json[] weatherArray = <json[]>check response.weather;
    json weatherInfo = weatherArray[0];
    string condition = check weatherInfo.main;
    
    return {
        city: cityName,
        temperature: <int>temp,
        condition: condition,
        humidity: humidity,
        timestamp: time:utcToString(time:utcNow())
    };
}

function getWeatherDataByCoords(decimal lat, decimal lng) returns WeatherData|error {
    string endpoint = "/data/2.5/weather?lat=" + lat.toString() + "&lon=" + lng.toString() + "&appid=" + STORMGLASS_API_KEY+ "&units=metric";
    json response = check weatherClient->get(endpoint);
    
    string cityName = check response.name;
    json mainData = check response.main;
    decimal temp = check mainData.temp;
    int humidity = check mainData.humidity;
    json[] weatherArray = <json[]>check response.weather;
    json weatherInfo = weatherArray[0];
    string condition = check weatherInfo.main;
    
    return {
        city: cityName + " (" + lat.toString() + ", " + lng.toString() + ")",
        temperature: <int>temp,
        condition: condition,
        humidity: humidity,
        timestamp: time:utcToString(time:utcNow())
    };
}

function getMarineWeatherData(decimal lat, decimal lng) returns MarineWeatherData|error {
    string endpoint = "/v2/weather/point?lat=" + lat.toString() + "&lng=" + lng.toString() + "&params=waveHeight,windSpeed,windDirection,waterTemperature";
    
    map<string> headers = {
        "Authorization": STORMGLASS_API_KEY
    };
    
    json response = check stormGlassClient->get(endpoint, headers);
    json hours = check response.hours;
    json[] hoursArray = <json[]>hours;
    json currentHour = hoursArray[0];
    
    json waveHeightData = check currentHour.waveHeight;
    json windSpeedData = check currentHour.windSpeed;
    json windDirectionData = check currentHour.windDirection;
    json waterTempData = check currentHour.waterTemperature;
    
    decimal waveHeight = <decimal>check waveHeightData.sg;
    decimal windSpeed = <decimal>check windSpeedData.sg;
    decimal windDirection = <decimal>check windDirectionData.sg;
    decimal waterTemperature = <decimal>check waterTempData.sg;
    
    return {
        latitude: lat,
        longitude: lng,
        waveHeight: waveHeight,
        windSpeed: windSpeed,
        windDirection: windDirection,
        waterTemperature: waterTemperature,
        timestamp: time:utcToString(time:utcNow())
    };
}

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowCredentials: false,
        allowHeaders: ["*"],
        allowMethods: ["GET", "OPTIONS"]
    }
}
service /weather on new http:Listener(9090) {
    
    resource function get [string city]() returns WeatherData|error {
        return getWeatherData(city);
    }
    
    resource function get newyork() returns WeatherData|error {
        return getWeatherData("New York");
    }
    
    resource function get london() returns WeatherData|error {
        return getWeatherData("London");
    }
    
    resource function get tokyo() returns WeatherData|error {
        return getWeatherData("Tokyo");
    }
    
    resource function get sydney() returns WeatherData|error {
        return getWeatherData("Sydney");
    }
    
    resource function get marine(decimal lat, decimal lng) returns WeatherData|error {
        return getWeatherDataByCoords(lat, lng);
    }
}

public function main() returns error? {
    log:printInfo("Weather Info Service started on port 8080");
    log:printInfo("Replace 'b9c0f85939a74e2ca546e823f747f950' with actual OpenWeatherMap API key");
}
