export const helpers = {

    inc: function (value: string) {
        return parseInt(value) + 1;
    },

    concat: function (str1: string, str2: string) {
        if(str1 && str2){
            return str1 + str2;
        }else{
            return "inputs must be 2 strings"
        }
        
    }

}

