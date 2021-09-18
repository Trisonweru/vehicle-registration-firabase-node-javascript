const express = require("express");
const fs = require("firebase-admin");
var bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const serviceAccount = require("./weruportfolioblog-03912ab23b4c.json");
const { json } = require("express");

const app = express();
var jsonParser = bodyParser.json();

app.use(cors());

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});
const db = fs.firestore();

app.get("/all", async (req, res) => {
  try {
    const vehicles = await db.collection("registration");
    const data = await vehicles.get();
    const vehiclesArray = [];
    if (data.empty) {
      res.status(404).send("No student record found");
    } else {
      data.forEach((doc) => {
        let vehicleData = {
          id: doc.id,
          username: doc.data().username,
          licence: doc.data().licence,
          model: doc.data().model,
          number: doc.data().number,
        };
        vehiclesArray.push(vehicleData);
      });
      res.send(vehiclesArray);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/register", jsonParser, async (req, res) => {
  try {
    const usersDb = db.collection("registration");
    const reg = usersDb.doc(req.body.username);
    await reg.set(req.body);
    res.send({ status: "SUCCESS" });
  } catch (err) {
    console.log(err);
  }
});
app.post("/update", jsonParser, async (req, res) => {
  try {
    id = req.body.id;
    const usersDb = db.collection("registration");
    const reg = usersDb.doc(id);
    await reg.set(req.body);
    res.send({ status: "SUCCESS" });
  } catch (err) {
    console.log(err);
  }
});
app.post("/delete", jsonParser, async (req, res) => {
  try {
    id = req.body.id;
    await db.collection("registration").doc(id).delete();
    res.send({ status: "DELETED" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
