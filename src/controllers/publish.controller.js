// src/controllers/publish.controllers.js
import { API } from '../services/emqx-api.js';
import {  Client } from "../models/client.model.js";
import jwt from 'jsonwebtoken';
import { config } from '../config/loadenv.js';

export const publish = async (req, res) => {
  try {
    const { topic, payload } = req.body;

    // Check if the Authorization header is present
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized. Token not provided.' });
    }
    const client = await Client.findOne({ where: { client: topic } });
    if (!client) {
      res.status(401).json({ error: 'Unauthorized. client not provided.' });
      return;
    }
    // Verify and decode the token
    jwt.verify(token.replace('Bearer ', ''), 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
      }

      // Example: Publish a message to a topic
      API.post(
        config.API_PUBLISH, // Adjust the endpoint based on your EMQX version
        {
          topic,
          payload: JSON.stringify(payload),
          qos: 0,
          retain: false,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((publishResponse) => {
          if (publishResponse.status === 200) {
            res.json(publishResponse.data);
          } else if (publishResponse.data === "no_matching_subscribers") {
            res.status(400).json({ error: "No subscribers" });
          } else {
            res.status(500).json({ error: "Error in subscribers" });
          }
                })
        .catch((error) => {
          console.error('Error during publish:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    });
  } catch (error) {
    console.error('Error during publish:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};