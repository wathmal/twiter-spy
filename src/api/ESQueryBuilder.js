/**
 * Created by wathmal on 1/4/16.
 */
import TweetStore from './../stores/TweetStore';
let moment = require('moment');


const MAX_TWEETS_PER_PAGE = 10;
class ESQueryBuilder {


  static getRangeSearchQuery() {
    const searchText = TweetStore.getSearchText();
    const page = TweetStore.getPageNo();
    const fromDate = TweetStore.getFromDate();
    const toDate = TweetStore.getToDate();

    const from = 0 + page * MAX_TWEETS_PER_PAGE;

    /*
     *
     index: 'twitter',
     type: 'wathmals',
     from: from,
     size: MAX_TWEETS_PER_PAGE,
     body: {
     query: {
     filtered: {query: {match: {'text' : query}}}
     },
     "sort": {"id": {"order": "desc"}}
     }
     * */
    let esquery = {};
    esquery["index"] = "estwitter";
    esquery["type"] = "billgates";
    esquery["from"] = from;
    esquery["size"] = MAX_TWEETS_PER_PAGE;

    if (searchText !== '') {
      esquery["body"] = {"query": {"filtered": {"query": {"match": {"text": searchText}}}}};
    }
    else {
      esquery["body"] = {"query": {"filtered": {"query": {"match_all": {}}}}};
    }
    // esquery["body"]["query"]["filtered"]["query"]["text"] = searchText;
    // "filter": {"range": {"created_at": {"gt":"2013-02-12", "lt": "2013-02-15"}}}
    if (fromDate !== null && toDate === null) {

      let nextDay = moment(fromDate).add(1, 'days');
      esquery["body"]["query"]["filtered"]["filter"] = {
        "range": {
          "created_at": {
            "gt": moment(fromDate).format("YYYY-MM-DD"),
            "lt": nextDay.format("YYYY-MM-DD")
          }
        }
      }
    }
    else if (fromDate !== null && toDate !== null) {
      esquery["body"]["query"]["filtered"]["filter"] = {
        "range": {
          "created_at": {
            "gt": moment(fromDate).format("YYYY-MM-DD"),
            "lt": moment(toDate).format("YYYY-MM-DD")
          }
        }
      }

    }

    esquery["body"]["sort"] = {"created_at": {"order": "desc"}};
    esquery["body"]["aggs"] = {
      "status_count": {
          "filter": {
            "bool": {
              "must":[
                {"missing": {"field": "in_reply_to_status_id"}},
                {"missing": {"field": "retweeted_status"}}
              ]
            }
          }
      }
    ,
      "reply_count": {
      "filter": {
        "bool": {
          "must":[
            {"exists": {"field": "in_reply_to_status_id"}},
            {"missing": {"field": "retweeted_status"}}
          ]
        }
      }
    },
      "retweet_count": {
        "filter": {
          "bool": {
            "must":[
              {"missing": {"field": "in_reply_to_status_id"}},
              {"exists": {"field": "retweeted_status"}}
            ]
          }
        }
      }
  };
        if (searchText !== '') {
          esquery["body"]["highlight"] = {"fields": {"text": {}}};
        }

        console.log(esquery);
        return esquery;
      }


    }

  export default ESQueryBuilder;
