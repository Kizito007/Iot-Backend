var gps = require("gps-tracking");
var port = 9000;
var options = {
    'debug': true,
    'port': port,
    'device_adapter': "TK218"
}




var server = gps.server(options, function (device, connection) {
    console.log('Activating GPS Server on Port 9000');
    /******************************
     LOGIN
     ******************************/
    device.on("login_request", function (device_id, msg_parts) {
        console.log("Hi! i'm login_request", device_id);
        // console.log(msg_parts);
        this.login_authorized(true, msg_parts); //Accept the login request.
        //Request Vin

        //check if it exists
        
        

        //
    });
    device.on('error', function (er) {
        // console.log("Incoming Error from :" + device.getUID());
        // console.log(er.code);
    });
    device.on("send_msg", function (id, msg) {
        server.send_to(id, msg);
    })

    device.on("login", function () {
        console.log("Hi! i'm " + device.uid);
    });
    device.on('data', function (data) {
        //console.log('Data from ' + device.getUID() + ':' + data);
        if (typeof(data) === "undefined") {
            dt = "Undefined"
            //server.send_to(device.uid, "Message Recieved")
            
        
        }
        else {
            dt = "Device  :" + data;
        }
        
        // for (item in data){
        //     console.log(item);
        // }
        //server.send("Message Recieved");
        

    });
    //PING -> When the gps sends their position  
    device.on("ping", function (data) {

        //After the ping is received, but before the data is saved
        console.log(data);
        return data;

    });

});
server.setDebug(true);

