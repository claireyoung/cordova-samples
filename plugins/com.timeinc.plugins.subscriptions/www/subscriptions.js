var exec = require('cordova/exec');


module.exports = {
  verify_receipts: function(arg0, arg1, successCallback) {
    exec(successCallback,
                 null, // No failure callback
                 "CordovaSubscriptions",
                 "verifyReceipt",
                 [arg0, arg1]);
  }
};