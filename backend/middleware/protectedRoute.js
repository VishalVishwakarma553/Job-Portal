import jwt, { decode } from "jsonwebtoken";
// for those task which only can be by authorized people
const protectedRoute = (req, res, next) => {
  try {
    //take token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }
    //verify the token is correct by providing secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Token is invalid",
      });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log("error in protected route", error);
  }
};
export default protectedRoute;
