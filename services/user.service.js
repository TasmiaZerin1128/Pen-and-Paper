const userRepository = require("../repositories/user.repository");
const userUtils = require("../utils/userValidation");
const hashPassword = require("../utils/hashPassword");
const crypto = require("crypto");

'use strict';

// async function createUser(user){

//   const userValid = userUtils.userValidator(user.username, user.email, user.password);
//   if(!userValid.valid){
//     return {status:400, message: userValid.message};
//   }

//   try{
//     const id = crypto.randomUUID();
//     const hashedPassword = await hashPassword(user.password);

//     const data = await userRepository.createUser(id, user.fullName, user.username.toLowerCase(), user.email, hashedPassword);
//     return {status:201, message:'User created successfully'};
//   }
//   catch{
//     return {status:400, message:'Please check your credentials again'};
//   }
// };

async function getAllUsers() {
  try{
    const data =  await userRepository.getAllUsers();
    if(data.length==0){
      return {status:200, message:'Users table is empty!'};
    }
    return {status:200, message: data};
  }
  catch{
    return {status:200, message:'Users table is empty!'};
  }
}

async function updateUser(username, updatedUser) {

  if(!userUtils.checkPasswordValid(updatedUser.password)){
    return {status:400, message:'Password must contain atleast 6 characters'};
  }
  
  try{
    const hashedPassword = await hashPassword(updatedUser.password);
    const result = await userRepository.updateUser(username.toLowerCase(), hashedPassword);
    if(result == 0){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:'User updated'};
  }
  catch{
    return {status:400, message:'User update failed'};
  }
}

async function deleteUser (username) {
  try{
    const result = await userRepository.deleteUser(username.toLowerCase());
    if(!result){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:'User removed'};
  }
  catch{
    return {status:404, message:'User not found'};
  }
}

async function getUserbyUsername(username){

  try{
    const result = await userRepository.getUserbyUsername(username.toLowerCase());
    if(!result){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:result};
  }
  catch{
    return {status:404, message:'User not found'};
  }
}

async function getUserbyEmail(email){
  try{
    const duplicateEmail = await userRepository.getUserbyEmail(email);
    if(!duplicateEmail){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:duplicateEmail};
  }
  catch{
    return {status:404, message:'User not found'};
  }
}

module.exports = { getAllUsers, getUserbyUsername, getUserbyEmail, updateUser, deleteUser };