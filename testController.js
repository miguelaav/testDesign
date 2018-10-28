// Import contact model
Test = require('./testModel');
// Handle index actions
exports.index = function (req, res) {
    
    Test.get(function (err, test) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Test retrieved successfully",
            data: test
        });
        //console.log(test);
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var test = new Test();
    test.name = req.body.name ? req.body.name : test.name;
    test.apellido = req.body.apellido;

// save the contact and check for errors
    test.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New test created!',
            data: test
        });
    });
};


// Handle delete contact
exports.delete = function (req, res) {
  
    
    Test.remove({
        _id: req.params.test_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Test deleted'
        });
    });
    
};