function Stopwatch(element){
    var time = 0
    var interval
    var offset

    var stringContent = ""

    function update(){
        time += delta()
        var formattedTime = timeFormat(time)
        if(element != null){
            element.textContent = formattedTime
        }
        stringContent = formattedTime
    }

    function delta(){
        var now = Date.now()
        var timePassed = now - offset
        offset = now
        return timePassed
    }

    function timeFormat(timeInMs){
        var time = new Date(timeInMs)

        var hours
        
        if(time.getHours() >= 17){
            hours = (time.getHours() - 17).toString()
        }
        else{
            hours = (time.getHours() + 7).toString()
        }

        var minutes = time.getMinutes().toString()
        var seconds = time.getSeconds().toString()
        var milliseconds = time.getMilliseconds().toString()

        if(hours.length < 2){
            hours = '0' + hours
        }

        if(minutes.length < 2){
            minutes = '0' + minutes
        }

        if(seconds.length < 2){
            seconds = '0' + seconds
        }

        while(milliseconds.length < 3){
            milliseconds = '0' + milliseconds
        }

        return hours + " : " + minutes + " : " + seconds + " . " + milliseconds
    }

    this.isOn = false

    this.start = function(){
        if(!this.isOn){
            offset = Date.now()
            interval = setInterval(update,10)
            this.isOn = true
        }
    }

    this.stop = function(){
        if(this.isOn){
            clearInterval(interval)
            interval = null
            this.isOn = false
        }
    }

    this.reset = function(){
        time = 0
    }

    this.getCurrentTime = function(){
        return stringContent
    }

    this.getUnformattedTime = function(){
        var newTime = new Date(time)

        var hours
        
        if(newTime.getHours() >= 17){
            hours = (newTime.getHours() - 17)
        }
        else{
            hours = (newTime.getHours() + 7)
        }

        var minutes = newTime.getMinutes()
        var seconds = newTime.getSeconds()
        var milliseconds = newTime.getMilliseconds()

       return [hours,minutes,seconds,milliseconds]
    }
}