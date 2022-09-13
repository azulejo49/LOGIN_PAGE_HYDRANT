/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import addNotification from 'react-push-notification';


export default function MyNotification(color, title, message, native = false) {

  if (native) {

    Notification.requestPermission();
    navigator.serviceWorker.ready.then(function (registration) {
      registration.active.postMessage({
        type: 'push-notofications',
        title: title,
        body: message
      })
    });
  }
  else
    addNotification({
      title: title,
      message: message,
      theme: color,
      duration: 4000,
      native: false
    }
    )

}
