$.fn.textWidth = function(){
  var html_org = $(this).html();
  var html_calc = '<span>' + html_org + '</span>';
  $(this).html(html_calc);
  var width = $(this).find('span:first').width();
  $(this).html(html_org);
  return width;
};




$(document).ready(function () {
  $('footer svg').click(function() {
   window.open("http://monkeytech.co.il/", '_blank');
  });

  $('.first_slide .circle,.first_slide h3').one("click",function(){
    
    is_safari = false;
    BrowserDetection();
    //handle bananas header and match background color to video
    var bananas_container_array = $('.item').find('header .content_of_header #banana_svgs');
    var circles_container_array = $('.item').find('header .content_of_header #circle_svgs');
    
    var banana_item = bananas_container_array.eq(0).find('#banana_svg_0_0');
    var circle_item = circles_container_array.eq(0).find('#circle_svg_0_0');
    var i, context, pixelData, number, video, bananas_container, circles_container, banana_returned_item, circle_returned_item;

    for (number = 0; number<$('div.item').index($('div.item').last()[0])-1;number++){
      bananas_container = bananas_container_array.eq(number);
      circles_container = circles_container_array.eq(number);
      
      for (i = 1; i < number+1; i++ ) {
       banana_item.clone().attr('id', "banana_svg_"+number+"_"+i).appendTo(bananas_container);
       circle_item.clone().attr('id', "circle_svg_"+number+"_"+i).appendTo(circles_container);
      }
      
      for (i = number+1; i < 30; i++ ) {
        banana_returned_item = banana_item.clone().attr('id', "banana_svg_"+number+"_"+i).appendTo(bananas_container);
        banana_returned_item.css("opacity",'0.5');
        circle_returned_item = circle_item.clone().attr('id', "circle_svg_"+number+"_"+i).appendTo(circles_container);
        circle_returned_item.css("opacity",'0.5');
      }

      //fit background of next item 
    }
    //handle variables hande fade of start button 
    myLastDate = new Date();
    grade_concept = 0;
    grade_business_readiness = 0;
    grade_tech_readiness = 0;
    grade_design = 0;
    
    user_version = Math.round(Math.random());
    if (user_version == 1){
      $('.item footer').addClass('not_hidden_class');

    }
    change_texture();
    $('.circle_2').removeClass('not_hidden_class')
    $('.first_slide h3, .first_slide h1, .first_slide section').fadeOut(10);

    circle_half_px= $('.circle').css('width');
    circle_relative_size = parseInt(circle_half_px, 10)/10;

    $('.circle').css("top",$('.circle').offset().top - circle_relative_size);
    $('.circle').css('left',$('.circle').offset().left - circle_relative_size);
    $('.circle').css("position","absolute");
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var max_width_height=Math.max(windowWidth,windowHeight);
    var element = $('.circle').detach();
    $('.first_slide').append(element);
    $('.circle').animate({ width:max_width_height*2, height:max_width_height*2, top:windowHeight-(Math.sqrt(2)*max_width_height),  left:windowWidth-(Math.sqrt(2)*max_width_height)}, 1000).promise().done(function () {
      $('#myCarousel').carousel('next');
      $('#myCarousel').carousel('pause');
    });
    $(window).trigger('resize');
  })


	$('.small_circle').one("click", function(){
		 	var myNewDate = new Date();
		 	var response_duration = myNewDate-myLastDate;
		 	myLastDate = myNewDate;
  		var question_id = $('div.item').index($('div.active')[0]);
  		var response_value = $(this).text();
  		var user_id = $('#data_container').attr('data-user_id');
		  var params = {user_version:user_version, question_id:question_id, response_value:response_value, user_id:user_id, response_duration:response_duration};			

      switch ($('.active').attr('data-grade_type')){
        case "concept": 
          grade_concept = grade_concept + parseInt($('.active').attr('data-weight')) * parseInt(response_value);
          break;
        case "business":

          grade_business_readiness = grade_business_readiness + parseInt($('.active').attr('data-weight')) * parseInt(response_value);
          break;
        case "tech":
          grade_tech_readiness = grade_tech_readiness + parseInt($('.active').attr('data-weight')) * parseInt(response_value);
          break;
        case "design": 
          grade_design = grade_design + parseInt($('.active').attr('data-weight')) * parseInt(response_value);
          break;

        default: 
          console.log("Unknown question type");
          break;
      }

      //Checking grades
      
      //console.log(grade_concept);
      //console.log(grade_business_readiness);
      //console.log(grade_tech_readiness);
      //console.log(grade_design);
      
      if ( $('div.item').last().is($('div.active').next())){

        calc_grades();
        $('footer').removeClass('not_hidden_class');
        $('canvas, section, footer, #last_slide_text').hide();
        $('#calculation_canvas').show();

        image_animator();        
      }

			$.ajax({
			    url : "answer",
			    type: "POST",
			    data : params
			});
      change_texture();
      $(this).addClass('small_circle_on_click');
      setTimeout(function(){$('#myCarousel').carousel('next').carousel('pause');}, 100);
      
		})

    $('.first_slide .circle,.first_slide h3').hover(
         function(){$('.circle_2').addClass('not_hidden_class') },
         function(){ $('.circle_2').removeClass('not_hidden_class') }
    )

    $('.small_circle').hover(
         function(){ $(this).addClass('small_circle_on_hover')},
         function(){ $(this).removeClass('small_circle_on_hover') }
    )

	


  $(window).resize(function() {
    
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    var min_width_height=Math.min(windowWidth,windowHeight)/1.9;
    lines_canvas = document.getElementById('my_lines_canvas');
    lines_canvas.width = min_width_height*1.9;
    lines_canvas.height = min_width_height; 
    $('.knob1').trigger('configure', {'width':min_width_height, 'height':min_width_height}); 
    $('.knob2').trigger('configure', {'width':min_width_height, 'height':min_width_height}); 
    $('.knob3').trigger('configure', {'width':min_width_height, 'height':min_width_height}); 
    $('.knob4').trigger('configure', {'width':min_width_height, 'height':min_width_height}); 

    var page_id = $('div.item').index($('div.active')[0]);
    var last_page = $('div.item').index($('div.item').last()[0]);
    if(page_id == last_page){
      drawShape();
    }

    var last_slide_number = $('div.item').index($('div.item').last()[0]);
    for ( var i = 1; i < last_slide_number; i++ ) {
      video = document.getElementById("myVideo_"+i);
      if(video != null){
        video.height = 1.675*windowHeight/2.3>windowWidth? windowWidth/1.675 : windowHeight/2.3;
        console.log(1.675*windowHeight/2.3>windowWidth);
      }
    }
    
    width_after_ratio_footer =8.389513108614233*($(window).height())*0.03; //compensate safari issue
    $('footer svg').css('width',width_after_ratio_footer);
    $('footer svg').css('left',windowWidth/2-windowHeight*0.13);


    width_after_ratio_last_footer =$(window).height()*0.1; //compensate safari issue
    $('.last_slide footer svg').css('width',width_after_ratio_last_footer);
    $('.last_slide footer svg').css('left',windowWidth/2-windowHeight*0.05);
    h2_text_position = parseInt($('.last_slide footer svg').css('left'),10) - 1.2* parseInt($('.last_slide footer h2').css('width'),10);
    $('.last_slide footer h2').css('left',h2_text_position+'px');

    
    var pos_start_width = Math.round($('#first_slide_circle').offset().left + ($('#first_slide_circle').width())/2-($('#central_container_first_slide h3').width())/2);
    var pos_start_height = Math.round($('#first_slide_circle').position().top + ($('#first_slide_circle').height())/2-($('#central_container_first_slide h3').height())/5.5);

    $('#central_container_first_slide h3').css('left',pos_start_width);
    $('#central_container_first_slide h3').css('top',pos_start_height);


  });

  $('.content_large').css('visibility','hidden');

});

