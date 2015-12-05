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







//d3.select('svg').append('add');

//collision detection


