window.onload = function(){

    var buttons = document.querySelectorAll('#gallery input[type="button"]');
    var stopBtn = document.querySelector('input[type="button"][data-action="stop"]');
    var images = document.querySelectorAll('#gallery .photos img');
    var delayInput = document.querySelector('#delay');
    var delay = parseInt(delayInput.value) * 1000;
    var i = 0;
    
    var action = 'stop';


    delayInput.onchange = function() {
        delay = parseInt(delayInput.value) * 1000;
        console.log(delay);
    };

    for (i = 0; i < buttons.length; i++) {

        buttons[i].onclick = function() {
            var buttonAction = this.getAttribute('data-action');
            if (buttonAction == 'prev') {
                action = 'prev';
                prev();

            } else if (buttonAction == 'next') {
                action = 'next';
                next();

            } else if (buttonAction == 'prev-auto') {
                action = 'autoprev';
                prev(autoPrev);
                var autoPrev = setInterval(function() {prev(autoPrev, autoNext);}, delay);
        
                buttonsDisable();
                document.querySelector('input[type="button"][data-action="next-auto"]').disabled = false;
                stopBtn.disabled = false;

            } else if (buttonAction == 'next-auto') {
                action = 'autonext';
                next(autoNext);
                var autoNext = setInterval(function() {next(autoPrev, autoNext);}, delay);
        
                buttonsDisable();
                document.querySelector('input[type="button"][data-action="prev-auto"]').disabled = false;
                stopBtn.disabled = false;

            } else if (buttonAction == 'stop') {
                action = 'stop';
            }
        };
    }


    function prev(autoPrev, autoNext) {
        if (action == 'stop') {
            stop(autoPrev, autoNext);
            return;
        } else if (action == 'autonext') {
            clearInterval(autoPrev);
            return;
        }

        images[i].classList.remove('showed');
        i--;
        
        if(i < 0){
            i = images.length - 1;
        }
        
        images[i].classList.add('showed');
    }

    function next(autoPrev, autoNext) {
        if (action == 'stop') {
            stop(autoPrev, autoNext);
            return;
        } else if (action == 'autoprev') {
            clearInterval(autoNext);
            return;
        }

        images[i].classList.remove('showed');
        i++;
        
        if(i >= images.length){
            i = 0;
        }
        
        images[i].classList.add('showed');
    }

    function stop(autoPrev, autoNext) {
        clearInterval(autoPrev);
        clearInterval(autoNext);
        
        buttonsEnable();
        stopBtn.disabled = true;
    }

    function buttonsDisable() {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
            delayInput.disabled = true;
        }
    }

    function buttonsEnable() {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
            delayInput.disabled = false;
        }
    }
};