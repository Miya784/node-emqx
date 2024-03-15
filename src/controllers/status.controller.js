import { Client } from "../models/client.model.js";

export const status = async (req, res) => {
  try {
    const { topic } = req.body;

    const client = await Client.findOne({ where: { client: topic } });
    if (!client) {
      return res.status(401).json({ error: 'Unauthorized. Client not provided.' });
    }

    const clientStatus = await Client.findAll({
      where: {
        client: topic
      },
      attributes: ['status']
    });

    return res.status(200).json({
      status: clientStatus
    });
  } catch (error) {
    console.error('Error during status:', error);
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};
