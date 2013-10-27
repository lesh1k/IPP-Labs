// Scoreboard - displays the score and relevant info (e.g. whos turn it is) if needed. Knows the score and how to display info supplied to it.
// Player - knows only about himself. ID, keycode, score.
// Mediator - knows about everybody. Sends commands to scoreboard.

function Player(keycode){
	this.ID = keycode;
	this.keycode = keycode;
	this.score = 0;
	this.started = false;
	this.played = false;
	this.Play = Play;
	this.custom_event = new CustomEvent('player_turn_finished', {detail:{pid:this.ID}});
	function Play(time_limit){
		if(this.started == false){
			this.started = new Date();
		}
		if((new Date()).getTime()-this.started.getTime() < time_limit){
			this.score++;
		}
		else{
			this.started = false;
			this.played = true;
			$.event.trigger({
				type: "player_turn_finished",
				message: "Hello World!",
				time: new Date(),
				detail:{pid:this.ID}
			});
			// $(this).trigger(this.custom_event);
		}
	}
}

function Scoreboard(){
	this.ShowScore = ShowScore;
	this.ShowInfo = ShowInfo;

	function ShowScore(pid, score, active){
		if($("#scores #"+pid).length<1){
			$("#scores").append("<div id='"+pid+"'>Player #"+pid+":  "+score+"</div>");
		}
		else{
			$("#scores #"+pid).text("Player #"+pid+":  "+score);
		}
		if(active){
			$("#scores #"+pid).css('color', 'orange');
		}
		else{
			$("#scores #"+pid).css('color', 'white');
		}
	};

	function ShowInfo(message){
		$("#info").text(message);
		$("#info").fadeIn('fast');
		window.setTimeout(function(){$("#info").fadeOut('fast');}, 1000);
	}
}

function Mediator(){
	this.players = [(new Player(48)), (new Player(49))]; //Array of players
	this.scoreboard = new Scoreboard();
	this.current_player = 0;
	this.total_players = this.players.length;
	$(this).bind('player_turn_finished', function(e){this.scoreboard.ShowInfo('Turn ended'); this.current_player++;});
	this.PlayGame = PlayGame;
	this.PlayRound = PlayRound;
	function PlayRound(keycode){
		if(this.players[this.current_player].played){
			this.current_player++;
		}
		if(this.current_player < this.total_players){
			this.scoreboard.ShowScore(this.current_player+1, this.players[this.current_player].score, !this.players[this.current_player].played);
			if(this.players[this.current_player].keycode==keycode){
				this.players[this.current_player].Play(this.turn_length);
			}
			else{
				this.scoreboard.ShowInfo('Player #'+(this.current_player+1)+' turn!');
			}
		}
		else{
			this.scoreboard.ShowInfo('Game Finished');
		}
	}
	
	function PlayGame(turn_length){
		this.turn_length = turn_length;
		test=this;
		$('html').keyup(function(e){
			test.PlayRound(e.keyCode);
			console.log(e.keyCode);
		});
	}
}

mediator = new Mediator();

$(document).ready(function(){
	mediator.scoreboard.ShowInfo('Let the game begin!');
	mediator.PlayGame(5000);
});