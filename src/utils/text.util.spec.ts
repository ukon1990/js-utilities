import { TextUtil } from "./text.util";

describe('TextUtil', () => {
    describe('isEmpty', () => {
        it('Should be true if null', () => {
            expect(TextUtil.isEmpty(null)).toBeTruthy();
        });
    });
});
