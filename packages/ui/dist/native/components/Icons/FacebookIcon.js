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
function SvgFacebookIcon(_a) {
    var _b = _a.width, width = _b === void 0 ? 23 : _b, _c = _a.height, height = _c === void 0 ? 23 : _c, className = _a.className, _d = _a.style, style = _d === void 0 ? {} : _d, onClick = _a.onClick, props = __rest(_a, ["width", "height", "className", "style", "onClick"]);
    return (React.createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 13 22", className: className, style: style, onClick: onClick },
        React.createElement("path", { fill: "none", stroke: props.theme.colors[props.color] || props.theme.colors.inverse, strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M12 1H9a5 5 0 00-5 5v3H1v4h3v8h4v-8h3l1-4H8V6a1 1 0 011-1h3V1z" })));
}
exports.default = styled_components_1.withTheme(SvgFacebookIcon);
//# sourceMappingURL=FacebookIcon.js.map