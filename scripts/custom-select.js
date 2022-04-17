(function(){
    const selectElem = $("#rooms");
    const options = selectElem.children("option");
    const optionNumber = options.length;

    selectElem.addClass("select-room_hidden");
    selectElem.wrap(`<div class="select"></div>`);
    selectElem.after(`<div class="select-styled"></div>`);

    let list = $("<ul>", {"class" : "select-options"}).insertAfter(selectElem);

    options.each((index, currentOption) => {
        list.append($("<li>", {
            "text" : $(currentOption).val()
        }));      
    });

    $(".select-styled").append(list);
}());
