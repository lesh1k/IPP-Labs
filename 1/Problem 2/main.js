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
	
	function Play(time_limit){
		if(this.started == false){
			this.started = true;
			this.score++;
			setTimeout(function(){$.event.trigger({type: "player_turn_finished", pid: this.keycode})}, time_limit);
		}
		else{
			this.score++;
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
		window.setTimeout(function(){$("#info").fadeOut('fast');}, 1200);
	}
}

function Mediator(){
	this.players = [(new Player(49)), (new Player(48))]; //Array of players
	this.scoreboard = new Scoreboard();
	this.current_player = 0;
	this.total_players = this.players.length;
	self = this;
	$(document).on('player_turn_finished', function(){
			self.players[self.current_player].started = false;
			self.players[self.current_player].played = true;
			self.scoreboard.ShowScore(self.current_player+1, self.players[self.current_player].score, self.players[self.current_player].started);
			self.scoreboard.ShowInfo('Turn ended');
			self.current_player++;
		});
	this.PlayGame = PlayGame;
	this.PlayRound = PlayRound;
	this.InitBoard = InitBoard;
	function PlayRound(keycode){
		pid = this.current_player;//player index
		if(pid < this.total_players){
			if(this.players[pid].keycode==keycode){
				this.players[pid].Play(this.turn_length);
			}
			else{
				this.scoreboard.ShowInfo('Player #'+(pid+1)+' turn!');
			}
			this.scoreboard.ShowScore(pid+1, this.players[pid].score, this.players[pid].started);
		}
		else{
			this.scoreboard.ShowInfo('Game Finished');
		}
	}
	
	function PlayGame(turn_length){
		this.turn_length = turn_length;
		self=this;
		$('html').keyup(function(e){
			self.PlayRound(e.keyCode);
			console.log(e.keyCode);
		});
	}

	function InitBoard(){
		for(var i=0;i<this.total_players;i++){
			this.scoreboard.ShowScore(i+1, this.players[i].score, this.players[i].started);
		}
	}
}

mediator = new Mediator();

$(document).ready(function(){
	mediator.InitBoard();
	mediator.scoreboard.ShowInfo('Let the game begin!');
	mediator.PlayGame(5000);
});