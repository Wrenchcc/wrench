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
function SvgEmailIcon(props) {
    return (React.createElement("svg", __assign({ width: "1em", height: "1em", viewBox: "0 0 20 17" }, props),
        React.createElement("g", { fill: "none", fillRule: "evenodd", stroke: props.theme.colors[props.color] || props.theme.colors.inverse, strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 },
            React.createElement("path", { d: "M2.8 1h14.4c.99 0 1.8.81 1.8 1.8v10.8c0 .99-.81 1.8-1.8 1.8H2.8c-.99 0-1.8-.81-1.8-1.8V2.8C1 1.81 1.81 1 2.8 1z" }),
            React.createElement("path", { d: "M19 2.8l-9 6.3-9-6.3" }))));
}
exports.default = styled_components_1.withTheme(SvgEmailIcon);
//# sourceMappingURL=EmailIcon.js.map