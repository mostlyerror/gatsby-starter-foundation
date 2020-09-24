require('dotenv').config()
  const querystring = require("querystring");
  const phone = require("phone");
  const {
    ACCOUNT_SID,
    AUTH_TOKEN,
  } = process.env;

exports.handler = function (event, context, callback) {

  const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);
  
  const data = querystring.parse(event.body);
  const phoneNumber = phone(data.mobile);
  const outgoingPhoneNumber = '15108803280'

  (async() => {
    client.messages
      .create({
        body: `Hi ${data.firstName}, your ballot request was received!`,
        to: phoneNumber,
        from: outgoingPhoneNumber
      })
      .then(message => {
        console.log(message.sid)
 
        const response = {
          message: `Response sent to ${phoneNumber}`,
          success: true
        }
 
        callback(null, {
          statusCode: "200",
          body: JSON.stringify(response),
          headers: {
            "Content-Type": "text/json"
          }
        })
      });
    })()
};