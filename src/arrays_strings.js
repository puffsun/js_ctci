"use strict";

module.exports = (function() {

    /* we suppose all chars are ASCII code */
    var unique_chars = function(chars) {
        if (!chars) {
            return true;
        }

        if (chars.length > 256) {
            return false;
        }

        var container = {},
            c;
        for (c in chars) {
            if (chars.hasOwnProperty(c)) {
                if (container[chars[c]]) {
                    return false;
                } else {
                    container[chars[c]] = true;
                }
            }
        }

        return true;
    };

    var naive_reverse = function(str) {
        if (!str) {
            return str;
        }
        return str.split("").reverse().join("");
    };

    var regexSymbolWithCombiningMarks = /(<%= allExceptCombiningMarks %>)(<%= combiningMarks %>+)/g;
    var regexSurrogatePair = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;

    var reverse = function(string) {
        if (!string) {
            return string;
        }
        // Step 1: deal with combining marks and astral symbols (surrogate pairs)
        string = string
        // Swap symbols with their combining marks so the combining marks go first
        .replace(regexSymbolWithCombiningMarks, function($0, $1, $2) {
            // Reverse the combining marks so they will end up in the same order
            // later on (after another round of reversing)
            return reverse($2) + $1;
        })
        // Swap high and low surrogates so the low surrogates go first
        .replace(regexSurrogatePair, '$2$1');
        // Step 2: reverse the code units in the string
        var result = '';
        var index = string.length;
        while (index--) {
            result += string.charAt(index);
        }
        return result;
    };

    var slow_permutation = function(str1, str2) {
        if (!str1 && !str2) {
            return true;
        }

        if (str1.length !== str2.length) {
            return false;
        }

        if (str1 === str2) {
            return true;
        } else {
            return sort_str_asc(str1) === sort_str_asc(str2);
        }
    };

    var permutation = function(str1, str2) {
        if (!str1 && !str2) {
            return true;
        }

        if (str1.length !== str2.length) {
            return false;
        }
        var container = {},
            i, length;
        for (i = 0, length = str1.length; i < length; i++) {
            if (container[str1[i]]) {
                container[str1[i]] += 1;
            } else {
                container[str1[i]] = 1;
            }
        }

        for (i = 0, length = str2.length; i < length; i++) {
            if (container[str2[i]]) {
                container[str2[i]] -= 1;
                if (container[str2[i]] === 0) {
                    delete container[str2[i]];
                }
            } else {
                return false;
            }
        }
        return is_empty_object(container);
    };

    var is_empty_object = function(obj) {
        if (!obj || obj.length === 0) {
            return true;
        }

        if (obj.length > 0) {
            return false;
        }

        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    };

    var sort_str_asc = function(str) {
        return str.split("").sort().join("");
    };

    return {
        unique_chars     : unique_chars,
        naive_reverse    : naive_reverse,
        reverse          : reverse,
        slow_permutation : slow_permutation,
        permutation      : permutation,
        is_empty_object  : is_empty_object
    };
}());
