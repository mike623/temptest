var q = require('q');
var _ = require('lodash');
var googleAuth = require('google-oauth-jwt');


function getAccessTokenWithService(emailToUse) {
  // emailToUse = emailToUse || config.googleCalendar.serviceAccountEmail;
  var deferred = q.defer();
  var accessToken;
  var opts = {
    // use the email address of the service account, as seen in the API console
    email: "233768312999-0b1javcpv0sa6hni90pnajb4p4lg00vl@developer.gserviceaccount.com",
    // use the PEM file we generated from the downloaded key
    keyFile: "./lynk-altitude.pem",
    // specify the scopes you wish to access
    scopes: ['https://www.googleapis.com/auth/calendar']
  };
  // console.log('config.env', config.env);
  // if ((config.env === 'production' || config.env === 'staging') && emailToUse) {
  //   _.extend(opts, {
  //     // which email to impersonate
  //     delegationEmail: emailToUse
  //   });
  // }
   _.extend(opts, {
      // which email to impersonate
      delegationEmail: emailToUse
    });

  console.log('getAccessTokenWithService OPTS', opts);
  googleAuth.authenticate(opts, function (err, token) {
    if (err) {
      deferred.reject(err);
    } else {
      console.log('accessToken from service account', token);

      accessToken = token;
      deferred.resolve(accessToken);
    }
  });

  return deferred.promise;
}

getAccessTokenWithService("eric@eric.com").catch((err,rs)=>console.log(err,rs));