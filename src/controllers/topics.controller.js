import { User } from "../models/user.model.js";
import {  Client } from "../models/client.model.js";
import { API } from '../services/emqx-api.js';
import { config } from '../config/loadenv.js';

export const topics = async (req, res) => {
    try {
      const { username } = req.body;
  
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
        client: await Client.findAll({ where: { userId: user.id }, attributes: ['typeClient', 'client', 'status'] })
      };
  // console.log(userData)
    const resclients = await API.get(`/api/v5/clients?username=${user.user}`);
    const result = userData.client.map((client) => {
    const connectedClient = resclients.data.data.find((data) => {
      return data.username === userData.username && data.connected === true && client.client === data.clientid;
    });
    return {
      typeClient: client.typeClient,
      client: client.client,
      connected: connectedClient ? true : false,
      status: client.status
    };
  });
  
      return res.status(200).json({userData: result});
    } catch (error) {
      console.error('Error status Client : ', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  