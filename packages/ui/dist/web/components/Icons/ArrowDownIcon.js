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
function SvgArrowDownIcon(_a) {
    var _b = _a.width, width = _b === void 0 ? 10 : _b, _c = _a.height, height = _c === void 0 ? 5 : _c, className = _a.className, _d = _a.style, style = _d === void 0 ? {} : _d, props = __rest(_a, ["width", "height", "className", "style"]);
    return (React.createElement("svg", { width: width, height: height, viewBox: "0 0 12 7", className: className, style: style },
        React.createElement("path", { d: "M1 1l5 5 5-5", stroke: props.theme.colors[props.color] || props.theme.colors.inverse, strokeWidth: 1.5, fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" })));
}
exports.default = styled_components_1.withTheme(SvgArrowDownIcon);
//# sourceMappingURL=ArrowDownIcon.js.map