/**
 * Created by wathmal on 11/14/15.
 */
import mongoose from 'mongoose';

export default function (mongoose, username){
  const tweetSchema = mongoose.Schema({
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
    user: { id: Number, id_str: String },
    geo: {},
    coordinates: {},
    place: {},
    contributors: {},
    is_quote_status: {},
    retweet_count: Number,
    favorite_count: Number,
    entities: { hashtags: [], symbols: [], user_mentions: [], urls: [] },
    favorited: Boolean,
    retweeted: Boolean,
    lang: String

  },{ _id: false });
  tweetSchema.index({ text: 'text'}, { default_language: 'none' });


  // username is the collection name
  // use lower case
  const tweetModel = mongoose.model(username.toLowerCase(), tweetSchema);
  return tweetModel;
}
