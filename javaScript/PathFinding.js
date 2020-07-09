var canvas=document.getElementById("MyCanvas");
canvas.width=1220;
canvas.height=620;
var c=canvas.getContext("2d");
c.fillStyle="black";

var map=new Array(1891);

function wait(ms){return new Promise(resolve=>setTimeout(resolve,ms))}

function random(v,lenght){return v[Math.floor(Math.random()*lenght)];}

function clearMap()
{
 c.fillStyle="white";
 c.fillRect(0,0,1220,620);
 c.fillStyle="red";
	c.fillRect(0,0,20,20);
	c.fillRect(1200,600,20,20);
 c.fillStyle='black'
 let i;
 for(i=0;i<1891;i++)
 	if(map[i]==900)c.fillRect(i%61*20,Math.floor(i/61)*20,20,20);

}
function mazeGenerator(start)
{

	c.fillStyle="red";
	c.fillRect(0,0,20,20);
	c.fillRect(1200,600,20,20);
	let stack=Array(1), father=Array(72),dir=Array(3),visited=0,rand,ok,i; stack[0]=start; 
	c.fillStyle="black";

	for(i=0;i<72;i++)
    father[i]=-1;

    father[start]=start;

	while(visited<71)
	{
    left=stack[0]-1;
  	up=stack[0]-12;
  	down=stack[0]+12;
  	right=stack[0]+1;

  	i=0;
     
     if(stack[0]%12-1>=0)
     	if(father[left]==-1)dir[i++]=left;

     if(up>=0)
     	if(father[up]==-1)dir[i++]=up;

     if(down<72)
     	if(father[down]==-1)dir[i++]=down;

     if(stack[0]%12+1<12)
     	if(father[right]==-1)dir[i++]=right;

     rand=random(dir,i);
    if(i==0)stack.shift();
    else
    {
    father[rand]=stack[0];
    stack.unshift(rand);
    visited++;	
	}}
     for(i=0;i<72;i++)
     {
    left=i-1;
  	up=i-12;
  	down=i+12;
  	right=i+1;

     if(i%12-1>=0)
     	if(father[left]!=i&&father[i]!=left)
     		{
     			c.fillRect(i%12*100,Math.floor(i/12)*100,20,120);
     			for(ok=0;ok<=5;ok++)map[i%12*5+(Math.floor(i/12)*5+ok)*61]=900;
     		}

     if(up>=0)
     	if(father[up]!=i&&father[i]!=up)
     		{
     			c.fillRect(i%12*100,Math.floor(i/12)*100,120,20);
                for(ok=0;ok<=5;ok++)map[i%12*5+ok+(Math.floor(i/12)*5)*61]=900;
     		}

     if(down<72)
     	if(father[down]!=i&&father[i]!=down)
     		{
     			c.fillRect(i%12*100,Math.floor(i/12)*100+100,120,20);
     			for(ok=0;ok<=5;ok++)map[i%12*5+ok+(Math.floor(i/12)*5+5)*61]=900;
     		}

     if(i%12+1<12)
     	if(father[right]!=i&&father[i]!=right)
     		{
     			c.fillRect(i%12*100+100,Math.floor(i/12)*100,20,120);
     			for(ok=0;ok<=5;ok++)map[i%12*5+5+(Math.floor(i/12)*5+ok)*61]=900;
     		}
     }
     return stack[0];
	}


async function dijkstra(start,finish)
{
	clearMap();
  let father=new Array(1891),nodesToVisit=[start],nodesToVisitLenght=1,found=0;
  let up,left,down,right;

  for(i=0;i<1891;i++)
    father[i]=-1;

  father[start]=start;
  c.fillStyle='blue';

  while(nodesToVisitLenght!=0&&found!=1)
  {

  	left=nodesToVisit[0]-1;
  	up=nodesToVisit[0]-61;
  	down=nodesToVisit[0]+61;
  	right=nodesToVisit[0]+1;

    if(nodesToVisit[0]%61-1>=0&&map[left]!=900&&father[left]==-1)
    {
      nodesToVisit.push(left);
      nodesToVisitLenght++;
      father[left]=nodesToVisit[0];
      c.fillRect((left%61)*20+3,Math.floor(left/61)*20+3,14,14);
  	  await wait(7);
      if(left==finish)break;
    }
    if(up>=0&&map[up]!=900&&father[up]==-1)
    {
      nodesToVisit.push(up);
      nodesToVisitLenght++;
      father[up]=nodesToVisit[0];
      c.fillRect((up%61)*20+3,Math.floor(up/61)*20+3,14,14);
  	  await wait(7);
      if(up==finish)break;
    }
    if(down<1891&&map[down]!=900&&father[down]==-1)
    {
      nodesToVisit.push(down);
      nodesToVisitLenght++;
      father[down]=nodesToVisit[0];
      c.fillRect((down%61)*20+3,Math.floor(down/61)*20+3,14,14);
  	  await wait(7);
      if(down==finish)break;
    }
    if(nodesToVisit[0]%61+1<61&&map[right]!=900&&father[right]==-1)
    {
      nodesToVisit.push(right);
      nodesToVisitLenght++;
      father[right]=nodesToVisit[0];
      c.fillRect((right%61)*20+3,Math.floor(right/61)*20+3,14,14);
  	  await wait(7);
      if(right==finish)break;
    }
    nodesToVisit.shift();
    nodesToVisitLenght--;
  }
  c.fillStyle='yellow';
  
  while(start!=finish)
  {
  	c.fillRect((finish%61)*20,Math.floor(finish/61)*20,20,20);
  	await wait(20);
  	finish=father[finish];
  }
}

