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
function SvgTwitterIcon(_a) {
    var _b = _a.width, width = _b === void 0 ? 23 : _b, _c = _a.height, height = _c === void 0 ? 23 : _c, className = _a.className, _d = _a.style, style = _d === void 0 ? {} : _d, props = __rest(_a, ["width", "height", "className", "style"]);
    return (React.createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 24 20", className: className, style: style },
        React.createElement("path", { fill: "none", stroke: props.theme.colors[props.color] || props.theme.colors.inverse, strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M23 1.01a10.886 10.886 0 01-3.14 1.535 4.47 4.47 0 00-4.978-1.25A4.494 4.494 0 0012 5.556v1.003a10.65 10.65 0 01-9-4.545s-4 9.029 5 13.041a11.613 11.613 0 01-7 2.006c9 5.016 20 0 20-11.536 0-.28-.028-.558-.08-.832A7.75 7.75 0 0023 1.01z" })));
}
exports.default = styled_components_1.withTheme(SvgTwitterIcon);
//# sourceMappingURL=TwitterIcon.js.map