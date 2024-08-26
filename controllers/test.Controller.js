// Description: Test Controller for testing purposes only!
const testController = (req, res) => {
    res.status(200).send({
         message : "test routes using nodemon",
         success : true,
    })
};

module.exports = testController ;