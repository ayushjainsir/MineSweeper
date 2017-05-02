/**
 * Created by jainsir on 4/24/2017.
 */
var s={row: 10,
    col: 10,
    height: 30,
    width: 30
};
var nearest=[[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]];
var box;
var bomb;
var num;
var zero;
var flag;
var lvl=10;
var bombxy=[];
var isbomb = new Array(s.row);
for (var i = 0; i < s.row; i++) {
    isbomb[i] = new Array(s.col);
}
var grid=new Array(s.row+2);
for(var i=0;i<s.row+2;i++){
    grid[i]=new Array(s.col+2);
    grid[i].fill(0);
}
function init(){
    box = new Image();
    bomb = new Image();
    flag=new Image();
    flag.src="images/flag.png";
    bomb.src="images/bomb_4.png";
    box.src = "images/Box_Green.png";
    num= new Image();
    num.src = "images/yellow_box.png";
    zero =new Image();
    zero.src = "images/white_box.png";
    drawCanvas();
}

window.onload = function () {
        var canvas=document.getElementById("canvas");
        c=canvas.getContext("2d");
        init();

    }
window.oncontextmenu = function (e) {
    e.preventDefault();
    var x=e.pageX;
    var y=e.pageY;
    if(Math.floor(x/s.width)<s.col&&Math.floor(y/s.height)<s.row) {
        var boxx = Math.floor(x / s.width);
        var boxy = Math.floor(y / s.height);
        c.drawImage(flag,boxx*s.width,boxy*s.height);
    }

}
window.onclick = function (e) {
       var x=e.pageX;
    var y=e.pageY;
    if(Math.floor(x/s.width)<s.col&&Math.floor(y/s.height)<s.row){
        var boxx=Math.floor(x/s.width);
        var boxy=Math.floor(y/s.height);
        if(isbomb[Math.floor(x/s.width)][Math.floor(y/s.height)]){
                for(var i=0;i<s.row;i++){
                    for(var j=0;j<s.col;j++){
                        if(isbomb[j][i])
                        c.drawImage(bomb,j*s.width,i*s.height);
                    }
            }

        }
        else{
            if(grid[boxx+1][boxy+1]>0){
                c.drawImage(num,boxx*s.width,boxy*s.height);
                c.font = "20px arial"
                c.fillText(grid[boxx+1][boxy+1],boxx*s.width+10,boxy*s.height+20);
            }
            else if(grid[boxx+1][boxy+1]==0){
                c.drawImage(zero,boxx*s.width,boxy*s.height);
                openzero(boxx+1,boxy+1);
            }
        }
    }
}
function openzero(x,y) {
    if(x>=1&&x<=s.col&&y>=1&&y<=s.row){
    if(grid[x][y]==0){
        grid[x][y]=-2;
        for (var i = 0; i < 8; i++) {
            if (grid[x + nearest[i][0]][y + nearest[i][1]] === 0) {
                openzero(x+nearest[i][0],y+nearest[i][1]);
                c.drawImage(zero, (x + nearest[i][0]-1) * s.width, (y + nearest[i][1]-1) * s.height);
            }
            else if(grid[x + nearest[i][0]][y + nearest[i][1]]>0){
                c.drawImage(num,(x + nearest[i][0]-1)*s.width,(y + nearest[i][1]-1)*s.height);
                c.font = "20px arial"
                c.fillText(grid[x + nearest[i][0]][y + nearest[i][1]],(x + nearest[i][0]-1)*s.width+10,(y + nearest[i][1]-1)*s.height+20);
            }
        }
    }

    }
}



function drawCanvas(){

    c.clearRect(0,0,400,400);
    for(var i=0;i<s.row;i++){
        for(var j=0;j<s.col;j++){

            var x=j*s.width;
            var y=i*s.height;
            c.drawImage(box,x,y);
            if(Math.floor(Math.random()*100)%lvl==0){
                bombxy.push(new Array(j,i));
                isbomb[j][i]=true;
                grid[j+1][i+1]=-1;
               // c.drawImage(bomb,j*s.width,i*s.height);
            }
        }
    }
    for(var i=1;i<=s.row;i++){
        for(var j=1;j<=s.col;j++){
            countbomb(j,i);
        }

    }
    console.log(grid);
}
function countbomb(x, y) {
    var c=0;
    if(grid[x][y]!=-1) {
        for (var i = 0; i < 8; i++) {
            if (grid[x + nearest[i][0]][y + nearest[i][1]] === -1)
                c++;
        }
        grid[x][y] = c;
    }
}