const { RTMClient, WebClient } = require('@slack/client');
//const token = process.env.SLACK_TOKEN;
const token = 'xoxb-58530797379-565023860738-8zlD6gWqcA9Xo6G0x6iiOHrJ';

const rtm = new RTMClient(token);
const web = new WebClient(token);

rtm.start();

console.log(`service up`);

rtm.on('message', (message) => {

//  if ( (message.subtype && message.subtype === 'bot_message') || (!message.subtype && message.user === rtm.activeUserId) ) {
//    return;
//  }

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
		  
		  rtm.sendMessage('Gracias por tu mensaje ' + user + '!', message.channel)
		  .then((res) => {
		    console.log('Message sent');
		  })
		  
	  
		  console.log(`(channel:${channel}) ${user} says: ${message.text}`);		  
	})();
});
