class Gallery{
    constructor(id){
        this.gallery = $(id);
        this.thumbs = this.gallery.find("ul .room-wrap");
        this.bigPicture = this.gallery.find(".room-wrap_big-picture");
        this.thumbs.click(this.showBigPicture.bind(this));
    }
    showBigPicture(event){
        const currentThumbPicture = $(event.currentTarget).children("img");
        const currentPath = currentThumbPicture.attr("src").replace("-small", "");
        this.bigPicture.children("img").attr("src", currentPath);
    }
}