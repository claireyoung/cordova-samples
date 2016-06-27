var exec = require('cordova/exec');


module.exports = {
  openPdf: function(arg1, arg2, successCallback) {
    exec(successCallback,
                 null, // No failure callback
                 "Pdfium",
                 "pdfium",
                 [arg1, arg2]);
  }

  // file_exists: function(message, successCallback) {
  //   exec(successCallback,
  //                null, // No failure callback
  //                "WeVR",
  //                "file_exists",
  //                [message]);
  // }

  // delete_file: function(message, successCallback) {
  //   exec(successCallback,
  //                null, // No failure callback
  //                "WeVR",
  //                "delete_file",
  //                [message]);
  // }

};