"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeProvider = void 0;
// export { default as BaseStyles } from './components/BaseStyles'
var ThemeProvider_1 = require("./ThemeProvider");
Object.defineProperty(exports, "ThemeProvider", { enumerable: true, get: function () { return __importDefault(ThemeProvider_1).default; } });
__exportStar(require("./theme"), exports);
// export * from './components/Avatar'
// export * from './components/Button'
__exportStar(require("./components/Icons"), exports);
// export * from './components/Headline'
// export * from './components/Paragraph'
//# sourceMappingURL=index.js.map