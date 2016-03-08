'use strict';
(function(){
	let reelsDone, wonPrize;

    let getRandomInt = (min, max) =>  Math.floor(Math.random() * (max - min)) + min;

    let spinReel = (reel, spins) => {
		let yPos = 40;               //initial y offset (so that image stays on center)
        let maxY = spins * 150 + 40; //threshold (spins * height of the reel * initial offset)
		
        let reelSpinner = setInterval(() => {
            //image will 'jump' 5px at a time until it reaches the remaining 100px, then it will run slower
            yPos += (maxY - yPos <= 100) ? 1 : 5;
            reel.css('background-position-y',`${yPos}px`);
            if(yPos == maxY) {
                clearInterval(reelSpinner);
                reelsDone++;
                if(reelsDone == 3) { //so that the winner message appears only after all reels stop
					if(wonPrize) {
                        $('.winner-text').addClass('won');
                        //to avoid setting the message inside the script, I am telling the HTML which message to show
                        $($('.prize-message')[spins % 3]).css('display','block');
					}
                    $('#btnSpin').prop('disabled',false);
                }
            }
        });
    };

    let reset = () => {
		$('#btnSpin').prop('disabled',true);
        $('.prize-message').css('display','none');
        $('.winner-text').removeClass('won');
        wonPrize = false;
        reelsDone = 0;
    };

    $(document).ready(() => {
        let reel1SpinCount, reel2SpinCount, reel3SpinCount;

        $('#btnSpin').click(() => {
            reset();
            reel1SpinCount = getRandomInt(10,21); //returns a random number between 10 and 20
            reel2SpinCount = getRandomInt(10,21);
            reel3SpinCount = getRandomInt(10,21);

            //if the remainder of the division of each one of the reels' spin count by 3 is the same,
            //we know they are aligned and the user won a prize
            wonPrize = reel1SpinCount % 3 == reel2SpinCount % 3 && reel2SpinCount % 3 == reel3SpinCount % 3;

            spinReel($('#reel1'),reel1SpinCount);
            spinReel($('#reel2'),reel2SpinCount);
            spinReel($('#reel3'),reel3SpinCount);
        });

    });
})();
