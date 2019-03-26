const { RTMClient, WebClient } = require('@slack/client');
const gpio = require('onoff').Gpio;

const token = process.env.SLACK_TOKEN;
const SLACK_BOT_ID = process.env.SLACK_BOT_ID;
const rtm = new RTMClient(token);
const web = new WebClient(token);
const led = new gpio(4, 'out'); 

rtm.start();

console.log(`service up`);

rtm.on('message', (message) => {
	console.log(message);
	//console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
	(async () => {	
		if ( message.subtype && message.subtype === 'bot_message' && message.bot_id == SLACK_BOT_ID) {
			if( message.text === 'on' ){
				console.log('on');
				led.writeSync(1);
			}
			else{
				console.log('off');
				led.writeSync(0);
			}
		}
		  
//		var res = await web.users.info({user: message.user});
//		if(res.ok){
//			console.log('Nombre de usuario -> ' + res.user.real_name);
//			var user = res.user.real_name;
//		}
//	  
//		res = await web.channels.info({channel: message.channel});
//		if( res.ok ){
//			console.log('Nombre del canal -> ' + res.channel.name);
//			var channel = res.channel.name;
//		}
		  	  
//		rtm.sendMessage('Gracias por tu mensaje',message.channel)
//		.then((res) => {console.log('Message sent');})
//		.catch((err)=>{ console.log(err);});
		  
//		console.log(`(channel:${channel}) ${user} says: ${message.text}`);		  
	})();
});

process.on('SIGINT', () => { 
	console.log('service down');
	led.unexport(); 
});
