function loadMyLogoCanvas() {

// Get a reference to the element.
var elem = document.getElementById('myLogoCanvas');

// Always check for properties and methods, to make sure your code doesn't break 
// in other browsers.
if (elem && elem.getContext) {
  // Get the 2d context.
  // Remember: you can only initialize one context per element.
  var context = elem.getContext('2d');
  if (context) {
    // You are done! Now you can draw your first rectangle.
    // You only need to provide the (x,y) coordinates, followed by the width and 
    // height dimensions.
    context.fillStyle   = '#FFFFFF';
    context.fillRect(0, 0, 150, 150);

    context.fillStyle   = '#0CBFFA'; // blue
    context.fillRect(0, 100, 150, 150);

    // context.fillStyle   = '#F50F91';  // pink
    context.fillStyle   = "rgba(242, 15, 145, 1)";  // pink
    //context.strokeStyle = '#F50F91'; // red
    //context.lineWidth   = 4;

    // Draw some rectangles.
    context.fillRect  (0,   0, 150, 150);	
	
	context.save();

	context.fillStyle    = "rgba(0,0,0,1)";
    context.font         = 'bold 40px sans-serif';
    context.textBaseline = 'top';
    context.fillText  ('FRAM', 30, 0);

	context.translate(150, 40);
	context.rotate(90.0001 * Math.PI/ 180); // BUG 90 doesn't work, nor 90.000
	
	context.fillStyle    = 'rgba(0,0,0,1)';
    context.font         = 'bold 40px sans-serif';
    context.textBaseline = 'top';
    context.fillText  ('SIA', 0, 0);
	
    context.rotate(-90.0001 * Math.PI/ 180);
	context.restore();

	// add an image cropped
	var img = new Image();
    img.addEventListener('load', function () {
      context.drawImage(this, 0, 0, 600, 600, 152, 0, 300, 150);
    }, false);
    img.src = 'flyer.png';
	}
}

}