"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("@storybook/react");
var _1 = require(".");
react_2.storiesOf('Icons', module)
    .add('CloseIcon', function () { return react_1.default.createElement(_1.CloseIcon, { width: 20, height: 20 }); })
    .add('ArrowRightAlternativeIcon', function () { return react_1.default.createElement(_1.ArrowRightAlternativeIcon, null); })
    .add('ArrowLeftAlternativeIcon', function () { return react_1.default.createElement(_1.ArrowLeftAlternativeIcon, null); });
//# sourceMappingURL=stories.js.map