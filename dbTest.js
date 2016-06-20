var db = require("./models");

db.post.findById(1).then(function(author) {
  db.comment.create( {
    firstName: "Paul",
    lastName: "Allen",
    content: "This is a post! Nice job.",
    postId: 1
  }). then(function(comment) {
    console.log(comment.get());
  });
});
