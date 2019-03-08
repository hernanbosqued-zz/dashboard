const { RTMClient, WebClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const rtm = new RTMClient(token);
const web = new WebClient(token);

rtm.start();

console.log(`service up`);

rtm.on('message', (message) => {

	console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
  
	(async () => {	
		  if ( (message.subtype && message.subtype === 'bot_message') || (!message.subtype && message.user === rtm.activeUserId) ) {
			    return;
		  }
		  
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
		  	  
		  rtm.sendMessage('Gracias por tu mensaje',message.channel)
		  .then((res) => {console.log('Message sent');})
		  .catch((err)=>{ console.log(err);});
		  
		  console.log(`(channel:${channel}) ${user} says: ${message.text}`);		  
	})();
});