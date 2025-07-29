// seeds/seed.js
// Import required packages
const sequelize = require("../config/connection");

// import models
const { User, Post, Comment, Category } = require("../models"); 

// import seed data
const userData = require("./users.json");
const postData = require("./posts.json");
const categoryData = require("./categories.json"); 

// Seed database
const seedDatabase = async () => {
  await sequelize.sync({ force: true }); 
  console.log('\n----- DATABASE SYNCED (FORCED) -----\n');

  // 1. Seed Users FIRST
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS SEEDED -----\n');

  // 2. Seed Categories
   await Category.bulkCreate(categoryData);
  console.log('\n----- CATEGORIES SEEDED -----\n');

  // 3. Seed Posts
  await Post.bulkCreate(postData);
  console.log('\n----- POSTS SEEDED -----\n');
  process.exit(0); // Exit the process when seeding is complete
};
// Call seedDatabase function to start seeding
seedDatabase();
