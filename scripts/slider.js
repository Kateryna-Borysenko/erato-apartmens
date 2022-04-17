class Slider{
    constructor(id){
        this.slider = $(id);
        this.newImg = this.slider.find(".home-slider__img_new");
        this.currentImg = this.slider.find(".home-slider__img_current");
        this.currentImgNum = + this.currentImg.data("num");
        this.newImgNum = this.currentImgNum + 1;

        setInterval(this.changeImg.bind(this), SLIDE_TIME);
    }
    changeImg(){
        this.currentImg.animate({"opacity" : 0}, 8000, () => {
            this.currentImgNum ++;
            this.currentImgNum = this.currentImgNum > SLIDES_QUANTITY ? 0 : this.currentImgNum;
            this.newImgNum = this.currentImgNum + 1 > SLIDES_QUANTITY ? 0 : this.currentImgNum + 1;
            this.currentImg.attr("src", `/images/home/slider/slider-${this.currentImgNum}.jpg`);
            this.currentImg.data("num", this.currentImgNum);
            this.newImg.data("num", this.newImgNum);
            this.newImg.attr("src", `/images/home/slider/slider-${this.newImgNum}.jpg`)
            this.currentImg.css("opacity", "1");
        });
    }
}