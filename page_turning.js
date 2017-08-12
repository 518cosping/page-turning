var len = $('.pageNum > a').length;
		var lastIndex = 0;
		var $_a = $('.pageNum > a');
		var $_li = $('.pane > li');
		var key_o = true;
		var key_t = true;


        
		// 显示上一页，下一页，函数
		var show = function(){
			if($_a.eq(0).css('font-weight') !== 'bold'){
				$('.prev').html('上一页').css({'cursor':'pointer'});
				key_o = true;
			}
			if($_a.eq(0).css('font-weight') == 'bold'){
				$('.prev').html('').css({'cursor':'default'})
				key_o = false;
			}
			if($_a.eq(len - 1).css('font-weight') !== 'bold'){
				$('.next').html('下一页').css({'cursor':'pointer'});
				key_t = true;
			}
			if($_a.eq(len - 1).css('font-weight') == 'bold'){
				$('.next').html('').css({'cursor':'default'});
				key_t = false;
			}
		}

		//显示首尾页函数

		var show_p_l = function(){
			if($_a.eq(len-1).html() < 25){
				$('.last').html('尾页').css({'cursor' : 'pointer'})
			}
			if($_a.eq(len - 1).html() == 25){
				$('.last').html('').css({'cursor' : 'default'});				
			}
			if($_a.eq(0).html() > 1){
                console.log(1)
				$('.first').html('首页').css({'cursor' : 'pointer'})
			} 
			if($_a.eq(0).html() == 1){
				$('.first').html('').css({' cursor' : 'default'});				
			}
		}
		// 点击下一页
		$('.next').on('click',function(){
            show();
			if(key_t){
				if(lastIndex < 2 || $_a.eq(lastIndex).html() > 22){
					change_f_l('next');				
					show();
				}else if($_a.eq(lastIndex).html() < 23){
					change_m(1);
					$_a.eq(lastIndex).html() > 22 ? $('.last').html('').css({'cursor':'default'}) : '';
				}
			}		
            show_p_l();
		})
		// 点击上一页
		$('.prev').on('click',function(){
			if(key_o){	
				console.log(lastIndex)
				if(lastIndex < 2 || $_a.eq(lastIndex).html() > 23 || $_a.eq(lastIndex).html() < 4){
					change_f_l('prev');
					show();
				}else if($_a.eq(lastIndex).html() < 24){
					change_m(-1);
					$_a.eq(lastIndex).html() < 4 ? $('.first').html('').css({'cursor':'default'}) : '';				
				}							
			}
		})
		
		//点击首页跳转
		$('.first').on('click',function(){
			for(var i = 0; i < len; i ++){
				$_a.eq(i).html(i + 1);
			}
			change_f_l('first');
			show();
			show_p_l();
		})

		//点击尾页跳转
		$('.last').on('click',function(){
			for(var i = 0; i < len; i ++){
				$_a.eq(i).html(21 + i);
			}
			change_f_l('last');
			show();
			show_p_l();
		})

		// 点击上下翻页,页数数字变换.
		var change_f_l = function(direction){
			$_a.removeClass('active');
			$_li.removeClass('active');
			if(direction == 'first' && direction){
				lastIndex = 0;
			}else if(direction == 'last' && direction){
				lastIndex = len - 1;
			}else if(direction == 'next' && direction){
				lastIndex += 1;
			}else if(direction == 'prev' && direction){
				lastIndex -= 1;
			}else if(direction == 4 && direction){
				lastIndex = 4;
			}else if(direction == 3 && direction){
				lastIndex = 3;
			}else if(direction == 2 && direction){
				lastIndex = 2;
			}else if(direction == 1 && direction){
				lastIndex = 1;
			}else if(direction == 0){
				lastIndex = 0;
			}
			$_a.eq(lastIndex).addClass('active');
			$_li.eq(lastIndex).addClass('active');
			if(direction == 'last'){
				lastIndex = 4;
			}else if(direction == 'first'){
				lastIndex = 0;
			}
		}

		// 中间数字变换
		var change_m = function(direction){
			for(var i = 0; i < len; i ++){
				var a = $_a.eq(i).html();
				$_a.eq(i).html( (parseInt(a) + direction) );
			}
		}

		//点击数字
		$_li.on('click', function(){
			if( ($_a.eq(0).html() == 1 && $_a.eq(1).html() == 2 ) && $(this).index() < 3 ){
				change_f_l($(this).index());
			}else if( ( $_a.eq(len-1).html() == 25 && $_a.eq(len-2).html() == 24 ) && $(this).index() >= 2 ){
				change_f_l($(this).index());
			}else if($(this).index() > 2 && $_a.eq(len-1).html() < 25){
				if($_a.eq(len-1).html() != 24){					
					for(var i = 0; i < len; i ++){
						var a = $_a.eq(i).html();
						$_a.eq(i).html( parseInt(a) + ($(this).index() - 2) );
					}
					change_f_l(2);
				}else if($_a.eq(len-1).html() == 24){
					if($(this).index() == 4){
						change_f_l(3);
					}
					if($(this).index() == 3){
						change_f_l(2);
					}
					for(var i = 0; i < len; i ++){
						var a = $_a.eq(i).html();
						$_a.eq(i).html( parseInt(a) + ($(this).index() - lastIndex) );
					}
				}

			}else if($(this).index() < 2 && $_a.eq(0).html() > 1){
				if($_a.eq(0).html() != 2){					
					for(var i = 0; i < len; i ++){
						var a = $_a.eq(i).html();
						$_a.eq(i).html( parseInt(a) -(2 - $(this).index()) );
					}
					change_f_l(2);
				}else if($_a.eq(0).html() == 2){
					if($(this).index() == 1){
						change_f_l(2);
					}
					if($(this).index() == 0){
						change_f_l(1)
					}
					for(var i = 0; i < len; i ++){
							var a = $_a.eq(i).html();
							$_a.eq(i).html( parseInt(a) - ( lastIndex - $(this).index() ) );
						}
				}
			}
			show();
			show_p_l();
		})