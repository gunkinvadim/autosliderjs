window.onload = function() {

    slider1 = new Slider({
        buttons: '.gallery-1 .button-action',
        stopBtn: '.gallery-1 .button-action[data-action="stop"]',
        autoNextBtn: '.gallery-1 .button-action[data-action="next-auto"]',
        autoPrevBtn: '.gallery-1 .button-action[data-action="prev-auto"]',
        images: '.gallery-1 .photos img',
        delayInput: '.gallery-1 .delay-input',
    });

    // slider2 = new Slider({
    //     buttons: '.gallery-2 .button-action',
    //     stopBtn: '.gallery-2 .button-action[data-action="stop"]',
    //     autoNextBtn: '.gallery-2 .button-action[data-action="next-auto"]',
    //     autoPrevBtn: '.gallery-2 .button-action[data-action="prev-auto"]',
    //     images: '.gallery-2 .photos img',
    //     delayInput: '.gallery-2 .delay-input',
    // });
};



function Slider(obj) {

    var slider = this;

    slider.buttons = document.querySelectorAll(obj.buttons);
    slider.stopBtn = document.querySelector(obj.stopBtn);
    slider.autoNextBtn = document.querySelector(obj.autoNextBtn);
    slider.autoPrevBtn = document.querySelector(obj.autoPrevBtn);
    slider.images = document.querySelectorAll(obj.images);
    slider.delayInput = document.querySelector(obj.delayInput);

    slider.delay = parseInt(slider.delayInput.value) * 1000;
    slider.i = 0;
    slider.action = 'stop';



    slider.prev = function(autoPrev, autoNext) {
        if (slider.action == 'stop') {
            slider.stop(autoPrev, autoNext);
            return;
        } else if (slider.action == 'autonext') {
            clearInterval(autoPrev);
            return;
        }

        slider.images[slider.i].classList.remove('showed');
        slider.i--;
        
        if(slider.i < 0){
            slider.i = slider.images.length - 1;
        }
        
        slider.images[slider.i].classList.add('showed');
    };

    slider.next = function(autoPrev, autoNext) {
        if (slider.action == 'stop') {
            slider.stop(autoPrev, autoNext);
            return;
        } else if (slider.action == 'autoprev') {
            clearInterval(autoNext);
            return;
        }

        slider.images[slider.i].classList.remove('showed');
        slider.i++;
        
        if(slider.i >= slider.images.length){
            slider.i = 0;
        }
        
        slider.images[slider.i].classList.add('showed');
    };

    slider.stop = function(autoPrev, autoNext) {
        clearInterval(autoPrev);
        clearInterval(autoNext);
        
        slider.buttonsEnable();
        slider.stopBtn.disabled = true;
    };

    slider.buttonsDisable = function() {
        for (var i = 0; i < slider.buttons.length; i++) {
            slider.buttons[i].disabled = true;
            slider.delayInput.disabled = true;
        }
    };

    slider.buttonsEnable = function() {
        for (var i = 0; i < slider.buttons.length; i++) {
            slider.buttons[i].disabled = false;
            slider.delayInput.disabled = false;
        }
    };



    slider.delayInput.onchange = function() {
        if (isNaN(slider.delayInput.value) == true || slider.delayInput.value <= 0) {
            slider.delayInput.value = 1;
        }
        slider.delay = parseInt(slider.delayInput.value) * 1000;
    };

    for (i = 0; i < slider.buttons.length; i++) {

        slider.buttons[i].onclick = function() {
            var buttonAction = this.getAttribute('data-action');
            if (buttonAction == 'prev') {
                slider.action = 'prev';
                slider.prev();

            } else if (buttonAction == 'next') {
                slider.action = 'next';
                slider.next();

            } else if (buttonAction == 'prev-auto') {
                slider.action = 'autoprev';
                slider.prev(autoPrev);
                var autoPrev = setInterval(function() {slider.prev(autoPrev, autoNext);}, slider.delay);
        
                slider.buttonsDisable();
                slider.autoNextBtn.disabled = false;
                slider.stopBtn.disabled = false;

            } else if (buttonAction == 'next-auto') {
                slider.action = 'autonext';
                slider.next(autoNext);
                var autoNext = setInterval(function() {slider.next(autoPrev, autoNext);}, slider.delay);
        
                slider.buttonsDisable();
                slider.autoPrevBtn.disabled = false;
                slider.stopBtn.disabled = false;

            } else if (buttonAction == 'stop') {
                slider.action = 'stop';
            }
        };
    }

}