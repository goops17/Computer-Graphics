function Input() {
    self = this;

    self.isLeftPressed = false;
    self.isRightPressed = false;
    self.isUpPressed = false;
    self.isDownPressed = false;

    function handleKeyEvent(e, isKeyDown) {
        // Taking multiple input from user
        if(e.keyCode == 38) {
            self.isUpPressed = isKeyDown;
        }

        if(e.keyCode == 82) {
            self.isRightPressed = isKeyDown;
        }

        if(e.keyCode == 87) {
            self.isUpPressed = isKeyDown;
        }

        if(e.keyCode == 32) {
            self.isUpPressed = isKeyDown;
        }
    }

    document.addEventListener("keydown", function(e) {handleKeyEvent(e, true)});
    document.addEventListener("keyup", function(e) {handleKeyEvent(e, false)});
}

