const  express = require('express')
require('dotenv').config();
const  dbconfig = require('./config/dbConfig.js')
const  usersRoute = require('./routes/usersRoute.js')
const  productsRoute = require("./routes/productRoute.js")
const bidsRoute = require("./routes/bidsRoute.js")
const  notificationsRoute = require("./routes/notificationsRoute.js")

const app = express();
app.use(express.json());


app.use('/api/users' , usersRoute)
app.use('/api/products' , productsRoute)
app.use('/api/bids', bidsRoute);
app.use('/api/notifications', notificationsRoute);


// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}


const port = process.env.PORT || 1111;
app.listen(port , () => console.log(`sever started ${port}`));


