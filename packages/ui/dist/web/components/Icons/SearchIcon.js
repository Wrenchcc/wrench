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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
function SvgSearchIcon(_a) {
    var _b = _a.width, width = _b === void 0 ? 12 : _b, _c = _a.height, height = _c === void 0 ? 12 : _c, className = _a.className, _d = _a.style, style = _d === void 0 ? {} : _d;
    return (React.createElement("svg", { width: width, height: height, viewBox: "0 0 14 14", className: className, style: style },
        React.createElement("g", { fill: "none", fillRule: "evenodd", stroke: "#6D6F76", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, transform: "translate(1 1)" },
            React.createElement("circle", { cx: 5, cy: 5, r: 5 }),
            React.createElement("path", { d: "M12 12L9 9" }))));
}
exports.default = SvgSearchIcon;
//# sourceMappingURL=SearchIcon.js.map