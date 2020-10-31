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
function SvgArrowRightAlternativeIcon(_a) {
    var _b = _a.width, width = _b === void 0 ? 44 : _b, _c = _a.height, height = _c === void 0 ? 48 : _c, props = __rest(_a, ["width", "height"]);
    return (React.createElement("svg", { width: width, height: height, viewBox: "0 0 44 48" },
        React.createElement("defs", null,
            React.createElement("filter", { x: "-95.3%", y: "-190.6%", width: "290.6%", height: "478.1%", filterUnits: "objectBoundingBox", id: "arrow-right-alternative-icon_svg__a" },
                React.createElement("feMorphology", { radius: 0.75, operator: "dilate", in: "SourceAlpha", result: "shadowSpreadOuter1" }),
                React.createElement("feOffset", { in: "shadowSpreadOuter1", result: "shadowOffsetOuter1" }),
                React.createElement("feMorphology", { radius: 1, in: "SourceAlpha", result: "shadowInner" }),
                React.createElement("feOffset", { in: "shadowInner", result: "shadowInner" }),
                React.createElement("feComposite", { in: "shadowOffsetOuter1", in2: "shadowInner", operator: "out", result: "shadowOffsetOuter1" }),
                React.createElement("feGaussianBlur", { stdDeviation: 6, in: "shadowOffsetOuter1", result: "shadowBlurOuter1" }),
                React.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0", in: "shadowBlurOuter1" })),
            React.createElement("path", { id: "arrow-right-alternative-icon_svg__b", d: "M12 17l10 10 10-10" })),
        React.createElement("g", { fill: "none", fillRule: "evenodd" },
            React.createElement("g", { strokeLinecap: "round", strokeLinejoin: "round", transform: "rotate(-90 23 23)" },
                React.createElement("use", { fill: "#000", filter: "url(#arrow-right-alternative-icon_svg__a)", xlinkHref: "#arrow-right-alternative-icon_svg__b" }),
                React.createElement("use", { stroke: props.theme.colors[props.color] || props.theme.colors.inverse, strokeWidth: 1.5, xlinkHref: "#arrow-right-alternative-icon_svg__b" })),
            React.createElement("path", { d: "M0 2h44v44H0z" }))));
}
exports.default = styled_components_1.withTheme(SvgArrowRightAlternativeIcon);
//# sourceMappingURL=ArrowRightAlternativeIcon.js.map