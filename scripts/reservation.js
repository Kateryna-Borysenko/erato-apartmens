class Reservation extends Form{
    constructor(id){
        super(id);
        this.rooms = this.elem.children(".selected-room");
        this.country = $("#autocomplete");
        this.countryLang = this.country.data("lang");

        this.country.autocomplete({
            source: availableTags[this.countryLang]
        });
        this.setRoomType();
    }
    setRoomType(){
        const roomType = $.cookie("roomType") || "";
        this.rooms.children(`.selected-room__item_${roomType}`).prop("selected", "selected");
    }
}

