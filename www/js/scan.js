    var  QRScanner = window.QRScanner;            

    function usecamera() {
        
// For the best user experience, make sure the user is ready to give your app
// camera access before you issue the prompt.
        console.log("start")
        if(QRScanner===undefined){
            alert("scan plugin load error");
            return;
        }
        console.log("user back camera")
        QRScanner.useBackCamera(function(err, status){
          err && console.error(err);
          console.log("useBackCamera",status);
        });
    }

    function prepare() {
        console.log("prepare start")
        if(QRScanner===undefined){
            alert("scan plugin load error");
            return;
        }        
        console.log("prepare")
        QRScanner.prepare(onDone); // prompt for access

        function onDone(err, status){
          if (err) {
           // here we can handle errors and clean up any loose ends.
           console.error(err);
          }
          console.log(status); 
          if (status.authorized) {
            console.log(status); 
            // W00t, you have camera access and the scanner is initialized.
          } else if (status.denied) {
            console.log("error"); 
           // The video preview will remain black, and scanning is disabled. We can
           // try to ask the user to change their mind, but we'll have to send them
           // to their device settings with `QRScanner.openSettings()`.
          } else {
            console.log("error"); 
            // we didn't get permission, but we didn't get denied. (On Android, a denial
            // isn't permanent unless the user checks the "Don't ask again" box.)
          }
        }
        console.log("prepare finish")        
    }

    function scan() {
        
       // Make the webview transparent so the video preview is visible behind it.
        // (Optional on iOS.)
        console.log("scan start")
        if(QRScanner===undefined){
            alert("scan plugin load error");
            return;
        }        
        console.log("scan ok")
        // Be sure to make any opaque HTML elements transparent here to avoid 
        // covering the video. 

        // Start a scan. Scanning will continue until something is detected or
        // `QRScanner.cancelScan()` is called.
        QRScanner.scan(displayContents);

        function displayContents(err, text){
          if(err){
            console.log(err)
            // an error occurred, or the scan was canceled (error code `6`)
          } else {
            // The scan completed, display the contents of the QR code:
            alert(text);
          }
        }
        console.log("show");
        QRScanner.show(function(status){
          console.log(status);
        });        

    }