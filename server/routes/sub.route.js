// subscriptions logic
// connects to our index.js file
//------------------------------

// import express router
import express from "express";
import stripe from "../utils/stripe.js";
import { verifyToken } from "../utils/verifyUser.js";
import fetchSubscription from "../services/fetchSubscription.js";

const router = express.Router();

// logic to fetch our products

router.get("/products", async (req, res) => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map(({ id, name, default_price }) => {
    return {
      id,
      name,
      canDownload: true,
      canWatchTPB: name === "Premium Plan" ? true : false,
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
    success_url: "https://localhost:8080/browse",
    cancel_url: "https://localhost:8080/plans",
    customer_email: email,
  });

  return res.json(session);
});

router.get("/subscription", verifyToken, async (req, res) => {
  const response = await stripe.customers.search({
    query: `email: \'${req.user.email}\'`,
  });

  if (response.data[0]) {
    const subscription = await fetchSubscription(req.user.email);

    res.json(subscription);
  }
});

export default router;