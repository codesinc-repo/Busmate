const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret_key); // Use environment variable

admin.initializeApp();

const db = admin.firestore();
const endpointSecret = functions.config().stripe.webhook_secret; // Use environment variable

exports.handleStripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Store the event in Firestore
  try {
    await db.collection("stripe_events").add({
      type: event.type,
      data: event.data.object,
      created: admin.firestore.Timestamp.now(),
    });
    console.log(`Stored event ${event.id} of type ${event.type}`);
  } catch (error) {
    console.error("Error storing event in Firestore:", error);
  }

  // Handle the event
  switch (event.type) {
  case "checkout.session.async_payment_failed":
    console.log("Payment failed:", event.data.object);
    // Implement your logic here, e.g., update order status, notify user
    break;

  case "checkout.session.async_payment_succeeded":
    console.log("Payment succeeded:", event.data.object);
    // Implement your logic here, e.g., update order status, notify user
    break;

  case "checkout.session.completed":
    console.log("Checkout session completed:", event.data.object);
    // Implement your logic here, e.g., fulfill order, send confirmation
    break;

  case "customer.created":
    console.log("Customer created:", event.data.object);
    // Implement your logic here, e.g., create user record in your system
    break;

  case "customer.updated":
    console.log("Customer updated:", event.data.object);
    // Implement your logic here, e.g., update user record in your system
    break;

  default:
    console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});
