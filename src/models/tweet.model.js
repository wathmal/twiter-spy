/**
 * Created by wathmal on 11/14/15.
 */

/*

 {
 created_at: 'Fri Nov 13 19:46:42 +0000 2015',
 id: 665254478828867600,
 id_str: '665254478828867584',
 text: '@ExcuzeMi ane me padam karana gaman neh.. 😔 dannema nathuwa 12 pahu wela!',
 source: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
 truncated: false,
 in_reply_to_status_id: 665247092152123400,
 in_reply_to_status_id_str: '665247092152123392',
 in_reply_to_user_id: 582633677,
 in_reply_to_user_id_str: '582633677',
 in_reply_to_screen_name: 'ExcuzeMi',
 user: { id: 2320465860, id_str: '2320465860' },
 geo: null,
 coordinates: null,
 place: null,
 contributors: null,
 is_quote_status: false,
 retweet_count: 0,
 favorite_count: 1,
 entities: { hashtags: [], symbols: [], user_mentions: [Object], urls: [] },
 favorited: false,
 retweeted: false,
 lang: 'tl' },
*
* */

//export default tweetModel;

export default function (mongoose, username){
    const tweetSchema = mongoose.Schema({
        created_at: String,
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

    // username is the collection name
    // use lower case
    const tweetModel = mongoose.model(username.toLowerCase(), tweetSchema);
    return tweetModel;
}