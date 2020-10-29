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
function SvgArrowRightAlternative(props) {
    return (React.createElement("svg", __assign({ width: 44, height: 48 }, props),
        React.createElement("defs", null,
            React.createElement("filter", { x: "-95.3%", y: "-190.6%", width: "290.6%", height: "478.1%", filterUnits: "objectBoundingBox", id: "arrow-right_svg__a" },
                React.createElement("feMorphology", { radius: 0.75, operator: "dilate", in: "SourceAlpha", result: "shadowSpreadOuter1" }),
                React.createElement("feOffset", { in: "shadowSpreadOuter1", result: "shadowOffsetOuter1" }),
                React.createElement("feMorphology", { radius: 1, in: "SourceAlpha", result: "shadowInner" }),
                React.createElement("feOffset", { in: "shadowInner", result: "shadowInner" }),
                React.createElement("feComposite", { in: "shadowOffsetOuter1", in2: "shadowInner", operator: "out", result: "shadowOffsetOuter1" }),
                React.createElement("feGaussianBlur", { stdDeviation: 6, in: "shadowOffsetOuter1", result: "shadowBlurOuter1" }),
                React.createElement("feColorMatrix", { values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0", in: "shadowBlurOuter1" })),
            React.createElement("path", { id: "arrow-right_svg__b", d: "M12 17l10 10 10-10" })),
        React.createElement("g", { fill: "none", fillRule: "evenodd" },
            React.createElement("g", { strokeLinecap: "round", strokeLinejoin: "round", transform: "rotate(-90 23 23)" },
                React.createElement("use", { fill: "#000", filter: "url(#arrow-right_svg__a)", xlinkHref: "#arrow-right_svg__b" }),
                React.createElement("use", { stroke: props.theme.colors[props.color] || props.theme.colors.inverse, strokeWidth: 1.5, xlinkHref: "#arrow-right_svg__b" })),
            React.createElement("path", { d: "M0 2h44v44H0z" }))));
}
exports.default = styled_components_1.withTheme(SvgArrowRightAlternative);
//# sourceMappingURL=ArrowRightAlternative.js.map