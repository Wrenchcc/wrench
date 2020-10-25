"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("@storybook/react");
react_2.storiesOf('Paragraph', module)
    .add('Regular', function () { return react_1.default.createElement(react_1.default.Fragment, null); }) // 15
    .add('Medium', function () { return react_1.default.createElement(react_1.default.Fragment, null); }) // 16
    .add('With underline', function () { return react_1.default.createElement(react_1.default.Fragment, null); })
    .add('With url', function () { return react_1.default.createElement(react_1.default.Fragment, null); })
    .add('With mention', function () { return react_1.default.createElement(react_1.default.Fragment, null); });
//# sourceMappingURL=stories.js.map