$(window).load(function bababa(){
  $('.content_large').css('visibility','visible');
  $(window).trigger('resize');
});

function play_video(item_number){
  video = document.getElementById("myVideo_"+item_number);
  if(video != null){
    if(!is_safari){
      video.addEventListener('loadeddata', function(event) { change_slide_background();} );
    }
    video.play();
  }
}


function change_texture(){
  next_page_backgound_is_yellow = $('.active').next().hasClass('yellow');
  current_texture_is_yellow = $('#myTexture').hasClass('texture_image_class_yellow');
  if(next_page_backgound_is_yellow && current_texture_is_yellow){
    $('#myTexture').addClass('texture_image_class_blue')
    $('#myTexture').removeClass('texture_image_class_yellow')
  }
  if(!current_texture_is_yellow && !next_page_backgound_is_yellow){
    $('#myTexture').addClass('texture_image_class_yellow')
    $('#myTexture').removeClass('texture_image_class_blue')
  }
}

function image_animator(){
  var counter = 0;
  var calculation_canvas = $('#calculation_images');
  
  window.requestAnimFrame = (function(callback) {
    return  function(callback) {
      MyImageIntervalVar = window.setTimeout(callback, 10);
    };
  })();
  animate();

  function animate() {
    setTimeout(function() {
      if(counter<10 ){
        requestAnimFrame(animate);
      }
      else{
        $('#last_slide_loading_title, #calculation_images').hide();
        //calc_grades();
        $('canvas, #my_lines_canvas, footer, section').fadeIn(1000);      
        
      }

      // get the current image
      // get the xy where the image will be drawn
      imageIndex = counter%4+1;
      div_id = "#calc_monkey_" + imageIndex;
      image_id = "#calc_monkey_" + imageIndex + " img";

      var img = $(image_id);
      var img_div = $(div_id);
      img.css('height', 0.65*parseInt(calculation_canvas.css('height'), 10));
      img.css('width', img.css('height'));
      img_div.css('height', img.css('height'));
      img_div.css('width', img.css('height'));
      var imgX=parseInt(calculation_canvas.css('width'), 10)/2-parseInt(img.css('width'), 10)/2;
      var imgY=parseInt(calculation_canvas.css('height'), 10)/2-parseInt(img.css('height'), 10)/2;
      img_div.css('position', 'absolute');
      img_div.css('top', imgY);
      img_div.css('left', imgX);
      img_div.css('visibility', 'visible');

      //hide last image
      lastIndex = (counter-1)%4+1;
      last_image_id = "#calc_monkey_" + lastIndex;
      
      var last_img = $(last_image_id);
      last_img.css('visibility', 'hidden');
      counter++;
    }, 500);
  }
}

