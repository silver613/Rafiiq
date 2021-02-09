import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
 
@Injectable()
export class MessagingService {
 
currentMessage = new BehaviorSubject(null);
tit = ""
bod = ""
test
test1
constructor(private angularFireMessaging: AngularFireMessaging) {
 
     this.angularFireMessaging.messaging.subscribe(
     (msgings) => {
   msgings.onMessage = msgings.onMessage.bind(msgings);
   msgings.onTokenRefresh=msgings.onTokenRefresh.bind(msgings);
    })
  }
 
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
    (token) => {
    console.log(token);
    localStorage.setItem('tokenfirebase',token)
    });
  }
 
  receiveMessage() {
    console.log("receiveMessage", "receiveMessage ---- >  1222222");

    this.angularFireMessaging.messages.subscribe(
    (msg) => {

    this.tit = msg["notification"]['title']
    this.bod = msg["notification"]['body']
   this.test= localStorage.setItem("title",this.tit)
   this.test1= localStorage.setItem("body",this.bod)

    console.log("userid",this.tit)
    console.log("testtttt --->   ",this.bod)
    this.currentMessage.next(msg);
    return msg
       })
    }
}
