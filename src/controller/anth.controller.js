import bcrypt from "bcrypt";
import { User, Client } from "../models/user.model.js";
import { post as emqxPost } from "../services/emqx-api.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required"
      });
    }
    console.log('Request Body:', req.body);

    // Check if the username already exists
    const existingUser = await User.findOne({
      where: {
        user: username
      }
    });
    if (existingUser) {
      return res.status(400).json({
        error: 'Username already exists.'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Insert the new user into the database
    const newUser = await User.create({
      user: username,
      password: hashedPassword
    });

    // Create associated client
    const newClient = await Client.create({
      userId: newUser.id
    });

    // Call EMQX API to create the user
    const response = await emqxPost(process.env.API_AUTHEN, {
      password: password,
      user_id: username
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("User created successfully:", response.data);

    // Send a response with the user data or a success message
    return res.status(200).json({
      success: true,
      message: 'User registered successfully.',
      user: {
        userId: newUser.id,
        username: newUser.user,
        client: {
          clientId: newClient.id,
          typeClient: newClient.typeClient,
          client: newClient.client
        }
      }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({
      where: {
        user: username
      }
    });
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials. User not found.'
      });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Invalid credentials. Password does not match.'
      });
    }

    // Retrieve user's name and ID along with associated client details
    const userData = {
      userId: user.id,
      username: user.user,
      client: await Client.findOne({
        where: {
          userId: user.id
        }
      })
    };

    // Create a JWT token
    const token = jwt.sign(userData, 'your_secret_key', {
      expiresIn: '1h'
    });
    return res.status(200).json({
      token,
      userData
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};
