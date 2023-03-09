const userRepository = require("../repositories/user.repository");
var validator = require("email-validator");
const bcrypt = require("bcrypt");


exports.createUser = async (user) => {
  
  console.log(user.username);
  if(user.username == undefined || user.email == undefined || user.password == undefined){
    return {status:401, message:'Please enter all the fields'};
  }

  if(user.username.length == 0 || user.email.length == 0 || user.password.length == 0){
    return {status:401, message:'Some fields are empty!'};
  }

  if(!checkUsernameValid(user.username)){
    return {status:401, message:'Username cannot contain space and special characters!'};
  }

  if(!checkPasswordValid(user.password)){
    return {status:401, message:'Password must contain atleast 6 characters'};
  }

  if(!checkEmailValid(user.email)){
    return {status:401, message:'Email is not valid'};
  }

  if(await usernameExists(user.username)){
    return {status:401, message: 'Username already exists!'};
  }

  if(await emailExists(user.email)){
    return {status:401, message: 'Email already exists!'};
  }

  const username = user.username.toLowerCase();
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(user.password,salt);

  try{
    const data = await userRepository.createUser(username, user.email, hashedPassword);
    return {status:200, message:'User created successfully'};
  }
  catch{
    return {status:401, message:'Please check your credentials again'};
  }
};

exports.getAllUsers = async () => {
  try{
    const data =  await userRepository.getAllUsers();
    if(data.length==0){
      return {status:404, message:'Users table is empty!'};
    }
    return {status:200, message: data};
  }
  catch{
    return {status:404, message:'Users not found'};
  }
}

exports.updateUser = async (username, userToUpdate) => {

  if(!checkPasswordValid(userToUpdate.password)){
    return {status:401, message:'Password must contain atleast 6 characters'};
  }
  
  try{
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userToUpdate.password,salt);
    const result = await userRepository.updateUser(username.toLowerCase(), hashedPassword);
    console.log(result);
    if(result.affectedRows == 0){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:'User updated'};

  }
  catch{
    return {status:404, message:'User update failed'};
  }
}

exports.deleteUser = async (username) =>{
  try{
    const result = await userRepository.deleteUser(username.toLowerCase());
    if(result.affectedRows == 0){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:'User removed'};
  }
  catch{
    return {status:404, message:'User not found'};
  }
}

exports.getOneUser = async (username) => {

  try{
    const result = await userRepository.getUserbyUsername(username.toLowerCase());
    console.log(result.length);
    if(result.length==0){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:result};
  }
  catch{
    return {status:404, message:'User not found'};
  }
}

function checkUsernameValid(username){

    const usernameValidCheck = /[^A-Za-z0-9]/;
    if(usernameValidCheck.test(username)){
      return false;
    }
    return true;
}

function checkPasswordValid(password){
    if(password.length < 6){
        return false;
    }
    return true;
}

function checkEmailValid(email){
    if(validator.validate(email)){
        return true;
    }
    else{
        return false;
    }
}

async function usernameExists(username){
  const data = await userRepository.getUserbyUsername(username);
  if(data.length == 0){
    return false;
  }
  else{
    return true;
  }
}

async function emailExists(email){
  const data = await userRepository.getUserbyEmail(email);
  if(data.length == 0){
    return false;
  }
  return true;
}