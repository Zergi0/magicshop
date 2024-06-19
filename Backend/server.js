require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const ItemModel = require("./model/item")
const app = express();

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/items', async (req,res) => {
    const items = await ItemModel.find();
    return res.json(items);
});

app.get('/api/item/:id', async (req,res) =>{
  const item = await ItemModel.findById(req.params.id);
  return res.json(item);
})

app.post('/api/item', async (req,res) =>{
  try{
    const newItem = req.body;
    ItemModel.create(newItem);
    return res.json(newItem);
  } catch(err) {
    return next(err);
  }
})

app.patch('/api/item', async (req, res) =>{
  try{
    const newItem = await ItemModel.findOneAndUpdate(
      {_id:req.params.id},
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(newItem);
  } catch (err){
    return next(err);
  }
})


const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
  });
};
main().catch((err) => {
  console.error(err);
  process.exit(1);
});