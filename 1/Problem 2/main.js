// define a player object
function player(keycode){
	this.keycode = keycode;
	this.played = false;
	this.playing = false;
	this.count = 0;
}

//define a game object
function game(){
	this.started = false;
	this.show_confirm = false;
	this.next_player = 0;
}

//define a scoreboard object
function scoreboard(){
	self = this;
	this.turn_ended = false;
	this.round_length = 5000;
	this.start_time = 0;
	this.play = function(p){
		if(!p.playing && !p.played){
			self.start_time = new Date();
			console.log(self.start_time);
			self.int_id = window.setInterval(function(){
				self.turn_ended = (new Date()).getTime()-(self.start_time).getTime()>self.round_length;
				p.playing = true;
				if(self.turn_ended){
					$("#p"+String(p.keycode)).css('color','white');
					clearInterval(self.int_id);
					p.played = true;
					p.playing = false;
				}
			},100);
		}
		if(!self.turn_ended && p.playing){
			p.count += 1;
			if($("#p"+String(p.keycode)).length<1){
				$("#titles").append('<div id="p'+String(p.keycode)+'">Player #'+String(p.keycode)+'</div>');
				$("#scores").append('<div id="'+String(p.keycode)+'">'+String(p.count)+'</div>');
				$("#p"+String(p.keycode)).css('color','rgb(253, 200, 30)');
				$("#"+String(p.keycode)).text(p.count);
			}
			else{
				$("#p"+String(p.keycode)).css('color','rgb(253, 200, 30)');
				$("#"+String(p.keycode)).text(p.count);
			}
		}
	};
}

//commom functions
function showInfo(message){
	$("#info").text(message);
	$("#info").fadeIn(600);
	window.setTimeout(function(){$("#info").fadeOut(600);},1000);
}

function restartGame(full_reset){
	mgame.started = false;
	mgame.show_confirm = false;
	mgame.next_player = 0;
	if(full_reset){
		players = new Array();
		$("#titles, #scores").text('');
	}
	else{
		for(var i = 0; i<players.length; i++){
			players[i] = new player(players[i].keycode);
		}
	}
}

//create a game
mgame = new game();

//create a board
sboard = new scoreboard();
//create two initial players
players = new Array();
players.push((new player(49)));
players.push((new player(48)));

//define mediator
function mediator(keycode){
	console.log("In mediator");

	if(players[mgame.next_player].keycode == keycode){
		sboard.play(players[mgame.next_player])
		if(sboard.turn_ended){
			mgame.next_player += 1
			if(mgame.next_player>=players.length){
				mgame.next_player = 0;
				mgame.show_confirm = true;
				showInfo("Round ended!");
				window.setTimeout(function(){
					if(!mgame.show_confirm){
						mgame.show_confirm = true;
						restart = window.confirm('Restart game?');
						if(restart){
							$("#scores div").text('0');
							restartGame(false);
							restart = false;
							showInfo('Game restarted');
						}
					}
				}, 500);
				mgame.show_confirm = false;
			}
		}
	}
	else{
		showInfo('Player '+ String(mgame.next_player+1) + ' turn');
	}

}

// define observer
function observer(keycode){
	console.log("I'm observing");
	for(var i = 0; i<players.length; i++){
		if(players[i].keycode == keycode){
			console.log('Nothing new');
			mediator(keycode);
			return;
		}
	}
	players.push(new player('keycode'));
	console.log('Player added');
	mediator(keycode);
}

//Separate program for lab 2 and 3
if(confirm("Enable n players?")){
	//start catching keypresses
	$('html').keyup(function(e){
		console.log(e.keyCode);
		observer(e.keyCode);
	});
}
else{
	//start catching keypresses
	$('html').keyup(function(e){
		console.log(e.keyCode);
		mediator(e.keyCode);
	});
}