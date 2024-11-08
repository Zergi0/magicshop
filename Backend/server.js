require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const ItemModel = require("./model/item");
const UserModel = require("./model/user");
const app = express();

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}


app.get('/', (req, res) => {
  res.send('Hello World!')
});

//item api
app.get('/api/items', async (req,res) => {
    const items = await ItemModel.find();
    return res.json(items);
});

app.get('/api/item/:id', async (req,res) =>{
  const item = await ItemModel.findById(req.params.id);
  return res.json(item);
});

app.post('/api/item', async (req,res) =>{
  try{
    const newItem = req.body;
    ItemModel.create(newItem);
    return res.json(newItem);
  } catch(err) {
    return next(err);
  }
});

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
});

app.delete('/api/item/:id', async (req, res) => {
  try{
    const deletedItem = await ItemModel.findByIdAndDelete(req.params.id);
    return res.json(deletedItem);
  } catch (err){
    return next(err);
  }
})

//user api

app.get('/api/users', async (req, res) => {
  const users = await UserModel.find();
  return res.json(users);
});

app.get('/ap/user/:id', async (req, res) =>{
  const user = await UserModel.findById(req.params.id);
  return res.json(users);
});

app.post('/api/user', async (req, res) => {
  try{
    const newUser = req.body;
    UserModel.create(newUser);
    return res.json(newUser);
  } catch(err) {
    return next(err);
  }
});

app.patch('/api/user/:id', async (req,res) => {
  try{
    const newUser = await UserModel.findOneAndUpdate(
      {_id:req.params.id},
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(newUser);
  } catch (err){
    return next(err);
  }
});

app.delete('/api/user/:id', async (req,res) =>{
  try{
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    return res.json(deletedUser);
  } catch(err){
    return next(err);
  }
});

app.get('/api/login', async (req,res) => {
  try{
    const userMatchingUsername = await UserModel.findOne({userName : req.body.userName});
    const usersHashedPassword = req.body.password;
    //TODO: hashing
    if(userMatchingUsername == null || usersHashedPassword != userMatchingUsername.password){
      throw new Exception();
    }
  } catch(err){
    return next(err);
  }
})


const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
};

//TODO: error handling
main().catch((err) => {
  console.error(err);
  process.exit(1);
});