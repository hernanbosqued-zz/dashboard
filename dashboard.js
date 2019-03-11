const { RTMClient, WebClient } = require('@slack/client');
const gpio = require('onoff').Gpio;

const token = process.env.SLACK_TOKEN;
const STG_BOT_ID = process.env. STG_BOT_ID;
const rtm = new RTMClient(token);
const web = new WebClient(token);
const led = new gpio(4, 'out'); 

rtm.start();

console.log(`service up`);

rtm.on('message', (message) => {
	console.log(message)

	//console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
  
	console.log(message);

	(async () => {	
		if ( message.subtype && message.subtype === 'bot_message' && message.bot_id == STG_BOT_ID)) {
			if( message.text === 'on' ){
				led.writeSync(true);
			}
			else{
				led.writeSync(false);
			}
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

process.on('SIGINT', () => { led.unexport(); });
