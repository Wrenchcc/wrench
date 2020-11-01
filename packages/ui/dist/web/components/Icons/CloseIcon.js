"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var React = __importStar(require("react"));
var styled_components_1 = require("styled-components");
function SvgCloseIcon(_a) {
    var _b = _a.width, width = _b === void 0 ? 15 : _b, _c = _a.height, height = _c === void 0 ? 15 : _c, className = _a.className, _d = _a.style, style = _d === void 0 ? {} : _d, onClick = _a.onClick, props = __rest(_a, ["width", "height", "className", "style", "onClick"]);
    return (React.createElement("svg", { width: width, height: height, viewBox: "0 0 15 16", className: className, style: style, onClick: onClick },
        React.createElement("defs", null,
            React.createElement("path", { d: "M8.737 8.177l6.01 6.01a.75.75 0 11-1.06 1.06l-6.01-6.01-6.01 6.01a.75.75 0 11-1.061-1.06l6.01-6.01-6.01-6.01a.75.75 0 111.06-1.061l6.01 6.01 6.011-6.01a.75.75 0 011.06 1.06l-6.01 6.01z", id: "close-icon_svg__a" })),
        React.createElement("g", { fill: "none", fillRule: "evenodd" },
            React.createElement("mask", { id: "close-icon_svg__b", fill: "#fff" },
                React.createElement("use", { xlinkHref: "#close-icon_svg__a" })),
            React.createElement("use", { fill: "#000", xlinkHref: "#close-icon_svg__a" }),
            React.createElement("path", { fill: props.theme.colors[props.color] || props.theme.colors.inverse, fillRule: "nonzero", mask: "url(#close-icon_svg__b)", d: "M7.677-13.036L28.89 8.177 7.677 29.39-13.536 8.177z" }))));
}
exports.default = styled_components_1.withTheme(SvgCloseIcon);
//# sourceMappingURL=CloseIcon.js.map