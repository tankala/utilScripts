Create project at Firebase and keep the Sender Id, Sever Key with you. To know how to create project read this https://medium.com/@ashok.tankala/web-push-notifications-or-cloud-messaging-using-firebase-fcm-5a22ba559e58

Run below command
```
npm install
```

Replace SENDER_ID at index.html, public/firebase-messaging-sw.js with your sender id.

Then run
```
node app.js
```

Run below curl command after replacing SERVER_KEY with the server key you got in Firebase project, Replace USER_TOKEN with the user token which you got on page after allowing show notifications.
```
curl -X POST -H "Authorization: key=SERVER_KEY" -H "Content-Type: application/json"    -d '{
  "data": {
    "notification": {
        "title": "FCM Message",
        "body": "This is an FCM Message",
        "icon": "/ab-logo.png",
    }
  },
  "to": "USER_TOKEN"
}' https://fcm.googleapis.com/fcm/send
```
