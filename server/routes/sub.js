import express from "express";
import checkAuth from "../middleware/index.js";
import stripe from "../utils/stripe.js";


const router = express.Router()

router.get("/products", async (req, res) => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map(({ id, name, default_price }) => {
    return {
      id,
      name,
      canDownload: true,
      canWatchTrailerParkBoys: name === "Premium Plan" ? true : false,
      price: {
        amount: default_price.unit_amount,
        id: default_price.id,
      },
    };
  });  

  return res.json(products);
});

router.post("/session", async (req, res) => {
  const { priceId, email } = req.body;
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: "https://emveeflix.onrender.com/browse",
    cancel_url: "https://emveeflix.onrender.com//plans",
    customer_email: email,
  });

  return res.json(session);
});

router.get("/subscription", checkAuth, async (req, res) => {
  res.json(req.user);
});

export default router;
