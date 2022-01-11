"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("@storybook/react");
var _1 = __importDefault(require("./"));
(0, react_2.storiesOf)('BaseStyles', module).add('Global', function () { return (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(_1.default, null),
    "This component sets the base styles, including normalize.css")); });
//# sourceMappingURL=stories.js.map