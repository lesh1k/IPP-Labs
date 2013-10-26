p1 = new Array();
p1['key'] = 48;
p1['played'] = false;
p1['playing'] = false;
p1['count']=0;
p2 = new Array();
p2['key'] = 49;
p2['played'] = false;
p2['playing'] = false;
p2['count']=0;
var game_started = false;
var start_time;
var show_confirm = false;

function showInfo(message){
	$("#info").text(message);
	$("#info").fadeIn(600);
	window.setTimeout(function(){$("#info").fadeOut(600);},1000);
}

// mediator
function mediator(keycode){
	var round = 5000;
	if(keycode==49 && !p1['played'] && !p2['playing']){
		if(!p1['playing']){
			p1['playing'] = true;
			start_time = new Date();
			set_int_id = window.setInterval(function(){
				turn_ended = (new Date()).getTime()-start_time.getTime()>round;
				if(turn_ended){
					$("#p1").css('color','white');
					clearInterval(set_int_id);
					p1['played'] = true;
					p1['playing'] = false;
					turn_ended = false;
					showInfo("Player 2 turn.");
				}
			},100);
			$("#p1").css('color','rgb(253, 200, 30)');
			p1['count'] += 1;
			$("#1").text(p1['count']);
		}
		else if(!turn_ended){
			p1['count'] += 1;
			$("#1").text(p1['count']);
		}
	}
	else if(keycode==48 && !p2['played'] && !p1['playing'] && p1['played']){
		if(!p2['playing']){
			p2['playing'] = true;
			start_time = new Date();
			set_int_id = window.setInterval(function(){turn_ended = (new Date()).getTime()-start_time.getTime()>round;
				if(turn_ended){
					$("#p2").css('color','white');
					clearInterval(set_int_id);
					p2['played'] = true;
					p2['playing'] = false;
					mediator(-1);
				}
			},100);
			$("#p2").css('color','rgb(253, 200, 30)');
			p2['count'] += 1;
			$("#2").text(p2['count']);
		}
		else if(!turn_ended){
			p2['count'] += 1;
			$("#2").text(p2['count']);
		}
	}
	else if(p1['played']&&(!p2['played'])){
		showInfo("Player 2 turn.");
	}
	else if(!p1['played']){
		showInfo("Player 1 turn.");
	}
	else{
		console.log('Some error');
		window.setTimeout(function(){},1000);
	}	

	if(p1['played'] && p2['played']){
		showInfo("Round ended!");
		window.setTimeout(function(){
			if(!show_confirm){
				show_confirm = true;
				restart = window.confirm('Restart game?');
				if(p1['played'] && p2['played'] && restart){
					$("#1, #2").text(0);
					p1['played']=false;
					p1['playing']=false;
					p1['count']=0;
					p2['played']=false;
					p2['playing']=false;
					p2['count']=0;
					turn_ended = false;
					restart = false;
					showInfo('Game restarted');
				}
			}
		}, 500);
		show_confirm = false;
	}
}

$('html').keyup(function(e){
	console.log(e.keyCode);
	mediator(e.keyCode);
});