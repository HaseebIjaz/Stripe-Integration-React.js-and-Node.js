import cors from "cors";
import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import config from "./config/index.js";

console.log(config);
const { sk_test, port } = config;
// uuidv4();
console.log({ port, sk_test });
const app = express();
const stripe = new Stripe(sk_test);

//middlewares
app.use(express.json()); //middleware to handle json data
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("IT WORKS AT WORK ONLINE");
});
app.post("/payment", async (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product), console.log("PRICE", product.price);

  //Idempotent Key for not charging the user twice
  //Every time this route is hit , a unique key is generated
  const idempotencyKey = uuidv4();

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `purchase of ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country,
          },
        },
      },
      { idempotencyKey }
    );
    res.status(200).json(charge);
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
});

//listen
app.listen(port, () => {
  console.log("Listening at port 8282");
});
