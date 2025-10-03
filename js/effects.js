// Birthday Party Interactive Effects
$(document).ready(function() {
    console.log('🎉 Birthday party script loaded!');
    console.log('jQuery version:', $.fn.jquery);
    
    // Check if elements exist
    console.log('Welcome button exists:', $('#welcome_btn').length > 0);
    console.log('Lights button exists:', $('#lights_btn').length > 0);
    console.log('Yes button exists:', $('#yes_btn').length > 0);
    console.log('No button exists:', $('#no_btn').length > 0);
    
    // Hide loading screen and show initial page
    $(window).load(function() {
        console.log('Window loaded, hiding loading screen');
        $('.loading').fadeOut('fast');
        $('#initial_page').fadeIn('fast');
    });

    // Yes Button - Show second.gif
    $('#yes_btn').click(function() {
        console.log('Yes button clicked!');
        console.log('Welcome button exists:', $('#welcome_btn').length);
        
        // Hide initial page
        $('#initial_page').fadeOut('slow', function() {
            // Show second page with gif
            $('#second_page').fadeIn('slow');
            console.log('Second page shown');
            
            // After 3 seconds, show startgif.gif with welcome button
            setTimeout(function() {
                console.log('3 seconds passed, hiding second page');
                $('#second_page').fadeOut('slow', function() {
                    // Show startgif.gif (welcome dance)
                    console.log('Showing welcome dance GIF');
                    $('#welcome_dance').fadeIn('slow');
                    
                    // Show container so buttons are visible
                    $('.container').fadeIn('slow');
                    
                    // Show welcome button after gif appears
                    setTimeout(function() {
                        console.log('Attempting to show welcome button');
                        console.log('Welcome button exists:', $('#welcome_btn').length);
                        console.log('Welcome button parent visible:', $('#welcome_btn').parent().is(':visible'));
                        console.log('Container visible:', $('.container').is(':visible'));
                        
                        // Show welcome button with multiple methods
                        $('#welcome_btn').show().css({
                            'display': 'inline-block',
                            'visibility': 'visible',
                            'opacity': '1'
                        });
                        
                        setTimeout(function() {
                            console.log('Welcome button display:', $('#welcome_btn').css('display'));
                            console.log('Welcome button visibility:', $('#welcome_btn').css('visibility'));
                            console.log('Welcome button opacity:', $('#welcome_btn').css('opacity'));
                            console.log('Welcome button visible:', $('#welcome_btn').is(':visible'));
                        }, 500);
                    }, 1000);
                });
            }, 3000); // Show second.gif for 3 seconds
        });
    });

    // No Button - Show Happy Birthday page
    $('#no_btn').click(function() {
        console.log('No button clicked! Showing Happy Birthday page');
        
        // Hide initial page
        $('#initial_page').fadeOut('slow', function() {
            // Show Happy Birthday page
            $('#happy_birthday_page').fadeIn('slow');
        });
    });

    // Welcome Button - Move to lights
    $('#welcome_btn').click(function() {
        console.log('Welcome button clicked!');
        $(this).fadeOut('slow');
        
        // Show lights button
        setTimeout(function() {
            $('#lights_btn').fadeIn('slow');
        }, 500);
    });

    // Lights Button - Show confirmation button
    $('#lights_btn').click(function() {
        console.log('Lights button clicked!');
        $(this).fadeOut('slow');
        
        // Show "Are you sure?" button
        setTimeout(function() {
            $('#confirm_lights_btn').fadeIn('slow');
        }, 500);
    });

    // Confirm Lights Button - Turn on colorful bulbs and play music
    $('#confirm_lights_btn').click(function() {
        console.log('Confirm lights button clicked!');
        $(this).fadeOut('slow');
        
        // Show turnoff light GIF
        $('#turnoff_light').fadeIn('slow');
        
        // Change background to black permanently after a delay
        setTimeout(function() {
            $('body').css('background-color', '#000000').addClass('dark-theme');
            
            // Hide the turnoff light GIF after background changes
            $('#turnoff_light').fadeOut('slow');
            
            // Turn on the colorful bulbs
            setTimeout(function() {
                $('.bulb').addClass('glow');
                $('.container').fadeIn('slow');
            }, 500);
        }, 2000); // Show GIF for 2 seconds
        
        // Remove welcome dance GIF
        $('#welcome_dance').fadeOut('slow');
        
        console.log('Starting music automatically after lights...');
        
        // Play music automatically
        var audio = $('.song')[0];
        console.log('Audio element found:', !!audio);
        
        if (audio) {
            console.log('Attempting to play audio file...');
            console.log('Audio src:', audio.src || 'No src');
            console.log('Audio canPlay:', audio.canPlayType('audio/mpeg'), audio.canPlayType('audio/mp4'));
            
            audio.volume = 0.7; // Set volume to 70%
            
            // Add event listener for when music ends
            audio.addEventListener('ended', function() {
                console.log('Music ended, removing everything and showing cake.gif');
                
                // Remove/hide all decorative elements
                $('.bulb').removeClass('glow').fadeOut('slow');
                $('#banner').fadeOut('slow');
                
                // Show cake.gif after clearing
                setTimeout(function() {
                    $('#cake_gif').fadeIn('slow');
                    
                    // After 5 seconds, show cake buttons directly
                    setTimeout(function() {
                        $('#cake_gif').fadeOut('slow', function() {
                            $('.container').show();
                            
                            // Show cake buttons after cake animation
                            setTimeout(function() {
                                $('.cake-buttons-container').addClass('show').hide().fadeIn('slow');
                            }, 500);
                        });
                    }, 5000); // Show cake.gif for 5 seconds
                }, 1000); // Short delay after music ends
            });
            
            audio.play().then(function() {
                console.log('Audio file playing successfully');
            }).catch(function(error) {
                console.log('Audio file failed, trying generated melody:', error);
                playBirthdayMelody();
            });
        } else {
            console.log('No audio element found, playing generated melody');
            playBirthdayMelody();
        }
        
        // Enhanced bulb effects
        $('.bulb').addClass('animate__animated animate__pulse animate__infinite');
        $('body').addClass('peach-after');
    });

    // Test Audio Button - Simple beep test
    $('#test_audio_btn').click(function() {
        console.log('🔊 Test audio button clicked!');
        
        // Show immediate feedback
        $(this).text('🔊 Testing...').prop('disabled', true);
        
        // Try a simple beep first
        try {
            console.log('Creating audio context for test...');
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('Audio context state:', audioContext.state);
            
            if (audioContext.state === 'suspended') {
                console.log('Audio context suspended, resuming...');
                audioContext.resume().then(() => {
                    console.log('Audio context resumed');
                    playTestBeep(audioContext);
                }).catch(error => {
                    console.log('Failed to resume audio context:', error);
                    alert('❌ Audio test failed: Could not resume audio context');
                });
            } else {
                playTestBeep(audioContext);
            }
            
        } catch (error) {
            console.log('❌ Test audio failed:', error);
            alert('❌ Audio test failed: ' + error.message);
        }
        
        // Reset button after 3 seconds
        setTimeout(() => {
            $(this).text('🔊 Test Audio').prop('disabled', false);
        }, 3000);
    });

    function playTestBeep(audioContext) {
        try {
            console.log('🔔 Creating test beep oscillator...');
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            
            console.log('✅ Test beep created and started');
            
            // Show success message
            setTimeout(() => {
                const testResult = $(`
                    <div style="
                        position: fixed; 
                        top: 20px; 
                        right: 20px; 
                        background: #4CAF50; 
                        color: white; 
                        padding: 15px; 
                        border-radius: 8px; 
                        z-index: 10000;
                        font-weight: bold;
                    ">
                        ✅ Audio Test: BEEP SENT!<br>
                        <small>Did you hear a sound?</small>
                    </div>
                `);
                $('body').append(testResult);
                
                setTimeout(() => {
                    testResult.fadeOut(1000, function() {
                        $(this).remove();
                    });
                }, 3000);
            }, 100);
            
        } catch (error) {
            console.log('❌ Error in playTestBeep:', error);
            alert('❌ Test beep failed: ' + error.message);
        }
    }

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

// Function to play a simple birthday melody using Web Audio API
function playBirthdayMelody() {
    console.log('🎵 Starting birthday melody...');
    
    try {
        // Create audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('Audio context created, state:', audioContext.state);
        
        // Function to actually play the melody
        function startMelody() {
            console.log('🎶 Playing Happy Birthday melody...');
            
            // Simple Happy Birthday melody
            const melody = [
                {note: 261.63, duration: 0.5}, // C - "Happy"
                {note: 261.63, duration: 0.5}, // C - "Birth"
                {note: 293.66, duration: 1.0}, // D - "day"
                {note: 261.63, duration: 1.0}, // C - "to"
                {note: 349.23, duration: 1.0}, // F - "you"
                {note: 329.63, duration: 2.0}, // E - (hold)
                
                {note: 261.63, duration: 0.5}, // C - "Happy"
                {note: 261.63, duration: 0.5}, // C - "Birth"
                {note: 293.66, duration: 1.0}, // D - "day"
                {note: 261.63, duration: 1.0}, // C - "to"
                {note: 392.00, duration: 1.0}, // G - "you"
                {note: 349.23, duration: 2.0}  // F - (hold)
            ];
            
            let currentTime = audioContext.currentTime + 0.1;
            let totalDuration = 0;
            
            melody.forEach((note) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(note.note, currentTime);
                oscillator.type = 'sine';
                
                // Smooth envelope
                gainNode.gain.setValueAtTime(0, currentTime);
                gainNode.gain.linearRampToValueAtTime(0.2, currentTime + 0.05);
                gainNode.gain.linearRampToValueAtTime(0.1, currentTime + note.duration - 0.05);
                gainNode.gain.linearRampToValueAtTime(0, currentTime + note.duration);
                
                oscillator.start(currentTime);
                oscillator.stop(currentTime + note.duration);
                
                currentTime += note.duration + 0.1; // Small gap between notes
                totalDuration = currentTime - audioContext.currentTime; // Track total duration
            });
            
            // Show visual feedback
            showMusicFeedback();
            
            // Auto-advance to next button when melody ends
            setTimeout(function() {
                console.log('Generated melody ended, removing everything and showing cake.gif');
                
                // Remove/hide all decorative elements
                $('.bulb').removeClass('glow').fadeOut('slow');
                $('#banner').fadeOut('slow');
                
                // Show cake.gif after clearing
                setTimeout(function() {
                    $('#cake_gif').fadeIn('slow');
                    
                    // After 5 seconds, show cake buttons directly
                    setTimeout(function() {
                        $('#cake_gif').fadeOut('slow', function() {
                            $('.container').show();
                            
                            // Show cake buttons after cake animation
                            setTimeout(function() {
                                $('.cake-buttons-container').addClass('show').hide().fadeIn('slow');
                            }, 500);
                        });
                    }, 5000); // Show cake.gif for 5 seconds
                }, 1000);
            }, totalDuration * 1000 + 1000); // Convert to milliseconds and add 1 second buffer
        }
        
        // Resume audio context if needed
        if (audioContext.state === 'suspended') {
            console.log('Resuming audio context...');
            audioContext.resume().then(() => {
                console.log('Audio context resumed successfully');
                startMelody();
            }).catch((error) => {
                console.log('Failed to resume audio context:', error);
                showAudioFallback();
            });
        } else {
            startMelody();
        }
        
    } catch (error) {
        console.log('Audio creation failed:', error);
        showAudioFallback();
    }
}

// Show visual feedback for music
function showMusicFeedback() {
    console.log('Showing music feedback...');
    
    // Create a music indicator
    const musicIndicator = $(`
        <div id="music-indicator" style="
            position: fixed; 
            top: 50%; 
            left: 50%; 
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff69b4, #ff1493); 
            color: white; 
            padding: 20px 30px; 
            border-radius: 15px; 
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(255, 105, 180, 0.5);
            animation: musicPulse 0.5s ease-in-out infinite alternate;
        ">
            🎵 Happy Birthday Song Playing! 🎵<br>
            <small style="font-size: 14px;">🎂 For Shreya 🎂</small>
        </div>
    `);
    
    // Add CSS animation
    if (!$('#musicPulseStyle').length) {
        $('head').append(`
            <style id="musicPulseStyle">
                @keyframes musicPulse {
                    0% { transform: translate(-50%, -50%) scale(1); }
                    100% { transform: translate(-50%, -50%) scale(1.05); }
                }
            </style>
        `);
    }
    
    $('body').append(musicIndicator);
    
    // Remove after 8 seconds
    setTimeout(() => {
        $('#music-indicator').fadeOut(1000, function() {
            $(this).remove();
        });
    }, 8000);
}

// Fallback when audio doesn't work
function showAudioFallback() {
    console.log('🔇 Audio not available, showing fallback');
    
    // Show a nice visual celebration instead
    const celebration = $(`
        <div id="audio-fallback" style="
            position: fixed; 
            top: 50%; 
            left: 50%; 
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff69b4, #ff1493, #9400d3); 
            color: white; 
            padding: 30px; 
            border-radius: 20px; 
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(255, 105, 180, 0.6);
            animation: celebrationBounce 1s ease-in-out infinite alternate;
            max-width: 400px;
        ">
            🎵 Happy Birthday Shreya! 🎵<br><br>
            🎂 The music couldn't play, but<br>
            the celebration continues! 🎉<br><br>
            <small style="font-size: 14px;">
                💡 Tip: Add MP3 files to the 'audio' folder<br>
                for background music next time!
            </small>
        </div>
    `);
    
    // Add CSS animation if not already added
    if (!$('#celebrationStyle').length) {
        $('head').append(`
            <style id="celebrationStyle">
                @keyframes celebrationBounce {
                    0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) scale(1.05) rotate(1deg); }
                }
            </style>
        `);
    }
    
    $('body').append(celebration);
    
    // Remove after 6 seconds
    setTimeout(() => {
        $('#audio-fallback').fadeOut(1000, function() {
            $(this).remove();
        });
    }, 6000);
}

// Create fireworks every 3 seconds during party mode
setInterval(function() {
    if ($('body').hasClass('party-mode')) {
        createFireworks();
    }
}, 3000);

// Cake Buttons Functionality
$(document).ready(function() {
    // Debug: Test audio element on page load
    setTimeout(function() {
        const audio = document.getElementById('personalised_music');
        if (audio) {
            console.log('Audio element found on page load');
            console.log('Audio src:', audio.currentSrc || audio.src);
            console.log('Audio readyState:', audio.readyState);
            console.log('Audio networkState:', audio.networkState);
        } else {
            console.error('Audio element not found on page load!');
        }
    }, 2000);
    
    // Personalised Music Button
    $('#personalised_music_btn').click(function() {
        console.log('Personalised music button clicked!');
        
        const audio = document.getElementById('personalised_music');
        const button = $(this);
        
        if (!audio) {
            console.error('Audio element not found!');
            alert('Audio element not found!');
            return;
        }
        
        console.log('Audio element found:', audio);
        console.log('Audio source:', audio.currentSrc || 'No source loaded');
        
        if (audio.paused) {
            // Set volume to audible level
            audio.volume = 0.7;
            console.log('Attempting to play audio...');
            
            // Add event listeners for debugging
            audio.addEventListener('loadstart', function() {
                console.log('Audio loading started');
            });
            
            audio.addEventListener('canplay', function() {
                console.log('Audio can play');
            });
            
            audio.addEventListener('playing', function() {
                console.log('Audio is now playing');
                button.text('🎵 Stop Music').removeClass('btn-success').addClass('btn-danger');
                $('.cake-button-item').first().addClass('animated pulse');
            });
            
            audio.addEventListener('error', function(e) {
                console.error('Audio error:', e);
                console.error('Error code:', audio.error ? audio.error.code : 'Unknown');
                alert('Audio error occurred. Check console for details.');
            });
            
            audio.addEventListener('ended', function() {
                console.log('Audio playback ended');
                button.text('Personalised Music').removeClass('btn-danger').addClass('btn-success');
                $('.cake-button-item').first().removeClass('animated pulse');
            });
            
            // Try to play
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('SUCCESS: Audio playback started!');
                }).catch((error) => {
                    console.error('Play promise rejected:', error);
                    
                    if (error.name === 'NotAllowedError') {
                        alert('Browser blocked autoplay. Please interact with the page first and try again.');
                    } else if (error.name === 'NotSupportedError') {
                        alert('Audio format not supported by your browser.');
                    } else {
                        alert('Could not play audio: ' + error.message);
                    }
                });
            } else {
                console.log('Play method does not return a promise');
            }
        } else {
            console.log('Stopping audio playback');
            audio.pause();
            audio.currentTime = 0;
            button.text('Personalised Music').removeClass('btn-danger').addClass('btn-success');
            $('.cake-button-item').first().removeClass('animated pulse');
        }
    });
    
    // Temporary buttons functionality
    $('#temp_btn_1').click(function() {
        // Create a beautiful "good person" message modal
        const goodPersonMessage = `
            <div id="good-person-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: 'Signika', sans-serif;
            ">
                <div style="
                    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%);
                    padding: 40px;
                    border-radius: 20px;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    max-width: 450px;
                    animation: slideIn 0.5s ease-out;
                ">
                    <h1 style="
                        color: white;
                        font-size: 2.5em;
                        margin-bottom: 20px;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                        animation: glow 2s infinite alternate;
                    "> Oki oki  </h1>
                    
                    <p style="
                        color: #f8f9fa;
                        font-size: 1.3em;
                        line-height: 1.6;
                        margin-bottom: 15px;
                        text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                    ">
                        good luck with what you have coming,<br>
                        along the way 
                    </p>
                    
                    <p style="
                        color: #f8f9fa;
                        font-size: 1.2em;
                        line-height: 1.6;
                        margin-bottom: 15px;
                        text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                    ">
                        Keep being amazing,<br>
                        
                    </p>
                    
                    <p style="
                        color: #f8f9fa;
                        font-size: 1.1em;
                        line-height: 1.6;
                        margin-bottom: 25px;
                        text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                    ">
                        Achha haiii, haa aesi baat hai
                    </p>
                    
                    <button onclick="$('#good-person-modal').fadeOut(); $(this).parent().parent().remove();" style="
                        background: white;
                        color: #bed4e5ff;
                        border: none;
                        padding: 12px 25px;
                        border-radius: 25px;
                        font-size: 1.1em;
                        font-weight: bold;
                        cursor: pointer;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                        transition: all 0.3s ease;
                    " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 12px rgba(0,0,0,0.3)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.2)'">
                        Thik hai! 
                    </button>
                </div>
            </div>
            
            <style>
                @keyframes slideIn {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes glow {
                    0% { text-shadow: 2px 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.3); }
                    100% { text-shadow: 2px 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4); }
                }
            </style>
        `;
        
        // Add the message to the page
        $('body').append(goodPersonMessage);
        
        // Add animation to the button
        $(this).closest('.cake-button-item').addClass('animated bounce');
        setTimeout(() => {
            $(this).closest('.cake-button-item').removeClass('animated bounce');
        }, 1000);
    });
    
    $('#temp_btn_2').click(function() {
        alert('Temp Button 2 clicked! This is a placeholder.');
        $(this).closest('.cake-button-item').addClass('animated shake');
        setTimeout(() => {
            $(this).closest('.cake-button-item').removeClass('animated shake');
        }, 1000);
    });
    
    $('#temp_btn_3').click(function() {
        alert('Temp Button 3 clicked! This is a placeholder.');
        $(this).closest('.cake-button-item').addClass('animated tada');
        setTimeout(() => {
            $(this).closest('.cake-button-item').removeClass('animated tada');
        }, 1000);
    });
    
    $('#temp_btn_4').click(function() {
        alert('Temp Button 4 clicked! This is a placeholder.');
        $(this).closest('.cake-button-item').addClass('animated wobble');
        setTimeout(() => {
            $(this).closest('.cake-button-item').removeClass('animated wobble');
        }, 1000);
    });
});