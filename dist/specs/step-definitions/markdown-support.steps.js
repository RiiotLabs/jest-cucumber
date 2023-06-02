"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
var feature = src_1.loadFeature('./specs/features/markdown-support.feature.md');
src_1.defineFeature(feature, function (test) {
    test('Simple addition', function (_a) {
        var when = _a.when, then = _a.then;
        var result = 0;
        when(/^I add (\d+) \+ (\d+)$/, function (a, b) {
            result = parseInt(a) + parseInt(b);
        });
        then(/^the result should be (\d+)$/, function (expected) {
            expect(result).toEqual(parseInt(expected));
        });
    });
});
//# sourceMappingURL=markdown-support.steps.js.map