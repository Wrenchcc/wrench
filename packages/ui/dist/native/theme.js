"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
exports.THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
};
exports.DARK_THEME = {
    default: '#000000',
    neutral: '#6d6f76',
    accent: '#a8a8ad',
    subtle: '#e6e7e9',
    inverse: '#ffffff',
    error: '#ec6d2f',
    success: '#2db22f',
    warning: '#eec530',
    facebook: '#3b5998',
    white: '#ffffff',
    black: '#000000',
    divider: '#252526',
    placeholder: '#19191A',
};
exports.LIGHT_THEME = {
    default: '#ffffff',
    neutral: '#6d6f76',
    accent: '#a8a8ad',
    subtle: '#e6e7e9',
    inverse: '#000000',
    error: '#ec6d2f',
    success: '#2db22f',
    warning: '#eec530',
    facebook: '#3b5998',
    white: '#ffffff',
    black: '#000000',
    divider: '#e6e7e9',
    placeholder: '#e6e7e9',
};
exports.default = (function (mode) { return ({
    fontSizes: [12, 14, 16, 20, 24, 32],
    breakpoints: ['40em', '52em', '64em'],
    fonts: {
        body: 'system-ui, sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace',
    },
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    mode: mode === exports.THEMES.DARK ? exports.THEMES.DARK : exports.THEMES.LIGHT,
    colors: mode === exports.THEMES.DARK ? exports.DARK_THEME : exports.LIGHT_THEME,
}); });
//# sourceMappingURL=theme.js.map