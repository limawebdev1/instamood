app.service('loginService', function($location, $resource) {
 return {
  getCode: function() {
   var clientID = '71589482a5274c6d843f7577cd3c5b94';
   var igPopup = window.location.replace("https://instagram.com/oauth/authorize/?client_id=" + clientID + "&redirect_uri=" + $location.absUrl().split('#')[0] + "&response_type=token", "igPopup");
   return $location.path;
 }
 }
})

app.service('imgService', function($http, $resource) {
 return {
  getImage: function(token) {
   var instaApi = $resource(
    'https://api.instagram.com/v1/users/self/?access_token='+token, {
     callback: 'JSON_CALLBACK'
    }, {
     getInstaData: { // call this in the controller
      method: 'JSONP',
      isArray: false, // this API call returns an object
      params: {} // param order here not guaranteed
     }
    });
   return instaApi;
  },
  getMedia: function(token,userID) {
   var instaApi = $resource(
    `https://api.instagram.com/v1/users/${userID}/media/recent/?access_token=${token}&count=10`, {
     callback: 'JSON_CALLBACK'
    }, {
     getInstaData: { // call this in the controller
      method: 'JSONP',
      isArray: false, // this API call returns an object
      params: {} // param order here not guaranteed
     }
    });
   return instaApi;
  }
 }
})
