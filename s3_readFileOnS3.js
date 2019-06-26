var fs = require('fs');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-central-1'});

new AWS.S3({apiVersion: '2006-03-01'})
    .getObject({ Bucket: 'bac-invoices-customers', Key: 'JavaGenericsFAQ.pdf' }, function(err, data)
{
    if (!err) {
        console.log(data.Body.toString());
        
        var path = 'JavaGenericsFAQ.pdf';
        var buffer = data.Body;

fs.open(path, 'w', function(err, fd) {
    if (err) {
        throw 'error opening file: ' + err;
    }

    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function() {
            console.log('file written');
        })
    });
});
    }
        
});