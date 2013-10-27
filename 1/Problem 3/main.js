// Scoreboard - displays the score and relevant info (e.g. whos turn it is) if needed. Knows the score and how to display info supplied to it.
// Player - knows only about himself. ID, keycode, score.
// Mediator - knows about everybody. Sends commands to scoreboard.
// Game will generate events to which others will subscribe

function Player(keycode){
	this.keycode = keycode;
	this.score = 0;
	this.started = false;
	this.played = false;
	this.Play = Play;
	
	function Play(time_limit){
		console.log('playing');
		if(this.started == false){
			this.started = true;
			this.score++;
			$.event.trigger({type: "turn_started"})
			setTimeout(function(){$.event.trigger({type: "player_turn_finished", pid: this.keycode});}, time_limit);
		}
		else{
			this.score++;
		}
	}
}

function Scoreboard(){
	this.ShowScore = ShowScore;
	this.ShowInfo = ShowInfo;

	function ShowScore(pid, pkey, score, active){
		if($("#scores #"+pid).length<1){
			$("#scores").append("<div id='"+pid+"'>Player #"+pid+"["+String.fromCharCode(pkey)+"]:  "+score+"</div>");
		}
		else{
			$("#scores #"+pid).text("Player #"+pid+"["+String.fromCharCode(pkey)+"]:  "+score);
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
		$("#info").slideDown('fast');
		window.setTimeout(function(){$("#info").slideUp('fast');}, 1200);
	}
}

function Mediator(){
	this.players = new Array(); //Array of players
	this.scoreboard = new Scoreboard();
	this.current_player = 0;
	this.total_players = 0;
	obj_ref = this;
	$(document).on('player_turn_finished', function(){
			obj_ref.players[obj_ref.current_player].started = false;
			obj_ref.players[obj_ref.current_player].played = true;
			obj_ref.scoreboard.ShowScore(obj_ref.current_player+1, obj_ref.players[obj_ref.current_player].keycode, obj_ref.players[obj_ref.current_player].score, obj_ref.players[obj_ref.current_player].started);
			obj_ref.scoreboard.ShowInfo("Player #"+String(obj_ref.current_player+1)+" turn ended");
			obj_ref.current_player++;
		});
	$(document).on('new_player', function(e){
			obj_ref.players.push(new Player(e.keycode));
			obj_ref.total_players++;
			obj_ref.turn_length = e.turn_length;
			obj_ref.InitBoard();
			obj_ref.scoreboard.ShowInfo('New player added.');
		});
	$(document).on('try_to_play', function(e){
			obj_ref.turn_length = e.turn_length;
			obj_ref.PlayRound(e.keycode);
		});
	$(document).on('turn_started', function(e){
			obj_ref.scoreboard.ShowInfo("Player #"+String(obj_ref.current_player+1)+" started.");
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
			this.scoreboard.ShowScore(pid+1, this.players[pid].keycode, this.players[pid].score, this.players[pid].started);
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
			this.scoreboard.ShowScore(i+1, this.players[i].keycode, this.players[i].score, this.players[i].started);
		}
	}
}

function Game(turn_length){
	this.players = new Array();
	this.turn_length = turn_length;
	self = this;
	$('html').keyup(function(e){
			if(self.players.indexOf(e.keyCode) == -1){
				self.players.push(e.keyCode);
				$.event.trigger({type: "new_player", keycode: e.keyCode, turn_length:self.turn_length});
			}
			else{
				$.event.trigger({type: "try_to_play", keycode: e.keyCode, turn_length:self.turn_length});
			}
			console.log(e.keyCode);
		});
}

mediator = new Mediator();

$(document).ready(function(){
	mediator.InitBoard();
	mediator.scoreboard.ShowInfo('Let the game begin!');
	// mediator.PlayGame(5000);
	game = new Game(5000);
});