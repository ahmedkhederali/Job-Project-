require('dotenv').config();
require('express-async-errors');

//Security
const helmt=require('helmet')
const cors=require('cors')
const xss=require('xss-clean')
const reateLimiter=require('express-rate-limit')

const express = require('express');
const app = express();
const jobRouter=require('./routes/jobs')
const authRouter=require('./routes/auth')
//connect DB
const connectDB=require("./db/connect")
// to protect jobs router 
//مش اي حد يقدر يروح علي الرووت بتاع الجوب الا لما يكون يوز فعلي
const authenticationUser=require("./middleware/authentication")
//json 
app.use(express.json());

//Router
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/job",authenticationUser,jobRouter) // protect jobRouter BY authenticationUser

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// extra packages for security
app.set('trust proxy', 1) //Where 1 is the number of proxies between the user and the server 

app.use(helmt());
app.use(cors());
app.use(xss());
// from documentation
app.use(reateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))
 // to test when upload project to ensure the project is working
app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGo_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
