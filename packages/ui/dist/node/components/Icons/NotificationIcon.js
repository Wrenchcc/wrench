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
function SvgNotificationIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 21 21" }, props),
        React.createElement("path", { fill: "none", stroke: props.theme.colors[props.color] || props.theme.colors.inverse, strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M20 15.25H1a2.85 2.85 0 002.85-2.85V7.65a6.65 6.65 0 0113.3 0v4.75A2.85 2.85 0 0020 15.25zm-7.857 3.8a1.9 1.9 0 01-3.287 0h3.288z" })));
}
exports.default = styled_components_1.withTheme(SvgNotificationIcon);
//# sourceMappingURL=NotificationIcon.js.map