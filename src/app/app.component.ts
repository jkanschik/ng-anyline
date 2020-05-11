import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  presetName = 'meter';

  anylicense =
    'eyAiZGVidWdSZXBvcnRpbmciOiAib24iLCAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogdHJ1ZSwgImpzSWRlbnRpZmllciI6IFsgIjEyNy4wLjAuMSIgXSwgImxpY2Vuc2VLZXlWZXJzaW9uIjogMiwgIm1ham9yVmVyc2lvbiI6ICIyMCIsICJtYXhEYXlzTm90UmVwb3J0ZWQiOiAwLCAicGluZ1JlcG9ydGluZyI6IHRydWUsICJwbGF0Zm9ybSI6IFsgIkpTIiBdLCAic2NvcGUiOiBbICJBTEwiIF0sICJzaG93UG9wVXBBZnRlckV4cGlyeSI6IGZhbHNlLCAic2hvd1dhdGVybWFyayI6IGZhbHNlLCAidG9sZXJhbmNlRGF5cyI6IDMwLCAidmFsaWQiOiAiMjAyMC0wNi0wMSIgfQp0SzhNRi9lSjQ0aHVBOWtJYzVNZGFDdVorY2NGMHFHZ3M2cS9OTjNZdkdyRkxSbWhTc3ZhVStVNlhDbTYyQjhVCkJjRFU0OVhlZU55bjl2aHFJZllLSE1KaXFGOHRVRXpYdk1RUDBSUk80aUtMdWJqMnIvWTU2Ukl4b25xY0ZGZmcKQ0pobmV1VzRFZkwrby9EUHE3L09HQ1pHZC92RG9pYkpUeUFPMVFnbFY2Q0Y5R3VtS0k0d2VXUTlMNmovZGx1Tgp4STlTdVo2TzdRNVAwTXRSSGNSa0RPakQ0amdMR29RQlkwNVR5Q3Q5ODFZSFJobnJDa1hVaVJHYk5aWGZ3d29pCkRBWDlOOXJvaEMxZWZZYTErTVVUeDRMVGN3eGFiQUlVWlppR0ZudjZlVnBodFZCR041TTFlV1ExQjNLWVJ3VEwKRHJtV052d1FJRHFNS2M4MzI3bnVZQT09Cg==';

  viewConfig = {
    // captureResolution: '1080p',
    outerColor: '000000',
    outerAlpha: 0.5,
    cutouts: [
      {
        cutoutConfig: {
          // style: 'rect',
          maxWidthPercent: '80%',
          alignment: 'top_half',
          ratioFromSize: {
            width: 300,
            height: 250,
          },
          width: 720,
          strokeWidth: 2,
          cornerRadius: 4,
          strokeColor: 'FFFFFFFF',
          feedbackStrokeColor: '0099FF',
        },
        // flash: {
        //   mode: 'manual',
        //   alignment: 'top_left',
        // },
        // cancelOnResult: false,
        // "delayStartScanTime": 2000,
        scanFeedback: {
          style: 'contour_point',
          strokeColor: '0099FF',
          fillColor: '300099FF',
          strokeWidth: 2,
          cornerRadius: 4,
          animationDuration: 150,
          animation: 'NONE',
          // beepOnResult: true,
          // vibrateOnResult: true,
          // blinkAnimationOnResult: true,
        },
      },
    ],
  };

  ngOnInit() {
    this.initAnyline();
  }

  initAnyline() {
    const { init, errorCodes } = (window as any).anylinejs;

    const root = document.getElementById('root');

    const Anyline = init({
      preset: this.presetName,
      viewConfig: this.viewConfig,
      license: this.anylicense,
      element: root,
      anylinePath: '/assets/anylinejs'
    });

    Anyline.onResult = result => {
      console.log('Result: ', result);
    };

    Anyline.onReport = msg => {
      console.log('Report: ', msg);
    };

    Anyline.onDebug = msg => {
      console.log(JSON.stringify(msg));
    };

    Anyline.onError = ({ code, message }) => {
      if (code === errorCodes.WEBCAM_ERROR) {
        console.error('webcam error: ', message);
      } else {
        console.error('error', code, message);
      }
    };

    Anyline.onLoad = () => {
      console.log('ANYLINE LOADED on main thread');
    };

    Anyline.startScanning();

    (window as any).Anyline = Anyline;
  }
}
