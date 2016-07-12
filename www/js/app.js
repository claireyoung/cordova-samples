// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var nativeURL = "";

    var downloadPDF = function (sourceURL) {

        var fileTransfer = new FileTransfer()
        var url = "cdvfile://localhost/persistent/TestDocumentDL.pdf"

        fileTransfer.download(
            encodeURI(sourceURL),
            url,
            function (entry) {
                nativeURL = entry.toURL();
                console.log("DOWNLOAD COMPLETE: ", entry.toURL());
                alert("DOWNLOAD COMPLETE!")
            },
            function (error) {
                console.log("download error source ", error);
                alert ("DOWNLOAD FAILURE!")
            },
            null, // or, pass false
            {
            }
        );
    };

    /* --------------------------------- Event Registration -------------------------------- */


    $('.download-pdf-btn0').on('click', function() {
        downloadPDF("http://www.novapdf.com/uploads/novapdf_en/media_items/pdf-example-encryption.original.pdf")

    });

    $('.download-pdf-btn1').on('click', function() {
        downloadPDF("http://www.novapdf.com/uploads/novapdf_en/media_items/pdf-example-fonts.original.pdf")

    });

    $('.download-pdf-btn2').on('click', function() {
        downloadPDF("http://www.novapdf.com/uploads/novapdf_en/media_items/active-pdf-links.original.pdf")

    });

    $('.download-pdf-btn3').on('click', function() {
        downloadPDF("http://www.novapdf.com/uploads/novapdf_en/media_items/pdf-example-bookmarks.original.pdf")

    });

    $('.view-pdf-btn').on('click', function() {

        console.log("URL FILE IS ", nativeURL)

        if (!nativeURL) {
            console.log("Please press the download button first1")
            alert("Please press the download button first!")
        }

        // define global viewer options here
        var VIEWER_OPTIONS = {
            documentView: {
                closeLabel: "Close"
            },
            navigationView: {
                closeLabel: "Close"
            },
            email: {
                enabled: false
            },
            print: {
                enabled: false
            },
            openWith: {
                enabled: true
            },
            bookmarks: {
                enabled: true
            },
            search: {
                enabled: true
            }
        };

        var MIME_TYPES = {
            pdf: 'application/pdf'
        };                    

        SitewaertsDocumentViewer.viewDocument(
            nativeURL, 
            'application/pdf', 
            VIEWER_OPTIONS, 
            function() {
                console.log("On Show")
            }, 
            function (close) {
                console.log("On close")
            }, 
            function (missing) {
                alert("The Android PDF viewer, due to licensing restrictions, require the user to go to Google Play to download a viewing app.")

                console.log("On Missing", missing)
            }, 
            function (error) {
                console.log("On Error", error)
            });            



    });

    $('.android-pdf-btn').on('click', function() {

        console.log("URL FILE IS ", nativeURL)

        if (!nativeURL) {
            console.log("Please press the download button first1")
            alert("Please press the download button first!")
        } else {

            pdfium.openPdf(nativeURL, 
                "Any_arg", 
                function(result) {
                    console.log("returned")
                    alert("returned from plugin")
            })
        }
    });

    $('.purchase1-btn').on('click', function() {
        console.log("Store stuff hi ", store);
//        alert("hello people. Purchase button clicked");
        var prod = store.get("subscription.month.1");
        if (prod.owned == false) {
            store.refresh();

            if (prod.owned == false) {
                store.order("subscription.month.1");
            }
        } else {
            alert("You already own this!");
        }        

        // console.log('showMainScreen -> openSubscriptionManager');
        // event.preventDefault();
        // nonRenewing.openSubscriptionManager();

    });

    $('.purchase2-btn').on('click', function() {
        console.log("Store stuff hi ", store);
//        alert("hello people. Purchase button clicked");
        var prod = store.get("subscription.month.6");
        if (prod.owned == false) {
            store.refresh();

            if (prod.owned == false) {
                store.order("subscription.month.6");
            }
        } else {
            alert("You already own this!");
        }        

        // console.log('showMainScreen -> openSubscriptionManager');
        // event.preventDefault();
        // nonRenewing.openSubscriptionManager();

    }); 

    $('.verify-receipt-btn').on('click', function() {
        verify_receipts.verify_receipts("SHARED-SECRET-HERE", "", function (result) {
            console.log(result);
            // the result is a dictionary containing key "receipt-data" value the receipt,
            // and key "password" value the vendor shared secret. This should be sent to
            // "https://sandbox.itunes.apple.com/verifyReceipt"
            // as a POST with HTTPBody as the JSON serialized dictionary.

            alert("Successfully generated encoded receipt")
        })
    });



    document.addEventListener('deviceready', function () {

        store.verbosity = store.INFO;


        store.register({
        id:    "subscription.month.1",
        alias: "subscription.month.1",
        type:  store.PAID_SUBSCRIPTION
        });

        store.register({
        id:    "subscription.month.6",
        alias: "subscription.month.6",
        type:  store.PAID_SUBSCRIPTION
        });

        store.ready(function() {
        console.log("\\o/ STORE READY \\o/");

        // When purchase of the full version is approved,
        // show some logs and finish the transaction.
        store.when("full version").approved(function (order) {
            console.log("You just unlocked the FULL VERSION!");
            alert("You unlocked full version");
            order.finish();
        });

        // When any product gets updated, refresh the HTML.
        store.when("product").updated(function (p) {
//            alert("Product ordered updated");
        });

    });

    // nonRenewing.initialize({
    //         products: [{
    //             id: 'com.claireyoung.subscription1',
    //             duration: 3600
    //         }, {
    //             id: 'com.claireyoung.subscription2',
    //             duration: 300
    //         }]
    //     });    

     }, false);

}());