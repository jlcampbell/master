let userList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "faceittv", "RobotCaleb", "noobs2ninjas"]
let baseURL = "https://wind-bow.gomix.me/twitch-api/";
//userString="";
userList.forEach(function (user){
  let info = new Entry();
  var template = document.getElementById("streamTemplate");
  var entry = template.content.cloneNode(true);
  entry.querySelector(".link").id = user;
  entry.querySelector(".link").href= "https://www.twitch.tv/"+user;
  document.getElementById("streamers").appendChild(entry);
  let a = document.getElementById(user);
  console.log("a"+a);
  
  $.ajax({
  url: baseURL+"streams/"+user,
  type: 'GET',
  dataType: 'jsonp',
  success: function (data) {
//    info.link="https://www.twitch.tv/"+user;
    if (data["stream"]== (null)){
      info.online="offline";
      info.status='';
    }
    else {
      info.online="streaming now";
      info.status=data["stream"]["channel"]["status"];
  }
    
    document.getElementById(user).getElementsByClassName("online")[0].innerHTML = info.online;
    document.getElementById(user).getElementsByClassName("status")[0].innerHTML = info.status;
//    document.getElementById(user).getElementsByClassName("link")[0].href = info.link;
}
  });
  
  $.ajax({
  url: baseURL+"users/"+user,
  type: 'GET',
  dataType: 'jsonp',
  success: function (data) {
    info.name=data["display_name"];
    document.getElementById(user).getElementsByClassName("name")[0].innerHTML = info.name;
  }
});  
});
  
  function Entry() {
    this.name = "";
    this.online = "off";
    this.status = '';
//    this.link = "https://www.twitch.tv/";

    this.addEntryToDoc = function() {    
        document.getElementById("streamers").appendChild(entry);
    }
  }