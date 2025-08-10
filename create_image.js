
const sharp = require('sharp');

sharp({ 
    create: { 
        width: 1200, 
        height: 630, 
        channels: 4, 
        background: { r: 79, g: 70, b: 229, alpha: 1 } 
    } 
})
.png()
.toFile('/Users/nataliebasque/Ad Workflow/landing-page/public/images/og-image.jpg');
