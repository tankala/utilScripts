# logAnalyser
This script bascially tails your log files which you mentioned in the script.
If it find any log entry in nginx log which didn't get http code in response 200 then it will shoot a mail
If it find any error or fatal log entry in catalina log then also it will shoot a mail

To run this script need following modules
</br>always-tail(npm install always-tail)
</br>nodemailer(npm install nodemailer)

Please replace your mail id at fromEmailId and replace password at pass with your password at transporter section

At filesToTrackObjArr please give your logs paths, and put your email ids at 'mail id' parameter section.

Thats it. Good to go.

Please give your valuable suggestions at ashok_tankala@yahoo.com
