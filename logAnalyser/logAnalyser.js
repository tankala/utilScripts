//Required modules
var Tail = require('always-tail');
var nodemailer = require('nodemailer');

var fromEmailId = 'your mail id';
/**
 * transporter
 */
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: fromEmailId,
        pass: 'password'
    }
});

/**
 * This object contains file, what type of file need to track, email id details
 * 
 * @param {string} fileName Absolute path preferable. Please check file have proper read permissions or not
 * @param {boolean} isItNginxLog true if it is nginx log or else false
 * @param {string} emailIds email ids with comma seperation
 */
var FileTrack = function (fileName, isItNginxLog, emailIds) {
    this.fileName = fileName;
    this.isItNginxLog = isItNginxLog;
    this.emailIds = emailIds;
}

//This array contains all files to track details
var filesToTrackObjArr = [new FileTrack("/home/tankala/logs/post.log", true, "mail id"),
new FileTrack("/home/tankala/logs/catalina.out", false, "mail id")];

/*One by one file processed in loop and tailing will be done based on file type(nginx or other)
  For catalina log seperator used \n2 because as per log4j configuration line starts with date
  in yyyy-MM-dd format right now we are in 2017 year. For next 983 years its going to start with
  2 thats why we used like that
*/
filesToTrackObjArr.forEach(function (fileToTrack) {
    var tail;
    if (fileToTrack.isItNginxLog) {
        tail = new Tail(fileToTrack.fileName, '\n');
        tail.on('line', function (data) {
            processNginxLogData(data, fileToTrack.emailIds);
        });
    } else {
        tail = new Tail(fileToTrack.fileName, '\n2');
        tail.on('line', function (data) {
            processCatalinaLogData(data, fileToTrack.emailIds);
        });
    }
    tail.on('error', function (data) {
        sendMail(fileToTrack.emailIds, 'Something went wrong at the time of tailing file ' + fileToTrack.fileName, data);
    });
    tail.watch();
});

/**
 * This function take the nginx log data and process further if any error occurs
 * it will send mail to the mail ids
 * 
 * @param {string} data 
 * @param {string} emailIds 
 */
var processNginxLogData = function (data, emailIds) {
    try {
        var responseCode = getResposeCodeFromNginxLog(data);
        trackAbnormalityInNginxLogAndSendMail(data, responseCode, emailIds);
    } catch (error) {
        sendMail(emailIds, "something wrong went at the time of processing this data from nginx Log", "Data: " + data + "\nError: " + error);
    }
}

/**
 * This function take the catalina.out log data and process if it finds
 * ERROR or FATAL logger levels then send mail to mentioned email ids
 * In tail seperator 2 used with \n thats why it is added to data
 * 
 * @param {string} data 
 * @param {string} emailIds 
 */
var processCatalinaLogData = function (data, emailIds) {
    var dataPrefix = '2';
    if (data.includes(" ERROR ") || data.includes(" FATAL ")) {
        sendMail(emailIds, "Error occured in Application", dataPrefix + data);
    }
}

/**
 * It finds out response code using below logic.
 * Find out index of first double quote and space and then next space index
 * by using these 2 indexes retrieve response code from data
 * 
 * @param {string} data 
 */
var getResposeCodeFromNginxLog = function (data) {
    var responseCodeStartIndex = data.indexOf('" ') + 2;
    var responseCodeEndIndex = data.indexOf(" ", responseCodeStartIndex);
    var responseCode = data.substring(responseCodeStartIndex, responseCodeEndIndex);
    return responseCode;
};

/**
 * If response code is not equal to 200 then data will be url decoded
 * Then repsonse code is proper or not check will be there if it is proper then
 * mail will be sent to given emailIds what the error
 * or else mail will be sent to same emailIds mentioning something wrong with script
 * 
 * @param {string} data 
 * @param {number} responseCode 
 * @param {string} emailIds
 */
var trackAbnormalityInNginxLogAndSendMail = function (data, responseCode, emailIds) {
    if (responseCode != 200) {
        data = data.replace(/\\x/g, '%');
        data = decodeURI(data);
        if (responseCode) {
            sendMail(emailIds, "API rejected with " + responseCode + " code", data);
        } else {
            sendMail(emailIds, "Blank line or Some thing wrong went at the time of finding response code in Nginx LOG", data);
        }
    }
};

var sendMail = function (emailIds, subject, body) {
    var mailOptions = {
        from: fromEmailId,
        to: emailIds,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
