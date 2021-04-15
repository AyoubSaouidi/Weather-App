function onReady(callback) {
    var intervalId = window.setInterval(function() {
        if (document.querySelector('.page') !== undefined || document.querySelector('.page') !== null) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 2000);
}

function setVisible(selector, visible) {
    if (visible) {
        document.querySelector(selector).style.display = 'block';
    } else {
        document.querySelector(selector).style.display = "none";
    }
}

onReady(() => {
    setVisible('.page', true);
    setVisible('#globalLoader', false);
});