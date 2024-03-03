import { User, Client } from '../models/user.model.js';

const addClient = async (req, res) => {
  try {
    const { userId, newtypeClient, newclient } = req.body;

    // Check if the Authorization header is present
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized. Token not provided.'
      });
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }

    // Check if the client already exists for the user
    const existingClient = await Client.findOne({
      where: {
        userId: user.id,
        typeClient: newtypeClient,
        client: newclient
      }
    });
    if (existingClient) {
      res.status(400).send("Client already associated with the user.");
      return;
    }

    // If the client doesn't exist, create a new client
    const createdClient = await Client.create({
      userId: user.id,
      typeClient: newtypeClient,
      client: newclient
    });
    res.status(200).json({
      userId,
      newtypeClient,
      newclient,
      message: 'Client added successfully.'
    });
  } catch (error) {
    console.error('Error adding client:', error);
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
};

const getClients = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate that userId and atHome are present
    if (!userId) {
      console.log("User ID or atHome is missing in the request.");
      res.status(400).send("User ID or atHome is missing in the request.");
      return;
    }
    const user = await User.findByPk(userId);
    if (!user) {
      console.log("User not found.");
      res.status(404).send("User not found.");
      return;
    }
    const clients = await Client.findAll({
      where: {
        userId: user.id
      }
    });
    const clientData = clients.map(client => ({
      typeClient: client.typeClient,
      client: client.client
    }));
    console.log("Client data:", clientData);
    res.status(200).json({
      userId,
      clients: clientData
    });
  } catch (error) {
    console.error('Error retrieving clients:', error);
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
};

export { addClient, getClients };
