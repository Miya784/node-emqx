// auth.controller.js
import { API } from '../services/emqx-api.js';
import { User, Client } from "../models/user.model.js";
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

export const topics = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username is required.' });
    }

    const user = await User.findOne({ where: { user: username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials. User not found.' });
    }

    const userData = {
      userId: user.id,
      username: user.user,
      client: await Client.findAll({ where: { userId: user.id }, attributes: ['typeClient', 'client'] })
    };

    // const resclients = await API.get(`/api/v5/clients?username=${username}`);
    // const result = resclients.data.data.map((data) => {
    //   const connectedClient = userData.client.find((client) => {
    //     return data.username === username && data.connected === true && client.client === data.clientid;
    //   });
    //   return { connected: connectedClient ? true : false };
    // });

    return res.status(200).json(userData);
  } catch (error) {
    console.error('Error status Client : ', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
