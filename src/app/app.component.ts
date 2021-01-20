import { ZoomMtg } from '@zoomus/websdk';
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomApiService } from './services/zoom/zoom-api.service';
import { WelkinApiService } from './services/welkin/welkin-api.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  itle = 'welkin-zoom-plugin';
  meetingCreated: boolean = false;
  retryClicked = false;
  meetConfig: any = {
    apiKey: '',
    meetingNumber: 0,
    userName: '',
    passWord: '',
    leaveUrl: '',
    role: 0,
  };
  onGoingCSMeetingsData: object;
  signature: string = '';
  zoomUserData: any;
  tokenData: any;
  readyToCallClicked = false;
  patientFirstName: string = '';
  workersFirstName: string = '';
  parent: HTMLElement;
  callActionButtonsContainer: HTMLElement;
  startVideoCallButton: HTMLElement;
  testVideoAudioButton: HTMLElement;
  dispositionUrl = environment.angularUrl + '#/disposition';
  video_not_centered = true;
  constructor(
    private zoomService: ZoomApiService,
    private welkinService: WelkinApiService,
    private renderer: Renderer2,
    public httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.meetConfig;
  }

  ngAfterViewInit() {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    // ZoomMtg.setZoomJSLib('assets/lib', '/av');
    this.parent = document.getElementById('zmmtg-root');
    let div_wrapper = this.renderer.createElement('div');
    this.renderer.setAttribute(div_wrapper, 'id', 'content-wrapper');
    let div_image = this.renderer.createElement('div');
    this.renderer.addClass(div_image, 'call-image');
    this.renderer.appendChild(div_wrapper, div_image);
    this.renderer.appendChild(this.parent, div_wrapper);

    /**
     * This token data is used to validate the user in our system and then only create a meeting
     * Create meeting code is implemented in backend
     */
    this.tokenData = {
      aud: 'http://localhost:5000/api/redirect',
      welkin_patient_id: 'xxxx-yyyy-ccccc-bbbbb',
      welkin_provider_id: 'aaaa-bbbbb-ccccc-dddddd',
      welkin_worker_id: 'aaaa-bbbbb-ccccc-dddddd',
    };
    this.setBaseUrl();
    this.appendDomContent();
  }

  createMeeting() {
    this.zoomService
      .createMeeting(this.tokenData)
      .toPromise()
      .then(
        (meetingData) => {
          this.meetingCreated = true;
          this.meetConfig['apiKey'] = this.zoomUserData['zoom_api_key'];
          this.meetConfig['meetingNumber'] = meetingData[
            'createMeetingResponse'
          ]['id'].toString();

          this.meetConfig['userName'] = meetingData['host'];
          this.meetConfig['passWord'] =
            meetingData['createMeetingResponse']['password'];
          this.meetConfig['leaveUrl'] = this.dispositionUrl;
          this.meetConfig['role'] = 1;
          this.joinMeeting();
        },
        (err) => {
          console.log('HTTP Error while creating Meeting', err);
          console.log(
            'The video call could not be started because we did not find an associated Zoom account. Please check with your program administrator to ensure your account is set up correctly'
          );
          this.readyToCallClicked = false;
        }
      );
  }

  joinMeeting() {
    this.zoomService
      .getSignatureForZoom(this.meetConfig)
      .toPromise()
      .then(
        (signature) => {
          this.signature = signature;
          ZoomMtg.init({
            leaveUrl: this.meetConfig.leaveUrl,
            isSupportAV: true,
            isShowJoiningErrorDialog: true,
            success: (res) => {
              ZoomMtg.i18n.load('en-US');
              ZoomMtg.i18n.reload('en-US');
              ZoomMtg.join({
                meetingNumber: this.meetConfig.meetingNumber.toString(),
                userName: this.meetConfig.userName,
                signature: this.signature,
                apiKey: this.meetConfig.apiKey,
                userEmail: this.meetConfig.userName,
                passWord: this.meetConfig.passWord || '',
                success: (res) => {
                  console.log(res);
                  document.getElementById('welkin-patient-name').remove();
                },
                error: (error) => {
                  console.log(error);
                },
              });
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  createZoomMeeting() {
    //----- Set Meeting configuratiion
    this.zoomUserData = {
      welkin_oauth_client_id: '164750d1-05d9-4cd1-ab45-5b680e6697f9',
      welkin_provider_id: 'e59306d9-a254-4508-8e03-6909cebeac92',
      zoom_api_key: 'yXfzUi9QSvCm4R2tGcP_dA',
      meeting_config: {
        agenda: 'Meeting Agenda',
        duration: '15',
        timezone: 'Asia/Kolkata',
        topic: 'Meeting Topic',
        type: '2',
        settings: {
          approval_type: '2',
          audio: 'both',
          auto_recording: 'local',
          cn_meeting: 'false',
          host_video: 'true',
          in_meeting: 'true',
          join_before_host: 'true',
          mute_upon_entry: 'false',
          participant_video: 'true',
          registration_type: '1',
          use_pmi: 'false',
          watermark: 'true',
        },
      },
    };
    //---- create the  meeting and join
    this.createMeeting();
  }

  setBaseUrl() {
    const aud = new URL(this.tokenData.aud);
    this.welkinService.setBaseUrl(aud.origin);
    this.zoomService.setBaseUrl(aud.origin);
  }

  appendDomContent() {
    let subParent = document.getElementById('content-wrapper');
    // create title div , add text and append to wrapper element
    let div_title = this.renderer.createElement('div');

    this.renderer.setAttribute(div_title, 'id', 'welkin-patient-name');
    this.renderer.appendChild(subParent, div_title);

    //  create button div , add text and append to wrapper element
    this.callActionButtonsContainer = this.renderer.createElement('div');
    this.startVideoCallButton = this.renderer.createElement('button');
    this.renderer.setAttribute(
      this.callActionButtonsContainer,
      'id',
      'call-action-buttons-container'
    );
    this.renderer.setAttribute(this.startVideoCallButton, 'id', 'action-video');
    this.renderer.addClass(this.startVideoCallButton, 'button');

    this.renderer.listen(this.startVideoCallButton, 'click', () => {
      this.createZoomMeeting();
    });

    const buttonText = this.renderer.createText('Start Video Call');
    const testButtonText = this.renderer.createText('Test');
    this.renderer.appendChild(this.startVideoCallButton, buttonText);

    this.renderer.appendChild(
      this.callActionButtonsContainer,
      this.startVideoCallButton
    );

    this.renderer.appendChild(subParent, this.callActionButtonsContainer);
    this.renderer.appendChild(this.parent, subParent);
  }
}
