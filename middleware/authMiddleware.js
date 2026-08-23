import jwt from "jsonwebtoken";


const authMiddleware=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader)
        {
            return res.status(401).json({
                success:false,
                message:"Authorization token is required"
            });
        }
        //expected bearer token
        const parts=authHeader.split(" ");
        if(parts.length!==2 || parts[0]!=="Bearer")
        {
            return res.status(401).json({
                success:false,
                message:"Invalid Authorization format"
            })
        }
        
        const token=parts[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //stored user information in request
        req.user=decoded;
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        });
    }
}
export default authMiddleware;