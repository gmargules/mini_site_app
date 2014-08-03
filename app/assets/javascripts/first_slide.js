


$(document).ready(function () {
  $('footer svg, footer address').click(function() {
   window.open("http://monkeytech.co.il/", '_blank');
  });
});

$(document).ready(function () {
  var last_slide_number = $('div.item').index($('div.item').last()[0]);
  for ( var i = 1; i < last_slide_number; i++ ) {
    var video = document.getElementById("myVideo_"+i);
    
  }

});

$(document).ready(function () {
  $('.first_slide .circle,.first_slide .content_start').hover(
         function(){ $('.circle_2').addClass('not_hidden_class') },
         function(){ $('.circle_2').removeClass('not_hidden_class') }
    )
});

$(document).ready(function () {
  $('.small_circle').hover(
         function(){ $(this).addClass('small_circle_on_hover')},
         function(){ $(this).removeClass('small_circle_on_hover') }
    )
});


$(document).ready(function () {
  $('.first_slide .circle,.first_slide .content_start').one("click",function(){
    //handle bananas header and match background color to video
    var bananas_container_array = $('.item').find('header .content_of_header .content_medium');
    var banana_item = bananas_container_array.eq(0).find('#banana_svg_0_0');
    var i, context, pixelData, number, video, bananas_container, returned_item;
    
    for (number = 0; number<$('div.item').index($('div.item').last()[0])-1;number++){
      bananas_container = bananas_container_array.eq(number);
      
      for (i = 1; i < number+1; i++ ) {
       banana_item.clone().attr('id', "banana_svg_"+number+"_"+i).appendTo(bananas_container);
      }
      
      for (i = number+1; i < 30; i++ ) {
        returned_item = banana_item.clone().attr('id', "banana_svg_"+number+"_"+i).appendTo(bananas_container);
        returned_item.css("opacity",'0.5');
      }
      //fit background of next item
      next_item_number=number+1;
      video = document.getElementById("myVideo_"+next_item_number);
      if(video != null){
        //video.addEventListener('onloaded', function() { this.play(); } );
        context = document.getElementById("myCanvas_"+next_item_number).getContext("2d");
        context.drawImage(video, 0, 0, 1, 1);
        pixelData = context.getImageData(0, 0, 1, 1).data;
        $('.active').next().css('background',"rgb('+pixelData[0]+','+pixelData[1]+','+pixelData[2]+')'");
      }
    }
    //handle variables hande fade of start button 
    myLastDate = new Date();
    grade_concept = 0;
    grade_business_readiness = 0;
    grade_tech_readiness = 0;
    grade_design = 0;
    BrowserDetection();
    user_version = Math.round(Math.random());
    if ( user_version == 1){
      $('.item footer').addClass('not_hidden_class');

    }
    change_texture();
    //TODO add animation
    $('.circle_2, .content_start').hide("scale");
    $('.circle').hide("scale",function(){
      $('#myCarousel').carousel('next');
      $('#myCarousel').carousel('pause');
    });
    play_video('1');
  }) 
});


$(document).ready(function () {
	$('.small_circle').click(
	  function(){
		 	var myNewDate = new Date();
		 	var response_duration = myNewDate-myLastDate;
		 	myLastDate = myNewDate;
  		var question_id = $('div.item').index($('div.active')[0]);
  		var response_value = $(this)[0].innerText;
  		var user_id = $('#data_container').attr('data-user_id');
		  var params = {user_version:user_version, question_id:question_id, response_value:response_value, user_id:user_id, response_duration:response_duration};			

      switch ($('.active').attr('data-grade_type')){
        case "concept": 
          grade_concept = grade_concept + $('.active').attr('data-weight') * response_value;
          break;
        case "business": 
          grade_business_readiness = grade_business_readiness + $('.active').attr('data-weight') * response_value;
          break;
        case "tech": 
          grade_tech_readiness = grade_tech_readiness + $('.active').attr('data-weight') * response_value;
          break;
        case "design": 
          grade_design = grade_design + $('.active').attr('data-weight') * response_value;
          break;

        default: 
          console.log("Unknown question type");
          break;
      }

      //Checking grades
      /*
      console.log(grade_concept);
      console.log(grade_business_readiness);
      console.log(grade_tech_readiness);
      console.log(grade_design);
*/
      if ( $('div.item').last().is($('div.active').next())){
        calc_grades();
      }
      else{
        play_video(question_id+1);
      }

			$.ajax({
			    url : "answer",
			    type: "POST",
			    data : params
			});
      change_texture();
		}
	)
});

$(document).ready(function (){

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
  });
});

function play_video(next_item_number){
  video = document.getElementById("myVideo_"+next_item_number);
      if(video != null){
        video.play();
      }
}

