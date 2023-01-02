const Friend = require('../models/Friend');
const validator = require('validator')

module.exports = {
  getFriends: async (req, res) => {
    // console.log(req.user)
    try {
      const friends = await Friend.find({ userId: req.user.id });
      console.log(friends, { userId: req.user.id })
      const friendsLeft = await Friend.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      // console.log(friends)
      res.render('friends.ejs', {
        friends: friends,
        // left: friendsLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getFriendPage: async (req, res) => {
    const friendId = req.params.friendId;
    try {
      const friend = await Friend.find({ _id: friendId });
      res.render('friend.ejs', { friend: friend[0] });
    } catch (err) {
      console.log(err);
    }
  },
  createFriend: async (req, res) => {
    try {
      await Friend.create({
        name: req.body.friendName,
        phone: req.body.phoneNumber,
        completed: false,
        userId: req.user.id,
      });
      console.log('Friend has been added');
      res.redirect('/friends');
    } catch (err) {
      console.log(err);
    }
  },
  editFriend: async (req, res) => {
    try {
      await Friend.findOneAndUpdate(
        { _id: req.body.friendIdFromJSFile },
        {
          name: req.body.friendName,
          phone: req.body.phoneNumber,
        }
      );
      console.log('Updated');
      res.json('updated');
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Friend.findOneAndUpdate(
        { _id: req.body.friendIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log('Marked Complete');
      res.json('Marked Complete');
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Friend.findOneAndUpdate(
        { _id: req.body.friendIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log('Marked Incomplete');
      res.json('Marked Incomplete');
    } catch (err) {
      console.log(err);
    }
  },
  deleteFriend: async (req, res) => {
    console.log('Deleting friend');
    console.log(req.body);
    console.log(req.body.friendIdFromJSFile);
    try {
      await Friend.findOneAndDelete({ _id: req.body.friendIdFromJSFile });
      console.log('Deleted Friend');
      res.json('Deleted It');
    } catch (err) {
      console.log(err);
    }
  },
};
