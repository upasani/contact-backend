const jwt = require('jsonwebtoken');

const ValidateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ msg: "User is not authorized or token is not provided" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            req.status(401).send({ error: "please provide the token" })
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ msg: "Token is expired or invalid" });
            }
            console.log("the decoded value is", decoded);

            req.user = decoded; // Optionally attach decoded token data to req
            next(); // Proceed to the next middleware
        });

    } catch (e) {
        console.error(e); // Log the error for debugging
        return res.status(500).send({ msg: "Internal server error" });
    }
}

module.exports = ValidateToken;
