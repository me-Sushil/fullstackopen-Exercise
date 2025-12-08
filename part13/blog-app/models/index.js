const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readingList");
const Session = require("./session");

// 1. One-to-Many (Author's blogs)
User.hasMany(Blog, { as: "authored_blogs" });
Blog.belongsTo(User);

// 2. Many-to-Many (Reading list)

User.belongsToMany(Blog, {
  through: ReadingList,
  as: "reading_lists",
  foreignKey: "user_id",
});

Blog.belongsToMany(User, {
  through: ReadingList,
  as: "readBy",
  foreignKey: "blog_id",
});

User.hasMany(Session);
Session.belongsTo(User);

module.exports = { User, Blog, Session };
