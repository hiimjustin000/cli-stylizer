const styleGroups = require("./styles");
const convert = require("color-convert");

const styles = {};

function createStyles() {
    for (const [groupName, group] of Object.entries(styleGroups)) {
        for (let [styleName, style] of Object.entries(group)) {
            if (styleName.startsWith("bg")) styleName = `bg${styleName[2].toUpperCase()}${styleName.slice(3)}`

            let styleClose = style.pop();
            let builder = createBuilder(createStyler(`\u001b[${style.join(";")}m`, `\u001b[${styleClose}m`));

            styles[styleName] = builder;
        }
    }

    for (const model of Object.keys(convert)) {
        styles[model] = (...args) => {
            return createBuilder(createStyler(`\u001b[38;2;${convert[model]["rgb"](args.length == 1 ? `${args[0]}` : `${args.join(" ")}`).join(";")}m`, "\u001b[39m"));
        }

        styles["rgb"] = (...args) => {
            return createBuilder(createStyler(`\u001b[38;2;${args[0].join(";")}m`, "\u001b[39m"));
        }
    }

    for (const model of Object.keys(convert)) {
        let bgModel = `bg${model[0].toUpperCase()}${model.slice(1)}`;

        styles[bgModel] = (...args) => {
            return createBuilder(createStyler(`\u001b[48;2;${convert[bgModel]["rgb"](args.length == 1 ? `${args[0]}` : `${args.join(" ")}`).join(";")}m`, "\u001b[49m"));
        }

        styles["bgRgb"] = (...args) => {
            return createBuilder(createStyler(`\u001b[48;2;${args[0].join(";")}m`, "\u001b[49m"));
        }
    }

    return styles;
}

const proto = Object.defineProperties(() => {}, styles);

function createBuilder(styler = {}) {
    function builder(...args) {
        return applyStyle(styler, args.length == 1 ? `${args[0]}` : `${args.join(" ")}`);
    }

    builder.__proto__ = proto;

    return builder;
}

function createStyler(open = "", close = "") {
    return {
        open,
        close,
    }
}

function applyStyle(styler = {}, text = "") {
    return `${styler.open}${text}${styler.close}`;
}

Object.defineProperty(module, "exports", {
    enumerable: true,
    get: createStyles,
});