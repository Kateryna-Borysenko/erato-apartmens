class Clock{
    constructor(id){
        this.clock = $(id);
        this.initTime();
        setInterval(this.initTime.bind(this), 1000);
    }
    getTime(methodOfDate, cssClass){
        const clock = document.getElementById("clock1"); 
        const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Athens" }));
        const timeData = now[methodOfDate]()
        const timePlace = clock.querySelector(cssClass);
        timePlace.textContent = timeData < 10 ? `0${timeData}` : timeData;
    }
    initTime(){
        this.getTime("getHours", ".hours");
        this.getTime("getMinutes", ".min");
        this.getTime("getSeconds", ".sec");
    }
}