function calc_grades(){


  //calculate seprate grades
  final_grade_concept = Math.round(100*grade_concept / 50);//64
  final_grade_business_readiness = Math.round(100*grade_business_readiness / 70);//102.5
  final_grade_tech_readiness = Math.round(100*grade_tech_readiness / 45);//52.5
  final_grade_design = Math.round(100*grade_design / 20);//27.5
  
 
  total_ring_weight = final_grade_concept + final_grade_business_readiness + final_grade_tech_readiness + final_grade_design;

  //calculate percentage of each grade from total ring
  final_grade_concept_arc_size = Math.round(360*final_grade_concept/total_ring_weight);
  final_grade_business_readiness_arc_size = Math.round(360*final_grade_business_readiness/total_ring_weight);
  final_grade_tech_readiness_arc_size = Math.round(360*final_grade_tech_readiness/total_ring_weight);     
  final_grade_design_arc_size = Math.round(360*final_grade_design/total_ring_weight);

  //fix to match 100% of ring
  final_grade_concept_arc_size = final_grade_concept_arc_size + 360 - ( final_grade_concept_arc_size + final_grade_business_readiness_arc_size + final_grade_tech_readiness_arc_size + final_grade_design_arc_size);

  $('.knob1').attr({"data-angleOffset": 0, "data-angleArc": final_grade_tech_readiness_arc_size});
  $('.knob2').attr({"data-angleOffset": final_grade_tech_readiness_arc_size, "data-angleArc": final_grade_design_arc_size});
  $('.knob3').attr({"data-angleOffset": final_grade_tech_readiness_arc_size+final_grade_design_arc_size, "data-angleArc": final_grade_business_readiness_arc_size});
  $('.knob4').attr({"data-angleOffset": final_grade_tech_readiness_arc_size+final_grade_design_arc_size+final_grade_business_readiness_arc_size, "data-angleArc": final_grade_concept_arc_size});

  $(".knob2").knob();
  $('.knob3').knob();
  $('.knob4').knob();

  $(".knob1").knob({'draw' : function () { 
      $(".knob1").val("");
    }
  });

  $(window).trigger('resize');//calculate sizes correctly
  drawShape();
}


