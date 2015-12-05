// start slingin' some d3 here.

//objects that move from one position to another randomly
var main = d3.select('body').append('svg')
  .attr('width', 1000)
  .attr('height', 1000);




// var makeCircle = function (x, y) {
//   d3.select('svg').append('circle')
//   .attr('cx', x)
//   .attr('cy', y)
//   .attr('r', 15);
// };

// made an array of objects with a x y and r value
// entered array into the select all
var numberOfCircles = function(number){
  var result = [];
  for(var i = 0; i < number; i++){
    var randomX = Math.random()*950
    var randomY = Math.random()*950
    var circleAttributes = {};
    var height = randomY;
    var width = randomX;
    circleAttributes.cx = width;
    circleAttributes.cy = height;
    circleAttributes.r = 10;
    result.push(circleAttributes);
  }
  return result;
}
//array of objects of circle attributes
var enemies = numberOfCircles(20);

d3.select('svg').append('g').selectAll('circle').data(enemies)
  .enter()
  .append('circle')
  .attr('cx', function(d){ return d.cx })
  .attr('cy', function(d){ return d.cy})
  .attr('r', function(d){ return d.r})
  

//d3.select('svg').append('add');

//collision detection


