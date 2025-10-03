// Simple audio test using JavaScript
// This file can be used to test if audio is working on your system

function testAudioCapability() {
    console.log('Testing audio capability...');
    
    // Test 1: Check if Audio API is available
    if (typeof Audio !== 'undefined') {
        console.log('✓ Audio API is available');
    } else {
        console.log('✗ Audio API is not available');
        return false;
    }
    
    // Test 2: Check if Web Audio API is available
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        console.log('✓ Web Audio API is available');
    } else {
        console.log('✗ Web Audio API is not available');
    }
    
    // Test 3: Try to create an audio context
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('✓ Audio context created successfully');
        console.log('Audio context state:', audioContext.state);
        
        // Test 4: Try to play a simple tone
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        
        console.log('✓ Test tone sent (if you heard a beep, audio is working!)');
        return true;
        
    } catch (error) {
        console.log('✗ Audio context test failed:', error);
        return false;
    }
}

// Run the test when this script is loaded
testAudioCapability();