$(document).ready(function () {
    $('#continue-button').click(function(event) {
        event.preventDefault();

        showNextDiv();
    });

    $('#continue-button-1').click(function(event) {
        event.preventDefault();
        showNextDiv1();
    });

    $('#go-back').click(function(event) {
        showPreviousDiv();
    });

    $('#go-back-1').click(function(event) {
        showPreviousDiv1();
    });
    function showNextDiv() {
        window.scrollTo(0, 0);
        $("#data-section").hide();
        $("#capture-section").show();
        $("#signature-section").hide();
        $("#go-back").show();
        $("#go-back-1").hide();

        $("#current-step-1").hide();
        $("#current-step-2").show();
        $("#current-step-3").hide();
    }

    function showNextDiv1() {
        window.scrollTo(0, 0);
        $("#data-section").hide();
        $("#capture-section").hide();
        $("#signature-section").show();
        $("#go-back").hide();
        $("#go-back-1").show();

        $("#current-step-1").hide();
        $("#current-step-2").hide();
        $("#current-step-3").show();
    }

    function showPreviousDiv() {
        window.scrollTo(0, 0);
        $("#data-section").show();
        $("#capture-section").hide();
        $("#signature-section").hide();
        $("#go-back").hide();
        $("#go-back-1").hide();

        $("#current-step-1").show();
        $("#current-step-2").hide();
        $("#current-step-3").hide();
    }

    function showPreviousDiv1() {
        window.scrollTo(0, 0);
        $("#data-section").hide();
        $("#capture-section").show();
        $("#signature-section").hide();
        $("#go-back").show();
        $("#go-back-1").hide();

        $("#current-step-1").hide();
        $("#current-step-2").show();
        $("#current-step-3").hide();
    }
});