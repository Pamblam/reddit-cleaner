require('dotenv').config();
const snoowrap = require('snoowrap');

const reddit = new snoowrap({
  userAgent: 'reddit-cleaner',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

const user = reddit.getUser(process.env.REDDIT_USER);

var promises = [];

user.getComments().fetchAll().then(comments=>{
	comments.forEach(comment=>{
		console.log('Comment: '+comment.link_permalink);
		if(comment.score < 0) promises.push(comment.delete());
	});
	Promise.all(promises).then(()=>{
		console.log(`All done: ${promises.length} comments deleted.`);
		process.exit();
	});
});
