"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var React = __importStar(require("react"));
var styled_components_1 = require("styled-components");
function SvgCloseIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 15 16" }, props),
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