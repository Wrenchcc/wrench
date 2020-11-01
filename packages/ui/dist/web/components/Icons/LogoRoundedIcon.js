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
// @ts-nocheck
var React = __importStar(require("react"));
var styled_components_1 = require("styled-components");
function SvgLogoRoundedIcon(_a) {
    var theme = _a.theme, black = _a.black, white = _a.white, inverted = _a.inverted, _b = _a.width, width = _b === void 0 ? 40 : _b, _c = _a.height, height = _c === void 0 ? 40 : _c, _d = _a.style, style = _d === void 0 ? {} : _d, className = _a.className, onClick = _a.onClick;
    var textColor = (black && theme.colors.white) || (white && theme.colors.black) || theme.isDark
        ? inverted
            ? theme.colors.white
            : theme.colors.black
        : inverted
            ? theme.colors.black
            : theme.colors.white;
    var bgColor = (black && theme.colors.black) || (white && theme.colors.white) || theme.isDark
        ? inverted
            ? theme.colors.black
            : theme.colors.white
        : inverted
            ? theme.colors.white
            : theme.colors.black;
    return (React.createElement("svg", { width: width, height: height, viewBox: "0 0 50 50", className: className, style: style, onClick: onClick },
        React.createElement("g", { fill: "none", fillRule: "evenodd" },
            React.createElement("path", { fill: bgColor, d: "M16.024 0h17.952c5.572 0 7.592.58 9.63 1.67a11.358 11.358 0 014.724 4.725c1.09 2.037 1.67 4.057 1.67 9.63v17.95c0 5.573-.58 7.593-1.67 9.63a11.358 11.358 0 01-4.725 4.725c-2.037 1.09-4.057 1.67-9.63 1.67h-17.95c-5.573 0-7.593-.58-9.63-1.67a11.358 11.358 0 01-4.725-4.725C.58 41.568 0 39.548 0 33.975v-17.95c0-5.573.58-7.593 1.67-9.63A11.358 11.358 0 016.395 1.67C8.432.58 10.452 0 16.025 0z" }),
            React.createElement("path", { fill: textColor, d: "M8.706 10.8l1.89 7.567h.087l1.955-7.567h2.24l1.956 7.59h.087l1.89-7.59h2.306L18.26 22.063h-2.59l-1.867-7.061h-.088l-1.867 7.061H9.256L6.4 10.8h2.306zm21.097 11.263l-2.02-4.136H26.31v4.136h-2.548V10.8h4.327c1.33 0 2.335.312 3.018.935.682.623 1.024 1.485 1.024 2.585 0 .788-.172 1.436-.516 1.944a3.716 3.716 0 01-1.313 1.196l2.29 4.603h-2.79zm-3.492-9.151v2.926h1.78c.45 0 .815-.119 1.095-.355.28-.237.42-.602.42-1.097 0-.484-.137-.85-.412-1.1-.275-.25-.643-.374-1.104-.374h-1.779zm16.089 7.04v2.111h-7.512V10.8H42.4v2.112h-4.964v2.464h4.195v2.111h-4.195v2.464H42.4zm-24.683 8.231v11.263h-2.504l-3.997-6.93h-.088v6.93H8.58V28.183h2.526l3.976 6.93h.087v-6.93h2.548zm12.18 3.542l-2.46.352c-.165-.594-.444-1.036-.838-1.326a2.267 2.267 0 00-1.381-.434c-.714 0-1.292.276-1.733.827-.44.552-.661 1.45-.661 2.692 0 1.243.22 2.133.661 2.67.441.538 1.019.806 1.733.806.527 0 .98-.14 1.359-.418.379-.278.65-.704.815-1.276l2.483.352c-.308 1.166-.88 2.063-1.72 2.69-.838.627-1.817.94-2.937.94-.952 0-1.802-.226-2.55-.68-.75-.452-1.339-1.108-1.77-1.968-.43-.86-.644-1.898-.644-3.116 0-1.224.215-2.269.645-3.134.43-.865 1.02-1.527 1.768-1.986.749-.458 1.599-.687 2.55-.687 1.121 0 2.104.319 2.95.957.845.638 1.422 1.55 1.73 2.739zm5.194-3.542v4.576h4.041v-4.576h2.548v11.263h-2.548V34.87h-4.041v4.576h-2.548V28.183h2.548z" }))));
}
exports.default = styled_components_1.withTheme(SvgLogoRoundedIcon);
//# sourceMappingURL=LogoRoundedIcon.js.map