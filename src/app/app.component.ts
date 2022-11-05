import { Component,OnInit, ViewChild } from '@angular/core';
import { FileService } from './services/file.service';
import * as fileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from './services/HttpService.service';
import { ElementRef } from '@angular/core';

declare var jQuery: any;
declare const pagepiling:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Edraj';
  isSuccess : boolean = false;
  isFailed : boolean = false;

  @ViewChild("lblSuccess", { static: false }) lblSuccess !: ElementRef;
  
  ngOnInit(){
    (function ($) {
      $(document).ready(function () {
          //$("#pp-nav")[0].css('visibility', 'hidden');
          $("#menu").css('visibility', 'hidden');
          $("#unmuteButton").hide();
          $("#musicButton").click(function(){
            $("#myVideo")[0].play();
          });

          $("#muteButton").click(function(){
            $("#muteButton").hide();
            $("#unmuteButton").show();
            $("#myVideo")[0].prop('muted', true);
            
          });

          $("#unmuteButton").click(function(){
            $("#unmuteButton").hide();
            $("#muteButton").show();
            $("#myVideo")[0].prop('muted', false);
            
          });

          $("#musicButtonBottom ").click(function(){
            console.log("clicked");
            //$("#coverButton").remove();
            // $("#pp-nav")[0].css('visibility', 'visible');
            // $("#pagepiling").css('visibility', 'visible');
            $("#menu").css('visibility', 'visible');
            $("#landingHref")[0].click()
            $("#myVideo")[0].play();
            
          });
          
          
          $('#pagepiling').pagepiling({

            //video

            menu: '#menu',
            anchors: ['YouAreInvited','Engaged', 'Sangeet', 'HaldiMehendi','Nikaah','Waleema','RSVP'],            
            sectionsColor: ['#bfda00', '#2ebe21', '#2C3E50', '#51bec4'],
            navigation: {
              'position': 'right',
              'tooltips': ['Page 0','Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5','Page 6']              
            },
            afterRender: function(){
              //playing the video
              //$('video').get(0).play();
            }
            
        });
      });
      
    })(jQuery);

    console.log(this.http.test);
  }

  
  constructor(private fileService: FileService, public http: HttpService) {}
  
  downloadContent() {
    //this.fileService.downloadFile().subscribe(response => {
		this.fileService.downloadFile().subscribe((response: any) => { //when you use stricter type checking
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
      
			fileSaver.saveAs(blob, 'edraj.');
		//}), error => console.log('Error downloading the file'),
		}), (error: any) => console.log('Error downloading the file'), //when you use stricter type checking
                 () => console.info('File downloaded successfully');
  }

  downloadPdf() {
    const pdfUrl = './assets/files/EDRAJ.pdf';
    const pdfName = 'Edraj';
    fileSaver.saveAs(pdfUrl, pdfName);
  }


  image =
  "https://images.freeimages.com/images/large-previews/7bc/bald-eagle-1-1400106.jpg";
   name1:string = "";
  age:number = 0;
  loading = false;
  buttionText = "Submit";

emailFormControl = new FormControl("", [
  Validators.required,
  Validators.email
]);

nameFormControl = new FormControl("", [
  Validators.required,
  Validators.minLength(4)
]);

enquiryFormControl = new FormControl("", [
  Validators.required,
  Validators.maxLength(100)
]);

changeImage() {
  this.http.test = "changed";
  this.image =
    "https://images.pexels.com/photos/635529/pexels-photo-635529.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
}

register() {
  this.loading = true;
  this.buttionText = "Submiting...";
  let user = {
    name: this.nameFormControl.value,
    email: this.emailFormControl.value,
    enquiry: this.enquiryFormControl.value
  }

  //http://localhost:8000/sendmail
  //https://edraj.biz/mailServer/sendmail
  this.http.sendEmail("https://edraj.biz/mailServer/sendmail", user).subscribe(
    (    data: any) => {
      let res:any = data; 
      console.log(data);
      console.log(
        `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
      );

      this.isSuccess = true;
      this.isFailed = false;
    },
    (    err: any) => {
      console.log(err);
      this.loading = false;
      this.buttionText = "Submit";
      this.isFailed = true;
      this.isSuccess = false;
    },() => {
      this.loading = false;
      this.buttionText = "Submit";
    }
  );
}
  
}
  