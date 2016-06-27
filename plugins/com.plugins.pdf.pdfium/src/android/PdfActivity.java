package com.plugins.pdf.pdfium;

/**
 * Created by claire young on 2/24/16.
 */
        import android.content.res.Resources;
        import android.net.Uri;
        import android.os.Bundle;
//        import android.support.design.widget.TabLayout;
//        import android.support.v7.app.AppCompatActivity;

        import android.app.Activity;

        import android.view.View;
        import android.widget.Toast;

        import com.github.barteksc.pdfviewer.PDFView;
        import com.github.barteksc.pdfviewer.ScrollBar;

        import java.net.MalformedURLException;
        import java.net.URL;
        import java.util.ArrayList;
        import java.util.HashMap;
        import java.util.Iterator;


public class PdfActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String package_name = getApplication().getPackageName();
        Resources resources = getApplication().getResources();
        setContentView(resources.getIdentifier("activity_main", "layout", package_name));

        PDFView pdfView = (PDFView) findViewById(resources.getIdentifier("pdfView", "id", package_name));
        ScrollBar scrollBar = (ScrollBar) findViewById(resources.getIdentifier("scrollBar", "id", package_name));
        pdfView.setScrollBar(scrollBar);

        Bundle b = getIntent().getExtras();
        String path = b.getString("path");

        Uri uri = Uri.parse(path);

        pdfView.fromUri(uri)
                .enableSwipe(true)
                .enableDoubletap(true)
                .swipeVertical(false)
                .defaultPage(1)
                .showMinimap(false)
                .load();

    }
}