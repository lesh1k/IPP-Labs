var userName;
var curStep = 1;
var selectedPizza;

$(document).ready(function(){
	$('button[name="next"]').click(function(){
		if(curStep === 1){
			userName = $('input[name="name"]').val();
			$(".step-2 .message").text("Choose your pizza, "+userName+"!");
			$('button[name="back"]').attr("disabled",false);
		}
		if(curStep === 4){
			$(".navigation").hide();
		}
		$(".step-"+curStep).slideUp();
		curStep += 1;
		$(".step-"+curStep).slideDown();
	});

	$('button[name="back"]').click(function(){
		if(curStep === 2){
			userName = $('input[name="name"]').val(userName);
			$('button[name="back"]').attr("disabled",true);
		}
		$(".step-"+curStep).slideUp();
		curStep -= 1;
		$(".step-"+curStep).slideDown();
	});

	$(".pizza .thumbnail").click(function(){
		$(".pizza .thumbnail").removeClass("selected");
		$(this).addClass("selected");
		selectedPizza = $(this).parent().html();
		$(".step-3 .pizza").html(selectedPizza);
		$(".step-3 .pizza .thumbnail").css("background-image", $(this).css("background-image"));
	});

	$("ul li").click(function(){
		$(this).find("input").prop("checked", !$(this).find("input").prop("checked"));
	});
});