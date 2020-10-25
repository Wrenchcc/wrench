"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var react_1 = __importDefault(require("react"));
var styled_components_1 = require("styled-components");
var theme_1 = __importDefault(require("./theme"));
function ThemeProvider(_a) {
    var children = _a.children, mode = _a.mode;
    return react_1.default.createElement(styled_components_1.ThemeProvider, { theme: theme_1.default(mode) }, children);
}
exports.default = ThemeProvider;
//# sourceMappingURL=ThemeProvider.js.map