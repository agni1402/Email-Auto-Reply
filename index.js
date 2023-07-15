const express = require("express");
const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

const port = 9090;
const app = express();

//the scopes that we want to access 
const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.labels",
  "https://mail.google.com/",
];

// label name
const labelName = "Auto-Responded";


app.get("/", async (req, res) => {

  //Google GMAIL  authentication 
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "credentials.json"),
    scopes: SCOPES,
  });

  console.log("this is auth",auth)

  //Finding authorized gmail id
  const gmail = google.gmail({ version: "v1", auth });


  //getting all unread and unreplied emails
  async function getUnrepliedEmails(auth) {
    const gmail = google.gmail({ version: "v1", auth });
    const response = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["INBOX"],
      q: "is:unread",
    });
    
    return response.data.messages || [];
  }

  //to get a label id
  async function createLabel(auth) {
    const gmail = google.gmail({ version: "v1", auth });
    try {
      const response = await gmail.users.labels.create({
        userId: "me",
        requestBody: {
          name: labelName,
          labelListVisibility: "labelShow",
          messageListVisibility: "show",
        },
      });
      return response.data.id;
    } catch (error) {
      if (error.code === 409) {
        const response = await gmail.users.labels.list({
          userId: "me",
        });
        const label = response.data.labels.find(
          (label) => label.name === labelName
        );
        return label.id;
      } else {
        throw error;
      }
    }
  }

  async function main() {
    // create label
    const labelId = await createLabel(auth);

    // Repeat in Random intervals
    setInterval(async () => {
      //Get unreplied and new emails
      const emails = await getUnrepliedEmails(auth);

      //checking that is there any gmail that did not get reply
      if (emails && emails.length > 0) {
        for (const email of emails) {
          const emailData = await gmail.users.messages.get({
            auth,
            userId: "me",
            id: email.id,
          });

          const email = emailData.data;
          const hasReplied = email.payload.headers.some(
            (header) => header.name === "In-Reply-To"
          );

          if (!hasReplied) {

            // compose the reply message
            const replyEmail = {
              userId: "me",
              resource: {
                raw: Buffer.from(
                  `To: ${
                    email.payload.headers.find(
                      (header) => header.name === "From"
                    ).value
                  }\r\n` +
                    `Subject: Re: ${
                      email.payload.headers.find(
                        (header) => header.name === "Subject"
                      ).value
                    }\r\n` +
                    `Content-Type: text/plain; charset="UTF-8"\r\n` +
                    `Content-Transfer-Encoding: 7bit\r\n\r\n` +
                    `I cannot see your email right now as I'm currently on vacation and will reply to you when I return.\nRegards,\nAbhilash Agnihotri\r\n`
                ).toString("base64"),
              },
            };

            await gmail.users.messages.send(replyEmail);

            //Add label to the email so that it can move to its respective label
            gmail.users.messages.modify({
              auth,
              userId: "me",
              id: message.id,
              resource: {
                addLabelIds: [labelId],
                removeLabelIds: ["INBOX"],
              },
            });
          }
        }
      }
    }, Math.floor(Math.random() * (120 - 45 + 1) + 45) * 1000);
  }

  main();
  res.json({ "this is Auth": auth });
});

app.listen(port, () => {
  console.log(`server is running ${port}`);
});