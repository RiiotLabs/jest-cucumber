"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../../../src/");
var password_validator_1 = require("../../src/password-validator");
var feature = src_1.loadFeature('./examples/typescript/specs/features/basic-scenarios.feature');
src_1.defineFeature(feature, function (test) {
    var passwordValidator = new password_validator_1.PasswordValidator();
    var accessGranted = false;
    beforeEach(function () {
        passwordValidator = new password_validator_1.PasswordValidator();
    });
    test('Entering a correct password', function (_a) {
        var given = _a.given, when = _a.when, then = _a.then;
        given('I have previously created a password', function () {
            passwordValidator.setPassword('1234');
        });
        when('I enter my password correctly', function () {
            accessGranted = passwordValidator.validatePassword('1234');
        });
        then('I should be granted access', function () {
            expect(accessGranted).toBe(true);
        });
    });
});
//# sourceMappingURL=basic-scenarios.steps.js.map