/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
// 'use strict';
import FatchDataApi from "./FatchDataApi";
import MyNotification from "./MyNotification";

export function subscribeUser(accessToken,callback) {

    const handleResponse = (response) => {
        if ("push_subscription" in response){
            MyNotification('light', "רישום לקבלת נוטיפקציה", `${response.update_user.username} נרשם בהצלחה`)
            callback(response.push_subscription)        
        }    
    }

    navigator.serviceWorker.ready.then(swRegistration =>
        Notification.requestPermission(status => {
            if (status === "granted")
                swRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
                })
                    .then((subscription) => {
                        console.log('User subscribed, sending subscription to server');
                        FatchDataApi('users/push_register', 'POST', accessToken, handleResponse, { payload: { "push_subscription": JSON.stringify(subscription) }, errorMsgTitle: "שגיאה ברישום לנוטיפקציה" });
                    })

                    .catch(function (err) {
                        console.log('Failed to subscribe the user: ', err);
                        MyNotification("red", "שגיאה ברישום לנוטיפיקצה", err)
                        console.log(err.stack);
                    })
            else
                MyNotification("darkblue", "רישום נוטיפקציה נכשל", "לא ניתנה הרשאה להצגת נוטיפקציות,\nאפס הגדרות דפדפן ונסה שוב")
        }
        ))
}

export function unSubscribeUser(accessToken,callback) {
    const handleResponse = (response, subscription) => {
        if ("push_subscription_req" in response)
            MyNotification('light', "הסרת רישום לקבלת נוטיפקציה", `${response.user.username} הוסר בהצלחה`)
            callback(response)
            subscription.unsubscribe()        
    }
    navigator.serviceWorker.ready.then(swRegistration =>
        swRegistration.pushManager.getSubscription().then(subscription => {
            FatchDataApi('users/push_unregister', 'DELETE', accessToken, (response) => { handleResponse(response, subscription) }, { payload: { "push_subscription": JSON.stringify(subscription) }, errorMsgTitle: "שגיאה בהסרת רישום לנוטיפקציה" });
        }
        ))
}

export default function registerServiceWorker(accessToken) {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`
    let swRegistration = null;

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported');
        navigator.serviceWorker.register(swUrl)
            .then(function (swReg) {
                navigator.serviceWorker.ready.then((Registration) => {
                    swRegistration = swReg;
                })
            })
            .catch(function (error) {
                console.error('Service Worker Error', error);
            });
    }
    else {
        console.warn('Push messaging is not supported');
    }
    return swRegistration;
}