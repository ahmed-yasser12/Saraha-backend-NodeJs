import express from 'express'
import { conntionDb } from './DB/connection.js';
import * as allRouters from './src/Modules/index.routes.js';
import { config } from 'dotenv';
config()
conntionDb()
let app = express();
let port =process.env.PORT
app.use(express.json()) // buffer to object 
app.use(express.urlencoded({ extended: true }));
app.use('/user',allRouters.userRouter)
app.use('/msg',allRouters.messageRouter)
app.use('*',(req,res,next)=>{
    res.status(404).json({message:"404 Not Found !"})
})
app.use('uploadsPic',express.static('./uploads'));
app.use((err, req, res, next) => {
  return res.status(err.cause || 500).json({
    message: err.message,
    stack: err.stack
  });
});
app.listen(port, () => { console.log("server is running") }) 