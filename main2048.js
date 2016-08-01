var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function(){
	
	prepareForMobiel();
	newgame();
	onloaded();
});
//window.onload = function  () {
	// body...
function onloaded(){
	var gridid = document.getElementById("grid-container");
	gridid.addEventListener('touchstart',function(event){
		startX = event.touches[0].pageX;
		startY = event.touches[0].pageY;
	});

	gridid.addEventListener('touchmove',function(event){
		 event.preventDefault();
	});


	gridid.addEventListener('touchend',function(event){
		endX = event.changedTouches[0].pageX;
		endY = event.changedTouches[0].pageY;

		var deltaX = endX - startX;
		var deltaY = endY - startY;

		if( Math.abs( deltaX ) < 0.3*documentWidth && Math.abs( deltaY ) < 0.3*documentWidth ){
		 	return;
		 }

		if(Math.abs(deltaX) >= Math.abs(deltaY) ){//moveX
			if(deltaX > 0 ){
				//moveright
				if( moveRight() ){
	                setTimeout("generateOneNumber()",210);
	                setTimeout("isgameover()",300);
	            }

			}
			else{
				//moveleft
				if( moveLeft() ){
				    setTimeout("generateOneNumber()",210);
				    setTimeout("isgameover()",300);
				}
			}
		}
		else{//moveY
			if(deltaY > 0){
				//movedown
				if( moveDown() ){
				    setTimeout("generateOneNumber()",210);
				    setTimeout("isgameover()",300);
				}
			}
			else{
				//moveup
				if( moveUp() ){
				    setTimeout("generateOneNumber()",210);
				    setTimeout("isgameover()",300);
				}	
			}
		}
	});

}


function newgame(){
	init();
	generateOneNumber();
	generateOneNumber();


}

function init(){
	for(var i = 0;i<4;i++){
		for (var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-"+i+"-"+j);
			
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		};

	}
	for (var i = 0;i<4;i++){
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for (var j = 0;j<4;j++){
		board[i][j] = 0;
		hasConflicted[i][j] = false;
		
		}

	}

	updateBoardView();

	 score = 0;
    $('#score').text( score );

}


function updateBoardView(){
	$(".number-cell").remove();
	for(var i = 0;i<4;i++){
		for(var j = 0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id = "number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			//console.log(board[i][j])
			if (board[i][j] == 0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2);
			}
			else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css({
					'background':getNumberBackgroundImg(board[i][j]),
					'background-repeat':'no-repeat',
					'background-size':'cover'
				});
				//theNumberCell.css('background-repeat',"no-repeat");
				//theNumberCell.css('background-size',"cover");
				//theNumberCell.css('-webkit-background-size',"cover");
				//theNumberCell.css('-moz-background-size',"cover");
				//theNumberCell.css('background',getNumberBackgroundColor(board[i][j]));
				//theNumberCell.css('background',getNumberBackgroundColor(board[i][j]));
	
				//theNumberCell.css('color',getNumberColor(board[i][j]));
				//theNumberCell.text(board[i][j]);
			}
			 hasConflicted[i][j] = false;
		}

	}
}

function nospace(board){

	for(var i = 0;i<4;i++){
		for(var j = 0;j<4;j++){
			if (board[i][j] == 0){
				return false;

			}
			

		}
	}
	return true;
}

function generateOneNumber(){
	if (nospace(board)) {
		return false;
	};
	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	var time = 0 
	while(time < 50){
		if(board[randx][randy] == 0)
		break;
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));
		time++;
	}
	if(time == 50){
		for( var i = 0 ; i < 4 ; i ++ )
		    for( var j = 0 ; j < 4 ; j ++ ){
		        if( board[i][j] == 0 ){
		            randx = i;
		            randy = j;
		        }
		    }


	}
	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2:4;
	//在随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
}

$(document).keydown(function(event){
	switch (event.keyCode){
		case 37: //left
		event.preventDefault();
            if( moveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38: //up
        event.preventDefault();
            if( moveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39: //right
        event.preventDefault();
            if( moveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40: //down
        event.preventDefault();
            if( moveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
		break;
		default:
		break;
	}

});
function isgameover(){
	if(nospace(board) && noMove(board)){
		alert("你咋这么厉害捏!!!");
	}

}



function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
	else {
		//moveleft
		 for( var i = 0 ; i < 4 ; i ++ ){
			for(var j = 1;j<4;j++){
				if(board[i][j] != 0){
					for(var k = 0;k<j;k++){
						if(board[i][k] ==0 && noBlockHorizontal(i,k,j,board)){
							//move
							showMoveAnimation(i,j,i,k);
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
							//move
							showMoveAnimation(i,j,i,k);

							board[i][k] += board[i][j];
							board[i][j] = 0;
							score += board[i][k];
							updateScore( score );

							hasConflicted[i][k] = true;
							continue;

						
						} 

					}

				}
			}
				

		}
			setTimeout("updateBoardView()",200);
			return true;
	}
}



function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	else {
		//moveright
		 for( var i = 0 ; i < 4 ; i ++ ){
			for(var j = 2;j>=0;j--){
				if(board[i][j] != 0){
					for(var k = 3;k>j;k--){
						if(board[i][k] ==0 && noBlockHorizontal(i,j,k,board)){
							//move
							showMoveAnimation(i,j,i,k);
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
							//move
							showMoveAnimation(i,j,i,k);

							board[i][k] *= 2;
							board[i][j] = 0;
							score += board[i][k];
							updateScore( score );

							hasConflicted[i][k] = true;
							continue;

						
						} 

					}

				}
			}
				

		}
			setTimeout("updateBoardView()",200);
			return true;
	}
}

function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	else {
		//moveup
		 for( var j = 0 ; j < 4 ; j ++ ){
			for(var i = 1;i<4;i++){
				if(board[i][j] != 0){
					for(var k = 0;k<i;k++){
						if(board[k][j] ==0 && noBlockVertical(j,k,i,board)){
							//move
							showMoveAnimation(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
							//move
							showMoveAnimation(i,j,k,j);

							board[k][j] *= 2;
							board[i][j] = 0;
							score += board[k][j];
							updateScore( score );

							hasConflicted[k][j] = true;
							continue;

						
						} 

					}

				}
			}
				

		}
			setTimeout("updateBoardView()",200);
			return true;
	}
}



function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	else {
		//movedown
		 for( var j = 0 ; j < 4 ; j ++ ){
			for(var i = 2;i>=0;i--){
				if(board[i][j] != 0){
					for(var k = 3;k>i;k--){
						if(board[k][j] ==0 && noBlockVertical(j,i,k,board)){
							//move
							showMoveAnimation(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
							//move
							showMoveAnimation(i,j,k,j);

							board[k][j] *= 2;
							board[i][j] = 0;
							score += board[k][j];
							updateScore( score );

							hasConflicted[k][j] = true;
							continue;

						
						} 

					}

				}
			}
				

		}
			setTimeout("updateBoardView()",200);
			return true;
	}
}


