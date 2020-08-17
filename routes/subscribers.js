const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Subscriber = require("../models/subscriber");

// FIND ALL
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// FIND ONE
router.get("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findOne({ _id: `${req.params.id}` });
    res.json(subscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE ONE
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE ONE
router.patch("/:id", async (req, res) => {
  const subscriber = await Subscriber.findOne({ _id: req.params.id });
  const updatedSubscriber = {
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  };
  try {
    await subscriber.updateOne(updatedSubscriber);
    res.status(200).json(updatedSubscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE ONE
router.delete("/:id", async (req, res) => {
  try {
    await Subscriber.find({ _id: `${req.params.id}` }).deleteOne();
    res.send("Subscriber Deleted");
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
