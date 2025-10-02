// Birthday Party Interactive Effects
$(document).ready(function() {
    
    // Hide loading screen and show container
    $(window).load(function() {
        $('.loading').fadeOut('fast');
        $('.container').fadeIn('fast');
    });

    // Welcome Button - Start the party!
    $('#welcome_btn').click(function() {
        $(this).fadeOut('slow');
        
        // Change the GIF to secondscene.gif
        $('#welcome_dance').attr('src', 'images/secondscene.gif');
        $('#welcome_dance').fadeIn('slow');
        
        setTimeout(function() {
            $('#lights_btn').fadeIn('slow');
        }, 1000);
    });

    // Lights Button - Turn on colorful bulbs
    $('#lights_btn').click(function() {
        $(this).fadeOut('slow');
        
        // Change background to black
        $('body').css('background-color', '#000000');
        
        // Remove welcome dance GIF
        $('#welcome_dance').fadeOut('slow');
        
        setTimeout(function() {
            $('#music_btn').fadeIn('slow');
        }, 3000);
    });

    // Music Button - Play birthday song
    $('#music_btn').click(function() {
        $(this).fadeOut('slow');
        
        // Play audio (if available)
        var audio = $('.song')[0];
        if (audio) {
            audio.play().catch(function(error) {
                console.log('Audio play failed:', error);
            });
        }
        
        // Enhanced bulb effects
        $('.bulb').addClass('animate__animated animate__pulse animate__infinite');
        $('body').addClass('peach-after');
        
        setTimeout(function() {
            $('#decorate_btn').fadeIn('slow');
        }, 3000);
    });

    // Decorate Button - Show banner
    $('#decorate_btn').click(function() {
        $(this).fadeOut('slow');
        
        $('#banner').addClass('banner-show');
        $('#banner').fadeIn('slow');
        
        setTimeout(function() {
            $('#balloons_btn').fadeIn('slow');
        }, 3000);
    });

    // Balloons Button - Animate balloons
    $('#balloons_btn').click(function() {
        $(this).fadeOut('slow');
        
        animateBalloons();
        
        setTimeout(function() {
            $('#cake_btn').fadeIn('slow');
        }, 3000);
    });

    // Cake Button - Show birthday cake
    $('#cake_btn').click(function() {
        $(this).fadeOut('slow');
        
        $('#cake_main').fadeIn('slow');
        $('#candle').fadeIn('slow');
        
        // Show candle flames
        $('.fuego').fadeIn('slow');
        
        setTimeout(function() {
            $('#party_btn').fadeIn('slow');
        }, 3000);
    });

    // Party Button - Ultimate party mode!
    $('#party_btn').click(function() {
        $(this).fadeOut('slow');
        
        // Party mode effects
        $('body').addClass('party-mode');
        $('.balloons').addClass('animate__animated animate__bounce animate__infinite');
        $('.bulb').addClass('animate__animated animate__flash animate__infinite');
        
        // Create confetti effect
        createConfetti();
        
        setTimeout(function() {
            $('#message_btn').fadeIn('slow');
        }, 3000);
    });

    // Message Button - Show birthday card
    $('#message_btn').click(function() {
        $(this).fadeOut('slow');
        $('#card').fadeIn('slow');
        
        // Scroll to card
        $('html, body').animate({
            scrollTop: $('#card').offset().top
        }, 1000);
    });

    // Function to show balloons with animation (REMOVED - No longer needed)
    // function showBalloons() {
    //     $('.balloons').each(function(index) {
    //         var $balloon = $(this);
    //         setTimeout(function() {
    //             $balloon.animate({
    //                 bottom: (Math.random() * 200 + 100) + 'px',
    //                 left: (Math.random() * $(window).width() * 0.8) + 'px'
    //             }, 2000);
    //             $balloon.addClass('balloons-animate');
    //         }, index * 300);
    //     });
    // }

    // Function to animate balloons floating
    function animateBalloons() {
        $('.balloons').each(function() {
            floatBalloon($(this));
        });
    }

    // Individual balloon floating animation
    function floatBalloon($balloon) {
        var randLeft = Math.floor(Math.random() * ($(window).width() - 100));
        var randTop = Math.floor(Math.random() * ($(window).height() - 200));
        
        $balloon.animate({
            left: randLeft + 'px',
            top: randTop + 'px'
        }, 8000, function() {
            floatBalloon($balloon);
        });
    }

    // Create confetti effect
    function createConfetti() {
        var colors = ['#ff6b9d', '#4d9de0', '#6bcf7f', '#ffd93d', '#ff8a9b', '#a8e6cf'];
        
        for (var i = 0; i < 50; i++) {
            setTimeout(function() {
                var confetti = $('<div class="confetti"></div>');
                confetti.css({
                    position: 'fixed',
                    top: '-10px',
                    left: Math.random() * 100 + '%',
                    width: '10px',
                    height: '10px',
                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                    zIndex: 10000,
                    borderRadius: '50%'
                });
                
                $('body').append(confetti);
                
                confetti.animate({
                    top: $(window).height() + 'px',
                    left: '+=' + (Math.random() * 200 - 100) + 'px'
                }, 3000, function() {
                    $(this).remove();
                });
            }, i * 100);
        }
    }

    // Responsive balloon positioning
    $(window).resize(function() {
        $('.balloons').each(function() {
            var $balloon = $(this);
            if ($balloon.position().left > $(window).width() - 100) {
                $balloon.css('left', $(window).width() - 100 + 'px');
            }
        });
    });

    // Auto-start if loading is complete
    setTimeout(function() {
        if ($('.loading').is(':visible')) {
            $('.loading').fadeOut('fast');
            $('.container').fadeIn('fast');
        }
    }, 3000);
});

// Additional particle effects for enhanced experience
function createFireworks() {
    var firework = $('<div class="firework"></div>');
    firework.css({
        position: 'fixed',
        top: Math.random() * $(window).height() + 'px',
        left: Math.random() * $(window).width() + 'px',
        width: '4px',
        height: '4px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        zIndex: 10000,
        boxShadow: '0 0 20px #fff'
    });
    
    $('body').append(firework);
    
    firework.animate({
        width: '100px',
        height: '100px',
        marginTop: '-50px',
        marginLeft: '-50px',
        opacity: 0
    }, 1000, function() {
        $(this).remove();
    });
}

// Create fireworks every 3 seconds during party mode
setInterval(function() {
    if ($('body').hasClass('party-mode')) {
        createFireworks();
    }
}, 3000);