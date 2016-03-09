/* Music Box chat-plugin
  * parses links into the HTML for music boxes
  * by Haji
  */
 var request = require('request');
 
 exports.commands = {
     jb: 'jukebox',
     jukebox: function (target, room, user) {
         if (!this.canBroadcast()) return;
         var parts = target.split(',');
         if (!target) return this.sendReply("/jukebox link, link, link - parses it to be in a juke box");
         var str = '';
         var self = this;
         var parsed = parts.map(parse);
         Promise.all(parsed).then(function(data) {
             str+=data;
             self.sendReply(data);
         });
 
     }
 };
 
 function parse (link) {
         return new Promise(function(resolve, reject) {
             request(link, function(err, res, body) {
                if (!err && res.statusCode == 200) {
                     var str = '<a href="' + link + '"></a><br />'; //parse it now
                     resolve(str);
                } else {
                     reject(str);
                 }
             });
        });
 }
