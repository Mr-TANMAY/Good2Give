const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No token provided.",
      });
    }

    // Check if the header is in the expected format
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).send({
        success: false,
        message: "Invalid token format.",
      });
    }

    // Extract the token
    const token = parts[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Authentication failed",
        });
      }

      // Attach user info to the request object
      req.user = decode;
      next();
    });
  } catch (error) {
    console.log("Error in authMiddleware:", error);
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
      error: error.message,
    });
  }
};
