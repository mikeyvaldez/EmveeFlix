import JWT from "jsonwebtoken";

export default async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken)
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized",
        },
      ],
    });
  const jwt = bearerToken.split("Bearer ")[1];
  if (!jwt)
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized",
        },
      ],
    });

  let payload;
  try {
    console.log("REACHED");
    payload = await JWT.verify(jwt, process.env.JWT_SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized",
        },
      ],
    });
  }
};
