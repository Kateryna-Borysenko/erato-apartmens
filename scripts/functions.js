const changeMenu = (id) => {
    const navbar = $(id);
    const logo = navbar.find(".logo");
    const logoTemplate = logo.clone();
        if(navbar.width() <= 956){
            logo.remove();
            navbar.append(logoTemplate);
            navbar.css("flex-direction", "row-reverse");
        }
}

const setRoomToCookie = (event) => {
    const currentBtn = $(event.currentTarget);
    const roomType = currentBtn.data("room");
    const lang = currentBtn.data("lang");
    $.cookie("roomType", roomType);

    const page = currentBtn.data("page");
    window.location = `/${lang == "gr" ? "gr/gr-" : ""}${page}.html`;
}




