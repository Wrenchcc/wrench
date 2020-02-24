"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
// import { variant } from 'styled-system'
var Base = styled_components_1.default.Button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  color: ", ";\n"], ["\n  background-color: ", ";\n  color: ", ";\n"])), function (props) { return props.theme.colors.default; }, function (props) { return props.theme.colors.inverse; });
function ButtonPrimary() {
    return react_1.default.createElement(Base, null, "Hej");
}
exports.default = ButtonPrimary;
var templateObject_1;
//# sourceMappingURL=index.js.map