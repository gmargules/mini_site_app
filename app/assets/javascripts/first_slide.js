
$(document).ready(function () {
	$('.first_slide .circle,.first_slide .content_start').hover(
         function(){ $('.circle').addClass('hover') },
         function(){ $('.circle').removeClass('hover') }
    )
});

$(document).ready(function () {
  	$('.first_slide .circle,.first_slide .content_start').click(
       function() { $('.circle, .content_start').hide( 'scale' )}
    )
});

$(document).ready(function () {

	$('.small_circle, .first_slide .circle,.first_slide .content_start').click(
       	function() {
       		temp = $('.active').next().find('header');
       		number=$('div.item').index($('div.active')[0]);
       		banana_item=temp.find('#banana_svg_'+number);
       		item_color=$('.active').next().find('h1').css("color");
       		for ( var i = 0; i < number; i++ ) {
    			returned_item=banana_item.clone().attr('id', "banana_number_"+number+"_"+i).appendTo(temp);
    			//returned_item.find('path').css("color", item_color);
    		}
    		for ( var i = number; i < 29; i++ ) {
    			returned_item=banana_item.clone().attr('id', "banana_number_"+number+"_"+i).appendTo(temp);
    			returned_item.css("opacity",'0.5');
    		}
    		
       	}
    )



		
});