async function A_Star(start,finish)
{
clearMap();
 let father=new Array(1891),cost=new Array(1891),nodesToVisit=[start],nodesToVisitLenght=1,found=0,max,aux;
 let up,left,down,right,i,min,minPoz;

 for(i=0;i<1891;i++)
    father[i]=-1;

 father[start]=start; cost[start]=0;

 while(nodesToVisitLenght!=0&&found!=1)
 {
 	min=cost[nodesToVisit[0]]; minPoz=nodesToVisit[0]; max=Math.abs(start%61-nodesToVisit[0]%61)+Math.abs(Math.floor(start/61)-Math.floor(nodesToVisit[0]/61));

  for(i=0;i<nodesToVisitLenght;i++)
    {
    	if(min>cost[nodesToVisit[i]])
     {
     	min=cost[nodesToVisit[i]];
     	minPoz=nodesToVisit[i];
     	aux=i;
     }
        if(min==cost[nodesToVisit[i]]&&max<Math.abs(start%61-nodesToVisit[i]%61)+Math.abs(Math.floor(start/61)-Math.floor(nodesToVisit[i]/61)))
     {
     	max=Math.abs(start%61-nodesToVisit[i]%61)+Math.abs(Math.floor(start/61)-Math.floor(nodesToVisit[i]/61));
     	minPoz=nodesToVisit[i];
     	aux=i;
     }
 }

	left=minPoz-1;
  	up=minPoz-61;
  	down=minPoz+61;
  	right=minPoz+1;

  	c.fillStyle='blue';
  	c.fillRect((minPoz%61)*20+3,Math.floor(minPoz/61)*20+3,14,14);
  	await wait(4);

    if(minPoz%61-1>=0&&map[left]!=900)
    {
    	cost[left]=Math.abs(start%61-left%61)+Math.abs(Math.floor(start/61)-Math.floor(left/61))+Math.abs(finish%61-left%61)+Math.abs(Math.floor(finish/61)-Math.floor(left/61));
    	if(father[left]==-1)
     {
      nodesToVisit.push(left);
      nodesToVisitLenght++;
      father[left]=minPoz;
      c.fillStyle='purple';
      c.fillRect((left%61)*20+3,Math.floor(left/61)*20+3,14,14);
  	  await wait(4);
     }
      if(left==finish)break;
    }

    if(up>=0&&map[up]!=900)
    {
    	cost[up]=Math.abs(start%61-up%61)+Math.abs(Math.floor(start/61)-Math.floor(up/61))+Math.abs(finish%61-up%61)+Math.abs(Math.floor(finish/61)-Math.floor(up/61));
    	if(father[up]==-1)
      {
      nodesToVisit.push(up);
      nodesToVisitLenght++;
      father[up]=minPoz;
      c.fillStyle='purple';
      c.fillRect((up%61)*20+3,Math.floor(up/61)*20+3,14,14);
  	  await wait(4);
     }
      if(up==finish)break;
    }

    if(down<1891&&map[down]!=900)
    {
      cost[down]=Math.abs(start%61-down%61)+Math.abs(Math.floor(start/61)-Math.floor(down/61))+Math.abs(finish%61-down%61)+Math.abs(Math.floor(finish/61)-Math.floor(down/61));
      if(father[down]==-1)
      {
      nodesToVisit.push(down);
      nodesToVisitLenght++;
      father[down]=minPoz;
      c.fillStyle='purple';
      c.fillRect((down%61)*20+3,Math.floor(down/61)*20+3,14,14);
  	  await wait(4);
      }
      if(down==finish)break;
    }

    if(minPoz%61+1<61&&map[right]!=900)
    {
      cost[right]=Math.abs(start%61-right%61)+Math.abs(Math.floor(start/61)-Math.floor(right/61))+Math.abs(finish%61-right%61)+Math.abs(Math.floor(finish/61)-Math.floor(right/61));
      if(father[right]==-1)
      {
      nodesToVisit.push(right);
      nodesToVisitLenght++;
      father[right]=minPoz;
      c.fillStyle='purple';
      c.fillRect((right%61)*20+3,Math.floor(right/61)*20+3,14,14);
  	  await wait(4);
     }
      if(right==finish)break;
    }
    nodesToVisit[aux]=nodesToVisit[0];
    nodesToVisit[0]=minPoz;

    nodesToVisit.shift();
    nodesToVisitLenght--;

 }
 c.fillStyle='yellow';
  while(start!=finish)
  {
   	c.fillRect((finish%61)*20,Math.floor(finish/61)*20,20,20);
  	await wait(20);
  	finish=father[finish];
  }
  c.fillRect((finish%61)*20,Math.floor(finish/61)*20,20,20);
} 

mazeGenerator(0);

var newMaze=document.getElementById("New Maze");
newMaze.type="button";
newMaze.addEventListener('click',()=>{window.location.reload();});

var dijkstras=document.getElementById("Dijkstra's");
dijkstras.type="button";
dijkstras.addEventListener('click',()=>{dijkstra(0,1890);});

var a=document.getElementById("A*");
a.type="button";
a.addEventListener('click',()=>{A_Star(0,1890);});

var reset=document.getElementById("Reset Maze");
reset.type="button";
reset.addEventListener('click',()=>{clearMap();});