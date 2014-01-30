var userName;
var curStep = 1;
var selectedPizza;
var orderID = 1 + Math.floor(Math.random() * 999);
var extraCheese = Array();
var extraMeat = Array();
var extraVeggies = Array();
var pizzaPrice = 0;
var pricelist = Object();

pricelist.meat = Object();
pricelist.cheese = Object();
pricelist.veggies = Object();

pricelist.meat['bacon'] = 18;
pricelist.meat['prosciutto'] = 12;
pricelist.meat['salami'] = 8;
pricelist.meat['chicken breast'] = 11;
pricelist.meat['ham'] = 10;

pricelist.cheese['feta'] = 8;
pricelist.cheese['parmesan'] = 10;
pricelist.cheese['mozarella'] = 7;
pricelist.cheese['dor blue'] = 11;
pricelist.cheese['edam'] = 8;
pricelist.cheese['brinza'] = 8;

pricelist.veggies['fresh mushrooms'] = 8;
pricelist.veggies['smoked mushrooms'] = 8;
pricelist.veggies['red onion'] = 8;
pricelist.veggies['tomatoes'] = 12;
pricelist.veggies['garlic'] = 5;
pricelist.veggies['rucola'] = 8;
pricelist.veggies['marinated Gogoshars'] = 22;
pricelist.veggies['corn'] = 8;
pricelist.veggies['parsley'] = 8;
pricelist.veggies['chili pepper'] = 8;

$(document).ready(function(){
	$('button[name="next"]').click(function(){
		if(curStep === 1){
			userName = $('input[name="name"]').val();
			if(userName.length <= 0){
				$(".warning").text("Name is mandatory.");
				$(".warning").fadeIn(300);
				window.setTimeout(function(){
					$(".warning").fadeOut(300);
				}, 1500);
				return;
			}
			$(".step-2 .message").text("Choose your pizza, "+userName+"!");
			$('button[name="back"]').attr("disabled",false);
			$('button[name="next"]').attr("disabled",true);
		}
		else if(curStep === 3){
			if(extraVeggies.length > 0){
				write_lists();
			}
		}
		else if(curStep === 4){
			$(".navigation").hide();
			$(".step-5 .message .order_id").text(orderID);
		}
		$(".step-"+curStep).slideUp(500);
		curStep += 1;
		$(".step-"+curStep).slideDown(500);
	});

	$('button[name="back"]').click(function(){
		if(curStep === 2){
			userName = $('input[name="name"]').val(userName);
			$('button[name="back"]').attr("disabled",true);
			$('button[name="next"]').attr("disabled",false);
		}
		$(".step-"+curStep).slideUp(500);
		curStep -= 1;
		$(".step-"+curStep).slideDown(500);
	});

	$(".pizza .thumbnail").click(function(){
		$(".pizza .thumbnail").removeClass("selected");
		$(this).addClass("selected");
		$('button[name="next"]').attr("disabled",false);
		pizzaPrice = parseInt($(this).parent().find(".price span").text());
		selectedPizza = $(this).parent().html();
		$(".step-3 .pizza, .step-4 .pizza").html(selectedPizza);
		$(".step-3 .pizza .thumbnail, .step-4 .pizza .thumbnail").css("background-image", $(this).css("background-image"));
	});

	$("ul.cheese li input").click(function(){
		var is_checked = !$(this).prop("checked");
		var value = $(this).val();
		var index = extraCheese.indexOf(value);
		if(is_checked){
			if(index != -1){
			    extraCheese.splice(index, 1);
			}
			$(this).prop("checked",false);
		}
		else if(extraCheese.length<3 && !is_checked){
			extraCheese.push(value);
			$(this).prop("checked",true);
		}
		else{
			$(this).prop("checked",false);
		}
	});

	$("ul.meat li input").click(function(){
		var is_checked = !$(this).prop("checked");
		var value = $(this).val();
		var index = extraMeat.indexOf(value);
		if(is_checked){
			if(index != -1){
			    extraMeat.splice(index, 1);
			}
			$(this).prop("checked",false);
		}
		else if(extraMeat.length<2 && !is_checked){
			extraMeat.push(value);
			$(this).prop("checked",true);
		}
		else{
			$(this).prop("checked",false);
		}
	});

	$("ul.veggies li input").click(function(){
		var is_checked = !$(this).prop("checked");
		var value = $(this).val();
		var index = extraVeggies.indexOf(value);
		if(is_checked){
			if(index != -1){
			    extraVeggies.splice(index, 1);
			}
			$(this).prop("checked",false);
		}
		else if(extraVeggies.length<5 && !is_checked){
			extraVeggies.push(value);
			$(this).prop("checked",true);
		}
		else{
			$(this).prop("checked",false);
		}
	});
});

function write_lists(){
    var list = "";
    var full_list = "";
    var total_price = 0;

    for (var i = 0; i < extraCheese.length; i++ ) {
        list += "<li>"  + extraCheese[i] + "<span>" + pricelist.cheese[extraCheese[i]] + " MDL</span></li>";
        total_price += pricelist.cheese[extraCheese[i]];
    }
    full_list += "<ul class='cheese'>Cheese"+list+"</ul>";
    list = "";

    for (var i = 0; i < extraMeat.length; i++ ) {
        list += "<li>"  + extraMeat[i] + "<span>" + pricelist.meat[extraMeat[i]] + " MDL</span></li>";
        total_price += pricelist.meat[extraMeat[i]];
    }
    full_list += "<ul class='meat'>Meat"+list+"</ul>";
    list = "";

    for (var i = 0; i < extraVeggies.length; i++ ) {
        list += "<li>"  + extraVeggies[i] + "<span>" + pricelist.veggies[extraVeggies[i]] + " MDL</span></li>";
        total_price += pricelist.veggies[extraVeggies[i]];
    }
    full_list += "<ul class='veggies'>Veggies"+list+"</ul>";
    list = "";

    total_price += pizzaPrice;
    $(".step-4 .addons").html(full_list);
    $(".step-4 .total span").text(total_price+" MDL");
}