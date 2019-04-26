var net = require('net');
var server = net.createServer(function (connection) {
    console.log('Client connected');

    connection.on('end', function () {
        console.log('Client disconnected');
    });

    connection.write('Hello Niman\r\n');
    connection.pipe(connection);
});

server.listen(8080, function () {
    console.log('Server running on http://localhost:8080');
})