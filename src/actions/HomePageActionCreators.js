/**
 * Created by wathmal on 12/6/15.
 */
import AppDispatcher from '../core/Dispatcher';
import AppConstants from '../constants/ActionTypes';
import Falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';

const model = new Falcor.Model({source: new FalcorDataSource('/model.json')});
const MAX_TWEETS_PER_PAGE = 10;
class HomePageActionCreators {
  static receiveStatistics(page) {

    const from = 0 + page*MAX_TWEETS_PER_PAGE;
    const to = 9 + page*MAX_TWEETS_PER_PAGE;
    model
      .get(['tweets', {from: from, to: to}, ['tweet']])
      .then(response => {
        console.log(response);
        AppDispatcher.handleAction({
          actionType: AppConstants.RECEIVE_TWEETS,
          data: response.json.tweets,
        });
      });
  }

}

export default HomePageActionCreators;
