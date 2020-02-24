"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("@storybook/react");
var _1 = __importDefault(require("./"));
react_2.storiesOf('Button', module)
    .add('Primary', function () { return react_1.default.createElement(_1.default, null); })
    .add('Primary with border', function () { return react_1.default.createElement(_1.default, null); })
    .add('Secondary', function () { return react_1.default.createElement(_1.default, null); })
    .add('Secondary with border', function () { return react_1.default.createElement(_1.default, null); })
    .add('Outline', function () { return react_1.default.createElement(_1.default, null); })
    .add('Floating', function () { return react_1.default.createElement(_1.default, null); });
//# sourceMappingURL=stories.js.map