/**
 * Created by wathmal on 11/14/15.
 */

import mongoose from 'mongoose';

//export default tweetModel;

export default function (username){
  const tweetSchema = new mongoose.Schema({
    _id: Number,
    created_at: Date,
    id: {type: Number, index: { unique: true }},
    id_str: String,
    text: String,
    source: String,
    truncated: Boolean,
    in_reply_to_status_id: Number,
    in_reply_to_status_id_str: String,
    in_reply_to_user_id: Number,
    in_reply_to_user_id_str: String,
    in_reply_to_screen_name: String,
    user: {},
    geo: {},
    coordinates: {},
    place: {},
    contributors: {},
    retweeted_status: {},
    is_quote_status: Boolean,
    retweet_count: Number,
    favorite_count: Number,
    entities: {},
    extended_entities: {},
    favorited: Boolean,
    retweeted: Boolean,
    possibly_sensitive: Boolean,
    lang: String

  },{ _id: false });

  tweetSchema.pre('save', function(next) {

    this.created_at = new Date(this.created_at);
    this._id= this.id;
    // console.log(this._id);
    next();
  })

  // username is the collection name
  // use lower case
  const tweetModel = mongoose.model(username.toLowerCase(), tweetSchema);
  // tweetModel.index({ text: 'text' });
  return tweetModel;
}
