var i = 0;
var intervalEve = setInterval(function () {
    var src = $('.page-wrapper[page="' + (i+1) + '"]').find('.background').attr('src');
    console.log(src);

    var browserName = undefined;
    var userAgent = navigator.userAgent;

    switch (true) {
        case /Trident|MSIE/.test(userAgent):
            browserName = 'ie';
            break;

        case /Edge/.test(userAgent):
            browserName = 'edge';
            break;

        case /Chrome/.test(userAgent):
            browserName = 'chrome';
            break;

        case /Safari/.test(userAgent):
            browserName = 'safari';
            break;

        case /Firefox/.test(userAgent):
            browserName = 'firefox';
            break;

        case /Opera/.test(userAgent):
            browserName = 'opera';
            break;

        default:
            browserName = 'unknown';
    }


    //ie 브라우저 및 EDGE 브라우저 
    if (browserName == 'ie' || browserName == 'edge') {

        //ie11
        var _window = window.open(url, "_blank");
        _window.document.close();
        _window.document.execCommand('SaveAs', true, "file.hwp" || url)
        _window.close();
    } else {

        //chrome
        var filename = src;
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
            a.download = $('title').text() + i + ".jpg"; // Set the file name.
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            delete a;
        };
        xhr.open('GET', src);
        xhr.send();
    }
    $('button[command="nextPage"]').eq(0).click();
    i++;
    if ($('button[command="nextPage"]').prop('disabled')) {
        // 마지막이면 끝
        clearInterval(intervalEve);
    }
}, 2500);