function change_texture(){
  next_page_backgound_is_yellow = $('.active').next().hasClass('yellow');
  current_texture_is_yellow = $('#myTexture').hasClass('texture_image_class_yellow');
  console.log(next_page_backgound_is_yellow);
  console.log(current_texture_is_yellow);
  if(next_page_backgound_is_yellow && current_texture_is_yellow){
    $('#myTexture').addClass('texture_image_class_blue')
    $('#myTexture').removeClass('texture_image_class_yellow')
  }
  if(!current_texture_is_yellow && !next_page_backgound_is_yellow){
    $('#myTexture').addClass('texture_image_class_yellow')
    $('#myTexture').removeClass('texture_image_class_blue')
  }
}


function calc_grades(){


  //calculate seprate grades
  final_grade_concept = Math.round(100*grade_concept / 24);//64
  final_grade_business_readiness = Math.round(100*grade_business_readiness / 75);//102.5
  final_grade_tech_readiness = Math.round(100*grade_tech_readiness / 36);//52.5
  final_grade_design = Math.round(100*grade_design / 6);//27.5
  
  // console.log("final_grade_concept =" + final_grade_concept);
  // console.log("final_grade_business_readiness =" + final_grade_business_readiness);
  // console.log("final_grade_tech_readiness =" + final_grade_tech_readiness);
  // console.log("final_grade_design =" + final_grade_design);
  
  total_ring_weight = final_grade_concept + final_grade_business_readiness + final_grade_tech_readiness + final_grade_design;
  
  // console.log("total_ring_weight =" + total_ring_weight);
  
  //calculate percentage of each grade from total ring
  final_grade_concept_arc_size = Math.round(360*final_grade_concept/total_ring_weight);
  final_grade_business_readiness_arc_size = Math.round(360*final_grade_business_readiness/total_ring_weight);
  final_grade_tech_readiness_arc_size = Math.round(360*final_grade_tech_readiness/total_ring_weight);     
  final_grade_design_arc_size = Math.round(360*final_grade_design/total_ring_weight);

  // console.log("final_grade_concept_arc_size =" + final_grade_concept_arc_size);
  // console.log("final_grade_business_readiness_arc_size =" + final_grade_business_readiness_arc_size);
  // console.log("final_grade_tech_readiness_arc_size =" + final_grade_tech_readiness_arc_size);
  // console.log("final_grade_design_arc_size =" + final_grade_design_arc_size);

  //fix to match 100% of ring
 // console.log("before final_grade_concept_arc_size =" + final_grade_concept_arc_size);
  final_grade_concept_arc_size = final_grade_concept_arc_size + 360 - ( final_grade_concept_arc_size + final_grade_business_readiness_arc_size + final_grade_tech_readiness_arc_size + final_grade_design_arc_size);
//  console.log("after final_grade_concept_arc_size =" + final_grade_concept_arc_size);


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

    ctx.font = "normal 1.7em 'geared_slabregular'";
    for (var i=0;i<4;i++){
      x_pos.push(Math.sin(angles[i]/180*Math.PI));
      y_pos.push((-1)*Math.cos(angles[i]/180*Math.PI));
      

      if(angles[i]<=180){
        final_x[i] = 2*canvas_width-canvas_width/3;
        final_x_text[i] = 2*canvas_width-canvas_width/3.3;
        grade_factor_x[i]=-1;
        grade_factor_y[i]=(angles[i]<=90?-1:1);
      }
      else{
        final_x[i] = canvas_width/3.5;
        final_x_text[i] = canvas_width/3.5-1.3*ctx.measureText(line_text[i]).width;
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
      ctx.font = "normal 2em 'geared_slabregular'";
      ctx.fillStyle = line_color[i];
      ctx.fillText(line_text[i], final_x_text[i],canvas_height+radius*y_pos[i]);
      ctx.font = "normal 3em 'geared_slabregular'";
      ctx.fillStyle = line_grade_color[i];
      ctx.fillText(line_grade[i], canvas_width+(radius+grade_factor_x[i]*ctx.measureText(line_grade[i]).width/2)*x_pos[i],canvas_height+(radius+grade_factor_y[i]*ctx.measureText("00").width/2)*y_pos[i]);
    }
    ctx.fillStyle = "#e1cb34";
    ctx.font = "normal 6em 'geared_slabregular'";

    ctx.fillText(total_grade, canvas_width-ctx.measureText(total_grade).width/2  ,canvas_height);
    ctx.font = "normal 3em 'geared_slabregular'";
    ctx.fillText("Ready", canvas_width-ctx.measureText("Ready").width/2  ,canvas_height+1.3*ctx.measureText("00").width);
    
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

  }
  //Check if browser is Opera or not
  else if (navigator.userAgent.search("Opera") >= 0) {

  }
}