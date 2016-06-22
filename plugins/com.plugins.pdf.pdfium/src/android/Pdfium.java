package com.plugins.pdf.pdfium;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaResourceApi;
import java.net.MalformedURLException;

import org.json.JSONArray;
import org.json.JSONException;
import android.net.Uri;
import android.os.Environment;
import java.io.File;
import android.content.Context;


/**
 * This class delegates JS call to Android WeVR player wrapping activity in the aar library
 */
public class Pdfium extends CordovaPlugin {
    private static final String CDV_FILESYSTEM_PROTOCOL = "cdvfile://";
    
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        
        String cdvUrl = "";
        String localFilepath = "";
        boolean  magicMirror = false;
        
        if (action == null || action.trim().equals("")) {
            action = "pdfium";
        } else {
            action = action.toLowerCase();
        }

        String url = args.getString(0);

        if ("pdfium".equals(action)) {

            Context context=this.cordova.getActivity().getApplicationContext();
            //or Context context=cordova.getActivity().getApplicationContext();
            Bundle b = new Bundle();
            b.putString("path", url);
            Intent intent=new Intent(context,PdfActivity.class);
            intent.putExtras(b);

            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            context.startActivity(intent);

        }
        return false;
    }
    
    // expected input for wevr is something like "cdvfile://localhost/persistent/test.pdf"
    // we return the path from this uri, so the result will be "/data/data/com.my.app/files/files/test.pdf"
    
        private String getFilePath(String cdvFile) {
    
            // webView is a member of the Plugin class
            CordovaResourceApi resourceApi = webView.getResourceApi();
    
            // Obtain a file:/// URL representing this file on the device,
            // or the same URL unchanged if it cannot be mapped to a file
    	
            Uri fileURL = resourceApi.remapUri(Uri.parse(cdvFile));
    
    	return fileURL.getPath();
    
        }
}
