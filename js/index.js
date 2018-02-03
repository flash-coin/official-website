//     AOS.init({
//         easing: 'ease-out-back',
//         duration: 1000
//     });
//
// if($('.twitter-timeline').length) {
//   window.twttr = (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0],
//     t = window.twttr || {};
//     if (d.getElementById(id)) return t;
//     js = d.createElement(s);
//     js.id = id;
//     js.src = "https://platform.twitter.com/widgets.js";
//     fjs.parentNode.insertBefore(js, fjs);
//     t._e = [];
//     t.ready = function(f) {
//     t._e.push(f);
//     };
//     return t;
//   }(document, "script", "twitter-wjs"));
// }


if($('.twitter-timeline').length) {
  var tweetconfig = {
    // "id": '502160051226681344',
    "profile": {"screenName": 'FlashCoins'},
    "dataOnly": true,
    // "maxTweets": 10,
    // "enableLinks": true,
    "customCallback": populateTpl
  };

  twitterFetcher.fetch(tweetconfig);

  function populateTpl(tweets){
    var element = document.getElementById('zl-twitts');
    var html = '';
    var lgth = tweets.length;
    for (var i = 0; i < lgth ; i++) {
      //<span style="float: right;">Posted on the ' + tweetObject.time + '</span>
      var tweetObject = tweets[i];
      var tweet = tweetObject.tweet.replace(/(<|&lt;)br\s*\/*(>|&gt;)(<|&lt;)br\s*\/*(>|&gt;)/g,"</br>");
      html += '<div class="col-sm-12" style="margin-bottom:15px; border-top:1px solid #fff; padding:15px;">\
      <div class="col-sm-1 zl-tweet-image"><img src="images/flashcoin-icon.png" alt="img"></div>\
      <div class="zl-tweet-area col-sm-11">\
        <p style="color:#fff; text-align:left;"><label>'+tweetObject.author_data.name+'</label> <a target="_blank" href="'+tweetObject.author_data.profile_url+'">'+tweetObject.author_data.screen_name+'</a></p>\
        <p style="color:#fff; text-align:left">'+tweet+'</p>\
      </div></div>';
    }
    html += '';
    //$('#zl-twitts').html(html);
    element.innerHTML = html;
  }
}


// html += '<div class="col-sm-12" style="margin-bottom:15px; border-top:1px solid #fff; padding:15px;">\
// <div class="col-sm-1 zl-tweet-image"><img src="images/flashcoin-icon.png" alt="img"></div>\
// <div class="col-sm-1 zl-tweet-title-mobile"><p style="color:#fff; text-align:left;"><label>'+tweetObject.author_data.name+'</label> <a target="_blank" href="'+tweetObject.author_data.profile_url+'">'+tweetObject.author_data.screen_name+'</a></p></div>\
// <div class="zl-tweet-area col-sm-11 ">\
//   <p style="color:#fff; text-align:left;" class="zl-tweet-title-desktop"><label>'+tweetObject.author_data.name+'</label> <a target="_blank" href="'+tweetObject.author_data.profile_url+'">'+tweetObject.author_data.screen_name+'</a></p>\
//   <p style="color:#fff; text-align:left">'+tweet+'</p>\
// </div></div>';
