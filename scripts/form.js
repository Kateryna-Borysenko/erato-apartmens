class Form{
    constructor(id){
        this.elem = $(id);
        this.lang = this.elem.find(".form__textfield_lang");
        this.textfields = this.elem.find(".form__textfield");
        this.datesTextfields = this.elem.find(".form__textfield_datepicker");
        this.textarea = this.elem.find(".form__textfield_textarea");
        this.select = this.elem.find(".form__select");
        this.checkboxList = this.elem.find(".form__checkbox");
        this.message = this.elem.find(".form__message");

        this.elem.submit(this.checkForm.bind(this));
    }
    checkForm(event){
        event.preventDefault();
        let isFormError = false;
        let data = {};
        this.textfields.each((index, textfield) => {
            const textfieldValue = $(textfield).val();
            const textfieldName = $(textfield).attr("name");
            let currentRegexp = "";
            if(textfieldName == "name" || textfieldName == "country"){           
                currentRegexp = new RegExp(REGEXPS[textfieldName][this.lang.val()]);
            }
            else{
                currentRegexp = new RegExp(REGEXPS[textfieldName]);
            }
            const isTextfieldError = ! (currentRegexp.test(textfieldValue));
           
            $(textfield).toggleClass("form__textfield_error", isTextfieldError);
            data[textfieldName] = textfieldValue;
                if(isTextfieldError){
                    isFormError = true;
                }
        });
        
        if(this.select.length){
            const checkInDate = this.datesTextfields.eq(0).val().split("/");
            const checkOutDate = this.datesTextfields.eq(1).val().split("/");
            const currentYear = new Date().getFullYear();
          
            let isDateError = false;
            let isMonthError = false;
            let isYearError = false;
    
            if(checkInDate[2] >= currentYear && checkOutDate[2] >= currentYear && checkInDate[2] <= checkOutDate[2]){
                isYearError = false;
                if(checkInDate[1] == checkOutDate[1] && checkInDate[2] == checkOutDate[2]){
                    isMonthError = false;
                    if(checkInDate[0] > checkOutDate[0]){
                        isDateError = true;
                        
                    }
                }
                else if(checkInDate[1] < checkOutDate[1]){
                    isMonthError = false;
                    isDateError = false;
                    
                }
                else if(checkInDate[1] > checkOutDate[1] && checkInDate[2] == checkOutDate[2]){
                    isMonthError = true;
                   
                }
                else{
                    isMonthError = false;
                  
                }
            }
            else{
                isYearError = true;
               
            }
    
            let isFullDateError = isYearError || isMonthError || isDateError;
        
            this.datesTextfields.toggleClass("form__textfield_error", isFullDateError);
        }

        let isSelectError = false;
        if(this.select.length && !this.select.val()){
            isFormError = true;
            isSelectError = true;
        }
        this.select.toggleClass("form__textfield_error", isSelectError);

        if(!isFormError){
            data[this.textarea.attr("name")] = this.textarea.val();
                if(this.select.length){
                    data[this.select.attr("name")] = this.select.val();
                    this.checkboxList.each((index, currentCheckbox) => {
                        if($(currentCheckbox).prop("checked")){
                            data[$(currentCheckbox).attr("name")] = $(currentCheckbox).val();
                        }
                    });
                }
          

            $.ajax({
                "url" : "/send-mail.php"
                ,"method" : "post"
                ,"dataType" : "json"
                ,"timeout" : 5000
                ,"data" : data
                ,"success" : (serverResponse) => {
                    this.message.text(MESSAGES[serverResponse.messageCode][this.lang.val()]);
                    this.message.removeClass("form__message_error");
                    this.textfields.each((index, currentTextfield) => {
                        $(currentTextfield).val("");
                    });
                }
                ,"error" : (oAjax) => {
                    // console.log(oAjax);
                }
                });
        }  
        else{
            this.message.text(MESSAGES["send-error"][this.lang.val()]);
            this.message.addClass("form__message_error");
        }      
    }
}