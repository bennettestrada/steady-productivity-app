function workForm(){

}

function timeArrayToMs(timeArray){

    var timeInMs

    timeInMs = timeArray[3] + 1000 * (timeArray[2] + 60 * (timeArray[1] + 60 * timeArray[0]))
    return timeInMs
}

function millisecondsToArray(timeInMs){

    var arr = [0,0,0,0]
    var temp;
    
    arr[0] = Math.floor(timeInMs / 3600000)
    arr[1] = Math.floor(timeInMs / 60000)
    arr[2] = Math.floor(timeInMs /1000)
    
    temp = timeInMs.toString()
    temp = temp.substring(temp.length - 3, temp.length)
    arr[3] = parseInt(temp)

    return arr
}

function calculateSplit(past,present){

    var pastInMs, presentInMs,diffInMs
    var diff = [0,0,0,0]

    pastInMs = timeArrayToMs(past)
    presentInMs = timeArrayToMs(present)
    diffInMs = presentInMs - pastInMs
    diff = millisecondsToArray(diffInMs)

    return diff
}

function formatSplit(time){

    var hours,minutes,seconds,milliseconds

    hours = time[0].toString()
    minutes = time[1].toString()
    seconds = time[2].toString()
    milliseconds = time[3].toString()

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

function startWorking(){
    //open up form to enter work info
    //if form is submitted, then change html
    var formCheck = true

    if(formCheck == true){            
        document.getElementById("button-container").innerHTML = `
            <button id="clock-stop">Take Break</button>
            <button id="clock-reset">Finish Working</button>
        `

        //div variables
        var clockContainer = document.getElementById("clock-container")
        var breakBtn = document.getElementById("clock-stop")
        var finishBtn = document.getElementById("clock-reset")
        var workSplits = document.getElementById("work-splits")
        var breakSplits = document.getElementById("break-splits")

        //boolean check for dataloss warning popup
        var dataCheck = true

        var breakCnt = 0;
        
        var pastBreak = [0,0,0,0]
        var presentBreak = [0,0,0,0]

        //stopwatches for the running time, and break time
        var mainWatch = new Stopwatch(clockContainer)
        var breakWatch = new Stopwatch()

        
        mainWatch.start()


        breakBtn.addEventListener("click", function() {
            if(mainWatch.isOn){
                //specifies which break it is, stops the running clock, calculates the work split, starts the break clock,
                //then rewrites the break button
                breakCnt++
                mainWatch.stop()
                presentBreak = mainWatch.getUnformattedTime()
                workSplits.innerHTML += "Work Session " + breakCnt + ":    " +  formatSplit(calculateSplit(pastBreak,presentBreak)) + "<br>"
                pastBreak = presentBreak
                breakWatch.start()
                document.getElementById("clock-stop").innerHTML = "Resume Work"
            }
            else{
                mainWatch.start()
                document.getElementById("clock-stop").innerHTML = "Take Break"
                breakWatch.stop()
                breakSplits.innerHTML += "Break " + breakCnt + ":    " + breakWatch.getCurrentTime() + "<br>"
                breakWatch.reset()
            }
        })

        finishBtn.addEventListener("click", function() {
            workSplits.innerHTML = ""
            breakSplits.innerHTML = ""
            document.getElementById("clock-button-container").innerHTML = `
            <div id="clock-container">00 : 00 : 00 . 000</div>
            <div id="button-container">
                <button id="clock-start" onClick="startWorking()">Let's Work</button>
            </div>
            `
            dataCheck = false
            return
        })

        window.addEventListener('beforeunload', function (e) {
            if(dataCheck == true){
                e.preventDefault();
                e.returnValue = '';
            }
        })
    }
}
