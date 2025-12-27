import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, '7bbd0f6142beeda75c259a410ccb6c9877c8acd1b1dda753309a8db7f95f35b548bcc6854773342ceca4234e58b0a22af1d81139bdd2a020b19ca8db04191fc0');
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