function drawShape(){
  radius = $('.knob1').width()*(1+$('.knob1').attr("data-thickness"))/1.8;
  var angles = [];

  angles.push(parseInt($('.knob1').attr("data-angleOffset"))+ parseInt($('.knob1').attr("data-angleArc")/2));  
  angles.push(parseInt($('.knob2').attr("data-angleOffset"))+ parseInt($('.knob2').attr("data-angleArc")/2));
  angles.push(parseInt($('.knob3').attr("data-angleOffset"))+ parseInt($('.knob3').attr("data-angleArc")/2));
  angles.push(parseInt($('.knob4').attr("data-angleOffset"))+ parseInt($('.knob4').attr("data-angleArc")/2));

  // get the canvas element using the DOM
  var canvas = document.getElementById('my_lines_canvas');
  canvas_width = canvas.width/2;
  canvas_height = canvas.height/2;
  // Make sure we don't execute when canvas isn't supported
  if (canvas.getContext){
 
    // use getContext to use the canvas for drawing
    var ctx = canvas.getContext('2d');

    var x_pos = [];
    var y_pos = [];
    var final_x = [];
    var final_x_text = [];
    var line_grade = [];
    var line_grade_color = [];
    var grade_factor_x = [];
    var grade_factor_y = [];


    var line_color = ["#e1cb34","#974848","#86313d","#215648"];
    var line_text = ["Technical","UX/UI", "Business", "Concept"]
    var line_grade = [final_grade_tech_readiness+"%",final_grade_design+"%",final_grade_business_readiness+"%",final_grade_concept+"%"];
    var line_grade_color = ["#86313d","#e1cb34","#e1cb34","#e1cb34"];

    ctx.font = "normal 6em 'geared_slabregular'";
    for (var i=0;i<4;i++){
      x_pos.push(Math.sin(angles[i]/180*Math.PI));
      y_pos.push((-1)*Math.cos(angles[i]/180*Math.PI));
      

      if(angles[i]<=180){
        final_x_text[i] = 2*canvas_width-1.2*ctx.measureText(line_text[i]).width;
        final_x[i] = final_x_text[i];
        
        grade_factor_x[i]=-1;
        grade_factor_y[i]=(angles[i]<=90?-1:1);
      }
      else{
        final_x_text[i] = ctx.measureText(line_text[i]).width/9;
        final_x[i] = final_x_text[i]+ctx.measureText(line_text[i]).width;
        
        grade_factor_x[i]=1;
        grade_factor_y[i]=(angles[i]<=270?1:-1);
      }
    }

    total_grade_calc = Math.round((final_grade_tech_readiness + final_grade_design + final_grade_business_readiness + final_grade_concept)/4);
    
    total_grade = total_grade_calc +"%"
    

    ctx.lineWidth = canvas_width/100;
    ctx.lineCap = 'round';
     for(i=0;i<4;i++){
      ctx.strokeStyle=line_color[i];
      ctx.beginPath();
      ctx.moveTo(canvas_width+radius*x_pos[i],canvas_height+radius*y_pos[i]);
      ctx.lineTo(final_x[i],canvas_height+radius*y_pos[i]);
      ctx.stroke();
      ctx.font = "normal 6em 'geared_slabregular'";
      ctx.fillStyle = line_color[i];
      ctx.fillText(line_text[i], final_x_text[i],canvas_height+radius*y_pos[i]);
      ctx.font = "normal 5em 'geared_slabregular'";
      ctx.fillStyle = line_grade_color[i];
      ctx.fillText(line_grade[i], canvas_width+(radius+grade_factor_x[i]*ctx.measureText(line_grade[i]).width/2)*x_pos[i],canvas_height+(radius+grade_factor_y[i]*ctx.measureText("00").width/2)*y_pos[i]);
    }
    ctx.fillStyle = "#e1cb34";
    ctx.font = "normal 12em 'geared_slabregular'";

    ctx.fillText(total_grade, canvas_width-ctx.measureText(total_grade).width/2  ,canvas_height+0.2*ctx.measureText("00").width);
    ctx.font = "normal 6em 'geared_slabregular'";
    ctx.fillText("Ready", canvas_width-ctx.measureText("Ready").width/2  ,canvas_height+1.7*ctx.measureText("00").width);
    
  } 
  else {
      alert('You need Safari or Firefox 1.5+ to see this demo.');
  }
}

function BrowserDetection(){
                
  //Check if browser is IE or not
  if (navigator.userAgent.search("MSIE") >= 0) {

  }
  //Check if browser is Chrome or not
  else if (navigator.userAgent.search("Chrome") >= 0) {$('div.item').index($('div.item').last()[0]);

  }
  //Check if browser is Firefox or not
  else if (navigator.userAgent.search("Firefox") >= 0) {
    var last_slide_number = $('div.item').index($('div.item').last()[0]);
    for ( var i = 1; i < last_slide_number; i++ ) {
      $("#video_container_"+i).css('top',"-2em");
    }

  }
  //Check if browser is Safari or not
  else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
    is_safari = true;
  }
  //Check if browser is Opera or not
  else if (navigator.userAgent.search("Opera") >= 0) {

  }
}
