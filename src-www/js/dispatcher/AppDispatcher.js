const AppConstants = require('../constants/AppConstants');

const Dispatcher = require('flux').Dispatcher;

/**
 * flux-chat 內最新的 dispatcher
 */
let AppDispatcher = new Dispatcher();

Object.assign(AppDispatcher, {

    handleServerAction: function(action) {
        let payload = {
            source: AppConstants.SOURCE_SERVER_ACTION,
            action: action
        };

        this.dispatch(payload);
    },

    handleViewAction: function(action) {
        let payload = {
            source: AppConstants.SOURCE_VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    },

    handleRouterAction: function(path) {
        let payload = {
            source: AppConstants.SOURCE_ROUTER_ACTION,
            action: path
        };
        this.dispatch(payload);
    }
});

module.exports = AppDispatcher;
