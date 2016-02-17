/*
 *
 *
 */

if (typeof jQuery === 'undefined') {
  throw new Error('JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

+function ($) {

	$.notify = function(message, options) {
		var config = $.extend({
			delay: 3000,
			type: "default",
			align: "center",
			verticalAlign: "top",
			blur: 0.2,
			close: false,
			background: "",
			color: "",
			class: "",
			animation: true,
			animationType: "drop",
			icon: "",
			buttons: [],
			buttonFunc: [],
			buttonAlign: "center",
			width: "600px"
		}, options);
		
		var animation = "";
		var buttons = "";
		var close = "";
		var closeClass = "";
		var icon = "";
		
		if(config.animation) { animation = config.animationType;  }
		if(config.icon != "") { icon = "<i class='icon fa fa-"+config.icon+"'></i>"; }
		if(config.close || config.delay == 0) { close = "<button type='button' class='close' data-close='notify' data-animation='"+animation+"'; >×</button>"; closeClass = "notify-dismissible"; }
		/*if(config.buttons.length != 0){
			buttons = "<div class='notify-buttons "+config.buttonAlign+"'>";
			if(config.buttonFunc.length != 0){
				if(typeof config.buttonFunc[0] != "undefined"){
					buttons += "<button type='button' onclick='"+config.buttonFunc[0]+"()'>"+config.buttons[0]+"</button>";
				}
				if(typeof config.buttonFunc[1] != "undefined"){
					buttons += "<button type='button' onclick='"+config.buttonFunc[1]+"()'>"+config.buttons[1]+"</button>";
				}else{
					if(typeof config.buttons[1] != "undefined"){ buttons += "<button type='button'>"+config.buttons[1]+"</button>"; }
				}
			}else{
				buttons += "<button type='button'>"+config.buttons[0]+"</button>";
				if(typeof config.buttons[1] != "undefined"){ buttons += "<button type='button'>"+config.buttons[1]+"</button>"; }
				
			}
			buttons += "</div>";
		}*/

		var $elem = $("<div data-animation='"+animation+"' class='notify "+config.align+" "+ config.verticalAlign+" "+animation+" "+closeClass+"'><div class='message'>"+icon+message+"</div>"+buttons+close+"</div>");
		if(config.background != ""){ 
			$elem.css("background", config.background);
		}else{
			if(config.class == ""){
				$elem.addClass("notify-"+config.type);
			}else{
				$elem.addClass(config.class);
			}
		}
		if(config.color != "") { $elem.css("color", config.color); }
		if(animation == "drop"){ $("body").addClass("notify-open-drop"); }
		if(config.verticalAlign == "middle"){
			$elem.css("visibility", "hidden");
			$("body").append($elem);
			$elem.css({"margin-top":$elem.innerHeight()/2*-1,"visibility":"visible"});
		}else{
			$("body").append($elem);
		}
		
		if(config.animation){
			setTimeout(function(){
				$elem.removeClass(animation);
			},100);
		}

		if(config.delay == 0){
			var $backdrop = $("<div class='notify-backdrop'></div>");
			$("body").append($backdrop).addClass("notify-open");
			setTimeout(function(){
				$backdrop.css("opacity", config.blur);
			},100);
		}else{
			setTimeout(function(){
				if(config.animation){
					$elem.addClass(config.animationType);
					setTimeout(function(){
						if(config.animation == "drop"){ $("body").removeClass("notify-open-drop"); }
						$elem.remove();
					},400);
				}else{
					$elem.remove();
				}
			},config.delay);
		}
	}

	$(document).on("click", ".notify-backdrop", function(e){
		hide($(".notify"));
	});
	$(document).on("click", ".notify-buttons > button", function(e){
		hide($(this).parent().parent());
	});
	$(document).on("click", "[data-close='notify']", function(e){
		hide($(this).parent());
	});

	function hide($el){
		$("body").removeClass("notify-open");
		$(".notify-backdrop").css("opacity",0);
		if($el.data("animation") != ""){
			$el.addClass($el.data("animation"));
			setTimeout(function(){
				$("body").removeClass("notify-open-drop");
				$(".notify-backdrop").remove();
				$el.remove();
			},400);
		}else{
			$(".notify-backdrop").remove();
			$el.remove();
		}
	}
}(jQuery);

