const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();



mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => console.log("DB connected"))
  .catch((err) => {console.log(err)});

  app.use(cors());
app.use(express.json());

app.use("/auth" , authRoute);
app.use("/user" , userRoute);
app.use("/product" , productRoute);
app.use("/cart" , cartRoute);
app.use("/order" , orderRoute);
app.use("/checkout" , stripeRoute);





app.listen(process.env.PORT || 4000, () => {
  console.log("server Running");
});
