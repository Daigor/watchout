// start slingin' some d3 here.

//objects that move from one position to another randomly
var main = d3.select('body').append('svg')
  .attr('width', 700)
  .attr('height', 700);





// made an array of objects with a x y and r value
// entered array into the select all
var numberOfCircles = function(number){
  var result = [];
  for(var i = 0; i < number; i++){
    var randomX = Math.random()*650
    var randomY = Math.random()*650
    var circleAttributes = {};
    circleAttributes.cx = randomX;
    circleAttributes.cy = randomY;
    result.push(circleAttributes);
  }
  return result;
}
//array of objects of circle attributes
var enemies = numberOfCircles(20);

var circles = d3.select('svg').selectAll('image').data(enemies)
  .enter()
  .append('image')
  .attr('x', function(d){ return d.cx })
  .attr('y', function(d){ return d.cy })
  .attr('height', '20px')
  .attr('width', '20px')
  .attr('xlink:href', 'asteroid.png');

var drag = d3.behavior.drag()
  .on('dragstart', function() {
    player.style('fill', 'blue')
  })
  .on('drag', function() {
    player.attr('cx', d3.event.x)
      .attr('cy', d3.event.y)
  })
  .on('dragend', function() {
    player.style('fill', 'red')
  });


var player = d3.select('svg')
    .append('circle')
    .attr('cx', 250)
    .attr('cy', 250)
    .attr('r', 15)
    .style('fill', 'red')
    .call(drag);

var move = function() {
    circles
      .transition()
      .duration(2000)
      .attr('x', function(){return Math.random()*650})
      .attr('y', function(){return Math.random()*650})
      .each('end', move)
};
move();


var increaseScore = function() {
  var curScore = d3.select('.current').select('span');
  var oldScore = curScore.text();
  oldScore = parseInt(oldScore, 10) + 1;
  curScore.text(oldScore);
};

var throttle = function () {
  var called = false;
  var collisionTag = d3.select('.collisions').select('span');
  return function() {
    if (!called) {
      collisionTag.text(parseInt(collisionTag.text(), 10) + 1);
      called = true;
      setTimeout(function() { return called = false;}, 1000);
    }
  };
  increment(); 
}
var func = throttle();

var collisions = function(){
  var matrix = circles[0]
  var playerX = player[0][0].attributes.cx.value;
  var playerY = player[0][0].attributes.cy.value;
  for(var i = 0; i < matrix.length; i++){
    var asteroid = matrix[i];
    var xCoord = asteroid.attributes.x.value;
    var yCoord = asteroid.attributes.y.value;
    // Math.pow(playerX - xCoord, 2) + Math.pow(playerY - yCorrd, 2)
    // sqrt((pX - x)^2 + (py - y)^2)
    var distance = Math.sqrt(Math.pow((playerX - xCoord), 2) + Math.pow((playerY - yCoord), 2));
    if (distance < 25) {
      func();
      var highScore = d3.select('.high').select('span');
      var curScore = d3.select('.current').select('span'); 
      if (parseInt(highScore.text(), 10) < parseInt(curScore.text(), 10)) {
        highScore.text(parseInt(curScore.text(), 10));
      }
      curScore.text(0);
    }
  }

}
d3.timer(collisions);
setInterval(increaseScore, 200);

//d3.select('svg').append('add');

//collision detection


