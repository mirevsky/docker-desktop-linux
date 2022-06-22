export class StringHandler {
    static camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index == 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    static camelCaseFirstUpperCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    static snakeCase(str) {
        return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('_');
    }

    static parseCSSText(cssText) {
        var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, " ").replace(/\s+/g, " ");
        var style = {}, [, ruleName, rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/) || [, , cssTxt];
        var cssToJs = s => s.replace(/\W+\w/g, match => match.slice(-1).toUpperCase());
        var properties = rule.split(";").map(o => o.split(":").map(x => x && x.trim()));
        for (var [property, value] of properties) style[cssToJs(property)] = value;
        return {cssText, ruleName, style};
    }

    static nl2br = (str, is_xhtml) => {
        if (typeof str === 'undefined' || str === null) {
            return '';
        }
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }
}