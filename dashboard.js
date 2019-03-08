const { RTMClient, WebClient } = require('@slack/client');
const token = "xoxb-58530797379-565023860738-soIyOAXtprbGC2VxDzBxBhHm";
const rtm = new RTMClient(token);
const web = new WebClient(token);

rtm.start();

rtm.on('message', (message) => {

  if ( (message.subtype && message.subtype === 'bot_message') || (!message.subtype && message.user === rtm.activeUserId) ) {
    return;
  }

  console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
  
	(async () => {		
		  var res = await web.users.info({user: message.user});
		  if(res.ok){
			  console.log('Nombre de usuario -> ' + res.user.real_name);
			  var user = res.user.real_name;
		  }
	  
		  res = await web.channels.info({channel: message.channel});
		  if( res.ok ){
			console.log('Nombre del canal -> ' + res.channel.name);
			var channel = res.channel.name;
		  }
		  
		  console.log(`(channel:${channel}) ${user} says: ${message.text}`);		  
	})();
});
