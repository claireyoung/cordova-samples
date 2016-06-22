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

            pdfium.pdfium(nativeURL, 
                "Any_arg", 
                function(result) {
                    console.log("returned")
                    alert("returned from plugin")
            })
        }
    });



    document.addEventListener('deviceready', function () {

    }, false);

}());