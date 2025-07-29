// models/index.js
// Import all models
const Post = require("./Post"); // Ensure consistent capitalization with file names
const Category = require("./Category");
const User = require("./User");
const Comment = require("./Comment");

// Define Associations

// Post - Category (Many-to-One)
Post.belongsTo(Category, {
  foreignKey: "category_id", // Snake_case foreign key in Post model
  as: "category", // Alias when Category included in a Post query
});

Category.hasMany(Post, {
  foreignKey: "category_id", // Snake_case foreign key in Post model
  as: "posts", // Alias when Posts included in a Category query
});

// User - Post (One-to-Many)
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // If a User is deleted, their Posts are also deleted
  as: "posts",
});

Post.belongsTo(User, {
  foreignKey: "user_id", 
  as: "User", // Explicit alias for Post.belongsTo(User).
});

// Post - Comment (One-to-Many)
Post.hasMany(Comment, {
  foreignKey: "post_id", 
  onDelete: "CASCADE", // If a Post is deleted, its Comments are also deleted
  as: "comments", 
});

Comment.belongsTo(Post, {
  foreignKey: "post_id", 
  as: "Post", 
});

// User - Comment (One-to-Many)
User.hasMany(Comment, {
  foreignKey: "user_id", 
  onDelete: "CASCADE", 
  as: "userComments", 
});

// Comment - User (Many-to-One)
Comment.belongsTo(User, {
  foreignKey: "user_id", 
  as: "CommentAuthor", // Distinct alias for the User who authored the Comment.
});

module.exports = {
  Post,
  Category,
  User,
  Comment,
};
