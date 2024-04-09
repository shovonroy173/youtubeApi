const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoute = require("./routes/auth")
const userRoute = require("./routes/users");
const videoRoute = require("./routes/videos");
const commentRoute = require("./routes/comments");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
dotenv.config();
 

mongoose.connect(process.env.MONGO_URL )
                .then(()=>{console.log("Database connnection");})
                .catch((err)=>{console.log("Database not  connnected" , err);})



app.use("/api/auth" , authRoute);
app.use("/api/users" ,userRoute );
app.use("/api/videos" , videoRoute );
app.use("/api/comments" , commentRoute)

app.use((err , req , res , next)=>{
    const status = err.status || 500;
    const messege = err.message || "Something went wrong";
    res.status(status).send({
        success:false , 
        status:status , 
        message:messege
    });
}
)

app.listen(process.env.PORT , ()=>{
    console.log("Server running on port " , process.env.PORT);
})                