import i18n from 'i18n';
import { APP_NAME } from './env-constant';

export const helpers = {

    appName : function (){
        return APP_NAME;
    },

    inc: function (value: string) {
        return parseInt(value) + 1;
    },

    concat: function (str1: string, str2: string) {
        if (str1 && str2) {
            return str1 + str2;
        } else {
            return "inputs must be 2 strings"
        }

    },

    eq: function (arg1: string | number | null, arg2: string | number | null) {

        if (arguments.length < 3) {
            return "handlebars Helper {{eq}} expects 3 arguments";
        }

        return arg1 === arg2;
    },

    clazz: function (arg1: string, arg2: boolean) {

        if (arguments.length < 3) {
            return "handlebars Helper {{clazz}} expects 3 arguments";
        }

        return arg2 ? arg1 : '';
    },

    and: function () {
        let len = arguments.length - 1;
        let options = arguments[len];
        let val = true;

        for (var i = 0; i < len; i++) {
            if (!arguments[i]) {
                val = false;
                break;
            }
        }

        if (val) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },

    ifCond: function (arg1: string | number | null, arg2: string | number | null) {
        let len = arguments.length - 1;
        let options = arguments[len];

        if (arg1 === arg2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },

    t: function () {
        return i18n.__.apply(this, arguments as any);
    },

    tn: function () {
        return i18n.__n.apply(this, arguments as any);
    }

}

