let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
var testController = require('./testController');
// Contact routes
router.route('/test')
    .get(testController.index)
    .post(testController.new);
router.route('/test/:test_id')
    .delete(testController.delete);
// Export API routes
module.exports = router;