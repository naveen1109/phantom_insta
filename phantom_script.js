var resourceWait  = 300,
    maxRenderWait = 10000,
    url           = 'https://www.instagram.com/thebartown';

var page          = require('webpage').create(),
    count         = 0,
    forcedRenderTimeout,
    renderTimeout;
    var initialtags = '<html><body>'
var lasttags = '</body></html>'
var betweentags = ""
var items =[];

page.viewportSize = { width: 1280, height : 1024 };

function doRender() {
    console.log(initialtags+betweentags+lasttags);
    var webserver = require('webserver');
var server = webserver.create();
var service = server.listen(3000, function(request, response) {
  response.statusCode = 200;
  response.write(initialtags+betweentags+lasttags);
  response.close();
});

}

page.onResourceRequested = function (req) {
    count += 1;
   // console.log('> ' + req.id + ' - ' + req.url);
    clearTimeout(renderTimeout);
};

page.onResourceReceived = function (res) {
    if (!res.stage || res.stage === 'end') {
        count -= 1;
        if (JSON.stringify(res.url).match(/2885-15/)) {
        betweentags = betweentags+'<img src=' + JSON.stringify(res.url) + '>'

    }
        
       if (count === 0) {
            renderTimeout = setTimeout(doRender, resourceWait);
        }
    }
};

page.open(url, function (status) {
    if (status !== "success") {
        console.log('Unable to load url');
        phantom.exit();
    } else {

            forcedRenderTimeout = setTimeout(function () {
            console.log(count);
            doRender();
        }, maxRenderWait);
    }
});
