"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var react_1 = __importDefault(require("react"));
var react_2 = require("@storybook/react");
var _1 = require(".");
react_2.storiesOf('Icons', module)
    .add('LogoIcon', function () { return react_1.default.createElement(_1.LogoIcon, { width: "100", height: "100" }); })
    .add('LogoIcon - Inverted', function () { return react_1.default.createElement(_1.LogoIcon, { width: "100", height: "100", inverted: true }); })
    .add('LogoRoundedIcon', function () { return react_1.default.createElement(_1.LogoRoundedIcon, { width: "100", height: "100" }); })
    .add('LogoRoundedIcon - Inverted', function () { return react_1.default.createElement(_1.LogoRoundedIcon, { width: "100", height: "100", inverted: true }); })
    .add('MenuIcon', function () { return react_1.default.createElement(_1.MenuIcon, null); })
    .add('CloseIcon', function () { return react_1.default.createElement(_1.CloseIcon, { width: 20, height: 20 }); })
    .add('ArrowLeftIcon', function () { return react_1.default.createElement(_1.ArrowLeftIcon, null); })
    .add('ArrowRightAlternativeIcon', function () { return react_1.default.createElement(_1.ArrowRightAlternativeIcon, { width: 44, height: 48 }); })
    .add('ArrowLeftAlternativeIcon', function () { return react_1.default.createElement(_1.ArrowLeftAlternativeIcon, { width: 44, height: 48 }); })
    .add('AppStoreIcon', function () { return react_1.default.createElement(_1.AppStoreIcon, null); })
    .add('GooglePlayIcon', function () { return react_1.default.createElement(_1.GooglePlayIcon, null); })
    .add('SparkIcon', function () { return react_1.default.createElement(_1.SparkIcon, null); })
    .add('SparkIcon - Small', function () { return react_1.default.createElement(_1.SparkIcon, { small: true }); })
    .add('NotificationIcon', function () { return react_1.default.createElement(_1.NotificationIcon, null); })
    .add('ArrowDownIcon', function () { return react_1.default.createElement(_1.ArrowDownIcon, null); })
    .add('EmailIcon', function () { return react_1.default.createElement(_1.EmailIcon, null); })
    .add('CopyIcon', function () { return react_1.default.createElement(_1.CopyIcon, null); })
    .add('FacebookIcon', function () { return react_1.default.createElement(_1.FacebookIcon, null); })
    .add('MessengerIcon', function () { return react_1.default.createElement(_1.MessengerIcon, null); })
    .add('TwitterIcon', function () { return react_1.default.createElement(_1.TwitterIcon, null); })
    .add('CheckMarkIcon', function () { return react_1.default.createElement(_1.CheckMarkIcon, null); });
//# sourceMappingURL=stories.js.map