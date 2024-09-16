// server.js
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const stripe = require("stripe")("YOUR_STRIPE_SECRET_KEY"); // Replace with your Stripe secret key
const endpointSecret = "YOUR_STRIPE_WEBHOOK_SECRET"; // Replace with your Stripe webhook secret

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://bus-driver-navigation-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore();
const app = express();

app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.post("/webhooks/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const data = event.data.object;

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await firestore.collection("stripe_events").add({
          eventType: "checkout.session.completed",
          sessionId: data.id,
          customerId: data.customer,
          amountTotal: data.amount_total / 100,
          createdAt: new Date(),
        });
        console.log("Checkout session completed event saved to Firestore");
        break;

      case "checkout.session.async_payment_failed":
        await firestore.collection("stripe_events").add({
          eventType: "checkout.session.async_payment_failed",
          sessionId: data.id,
          customerId: data.customer,
          amountTotal: data.amount_total / 100,
          createdAt: new Date(),
        });
        console.log("Async payment failed event saved to Firestore");
        break;

      case "checkout.session.async_payment_succeeded":
        await firestore.collection("stripe_events").add({
          eventType: "checkout.session.async_payment_succeeded",
          sessionId: data.id,
          customerId: data.customer,
          amountTotal: data.amount_total / 100,
          createdAt: new Date(),
        });
        console.log("Async payment succeeded event saved to Firestore");
        break;

      case "checkout.session.expired":
        await firestore.collection("stripe_events").add({
          eventType: "checkout.session.expired",
          sessionId: data.id,
          customerId: data.customer,
          createdAt: new Date(),
        });
        console.log("Checkout session expired event saved to Firestore");
        break;

      case "customer.created":
        await firestore.collection("stripe_events").add({
          eventType: "customer.created",
          customerId: data.id,
          email: data.email,
          createdAt: new Date(),
        });
        console.log("Customer created event saved to Firestore");
        break;

      case "customer.updated":
        await firestore.collection("stripe_events").add({
          eventType: "customer.updated",
          customerId: data.id,
          email: data.email,
          createdAt: new Date(),
        });
        console.log("Customer updated event saved to Firestore");
        break;

      case "customer.deleted":
        await firestore.collection("stripe_events").add({
          eventType: "customer.deleted",
          customerId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer deleted event saved to Firestore");
        break;

      case "customer.bank_account.created":
        await firestore.collection("stripe_events").add({
          eventType: "customer.bank_account.created",
          customerId: data.customer,
          bankAccountId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer bank account created event saved to Firestore");
        break;

      case "customer.bank_account.deleted":
        await firestore.collection("stripe_events").add({
          eventType: "customer.bank_account.deleted",
          customerId: data.customer,
          bankAccountId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer bank account deleted event saved to Firestore");
        break;

      case "customer.bank_account.updated":
        await firestore.collection("stripe_events").add({
          eventType: "customer.bank_account.updated",
          customerId: data.customer,
          bankAccountId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer bank account updated event saved to Firestore");
        break;

      case "customer.card.created":
        await firestore.collection("stripe_events").add({
          eventType: "customer.card.created",
          customerId: data.customer,
          cardId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer card created event saved to Firestore");
        break;

      case "customer.card.deleted":
        await firestore.collection("stripe_events").add({
          eventType: "customer.card.deleted",
          customerId: data.customer,
          cardId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer card deleted event saved to Firestore");
        break;

      case "customer.card.updated":
        await firestore.collection("stripe_events").add({
          eventType: "customer.card.updated",
          customerId: data.customer,
          cardId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer card updated event saved to Firestore");
        break;

      case "customer.discount.created":
        await firestore.collection("stripe_events").add({
          eventType: "customer.discount.created",
          customerId: data.customer,
          discountId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer discount created event saved to Firestore");
        break;

      case "customer.discount.deleted":
        await firestore.collection("stripe_events").add({
          eventType: "customer.discount.deleted",
          customerId: data.customer,
          discountId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer discount deleted event saved to Firestore");
        break;

      case "customer.discount.updated":
        await firestore.collection("stripe_events").add({
          eventType: "customer.discount.updated",
          customerId: data.customer,
          discountId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer discount updated event saved to Firestore");
        break;

      case "customer.source.created":
        await firestore.collection("stripe_events").add({
          eventType: "customer.source.created",
          customerId: data.customer,
          sourceId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer source created event saved to Firestore");
        break;

      case "customer.source.deleted":
        await firestore.collection("stripe_events").add({
          eventType: "customer.source.deleted",
          customerId: data.customer,
          sourceId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer source deleted event saved to Firestore");
        break;

      case "customer.source.expiring":
        await firestore.collection("stripe_events").add({
          eventType: "customer.source.expiring",
          customerId: data.customer,
          sourceId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer source expiring event saved to Firestore");
        break;

      case "customer.source.updated":
        await firestore.collection("stripe_events").add({
          eventType: "customer.source.updated",
          customerId: data.customer,
          sourceId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer source updated event saved to Firestore");
        break;

      case "customer.subscription.created":
        await firestore.collection("stripe_events").add({
          eventType: "customer.subscription.created",
          customerId: data.customer,
          subscriptionId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer subscription created event saved to Firestore");
        break;

      case "customer.subscription.deleted":
        await firestore.collection("stripe_events").add({
          eventType: "customer.subscription.deleted",
          customerId: data.customer,
          subscriptionId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer subscription deleted event saved to Firestore");
        break;

      case "customer.subscription.paused":
        await firestore.collection("stripe_events").add({
          eventType: "customer.subscription.paused",
          customerId: data.customer,
          subscriptionId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer subscription paused event saved to Firestore");
        break;

      case "customer.subscription.pending_update_applied":
        await firestore.collection("stripe_events").add({
          eventType: "customer.subscription.pending_update_applied",
          customerId: data.customer,
          subscriptionId: data.id,
          createdAt: new Date(),
        });
        console.log(
          "Customer subscription pending update applied event saved to Firestore",
        );
        break;

      case "customer.subscription.pending_update_expired":
        await firestore.collection("stripe_events").add({
          eventType: "customer.subscription.pending_update_expired",
          customerId: data.customer,
          subscriptionId: data.id,
          createdAt: new Date(),
        });
        console.log(
          "Customer subscription pending update expired event saved to Firestore",
        );
        break;

      case "customer.subscription.resumed":
        await firestore.collection("stripe_events").add({
          eventType: "customer.subscription.resumed",
          customerId: data.customer,
          subscriptionId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer subscription resumed event saved to Firestore");
        break;

      case "customer.subscription.trial_will_end":
        await firestore.collection("stripe_events").add({
          eventType: "customer.subscription.trial_will_end",
          customerId: data.customer,
          subscriptionId: data.id,
          createdAt: new Date(),
        });
        console.log(
          "Customer subscription trial will end event saved to Firestore",
        );
        break;

      case "customer.subscription.updated":
        await firestore.collection("stripe_events").add({
          eventType: "customer.subscription.updated",
          customerId: data.customer,
          subscriptionId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer subscription updated event saved to Firestore");
        break;

      case "customer.tax_id.created":
        await firestore.collection("stripe_events").add({
          eventType: "customer.tax_id.created",
          customerId: data.customer,
          taxId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer tax ID created event saved to Firestore");
        break;

      case "customer.tax_id.deleted":
        await firestore.collection("stripe_events").add({
          eventType: "customer.tax_id.deleted",
          customerId: data.customer,
          taxId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer tax ID deleted event saved to Firestore");
        break;

      case "customer.tax_id.updated":
        await firestore.collection("stripe_events").add({
          eventType: "customer.tax_id.updated",
          customerId: data.customer,
          taxId: data.id,
          createdAt: new Date(),
        });
        console.log("Customer tax ID updated event saved to Firestore");
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Error saving event to Firestore:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
