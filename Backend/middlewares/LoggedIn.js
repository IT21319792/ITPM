import { verifyToken } from "../controllers/UserController.js";

export const LoginValidator = (req, res, next) => {
    // Access the Authorization header
    const authorizationHeader = req.headers['authorization'];
  
    if (authorizationHeader) {
      
      const token = authorizationHeader.split(' ')[1];
     // console.log('Token:', token);
      const id = verifyToken(token);

      // Pass the token to the next middleware or route handler
      req.loggedInId = id.email; //this email have the document id, its not an email address
  
      next();
    } else {
      // Handle the case where the Authorization header is missing
      res.status(401).json({ message: 'Unauthorized: Token is Missing, Please Login Again' });
    }
  }
  