"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publish = void 0;
var _emqxApi = require("../services/emqx-api.js");
var _userModel = require("../models/user.model.js");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// auth.controller.js

// import { stack } from 'sequelize/types/utils.js';
_dotenv.default.config();
const publish = async (req, res) => {
  try {
    const {
      topic,
      payload
    } = req.body;

    // Check if the Authorization header is present
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized. Token not provided.'
      });
    }
    const client = await _userModel.Client.findOne({
      where: {
        client: topic
      }
    });
    if (!client) {
      res.status(404).send("User not found.");
      return;
    }
    // Verify and decode the token
    _jsonwebtoken.default.verify(token.replace('Bearer ', ''), 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: 'Unauthorized. Invalid token.'
        });
      }

      // Example: Publish a message to a topic
      _emqxApi.API.post(process.env.API_PUBLISH,
      // Adjust the endpoint based on your EMQX version
      {
        topic,
        payload: JSON.stringify(payload),
        qos: 0,
        retain: false
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(publishResponse => {
        res.json(publishResponse.data);
      }).catch(error => {
        console.error('Error during publish:', error);
        res.status(500).json({
          error: 'Internal Server Error'
        });
      });
    });
  } catch (error) {
    console.error('Error during publish:', error);
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

// export const topics = async (req , res ) => {
//   try {
//     const { topic ,typeClient} = req.body;

//     API.post(
//       process.env.API_TOPICS, // Adjust the endpoint based on your EMQX version
//       {
//         topic,
//         typeClient
//       },
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     )
//     .then((publishResponse) => {
//       res.json(publishResponse.data);
//     })
//     .catch((error) => {
//       console.error('Error during publish:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     });
//   }catch(error){
//     console.error('Error status Client : ',error);
//     res.status(500).json({error: 'Internal Server Error'});
//   }
// };
exports.publish = publish;