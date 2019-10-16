import { getParts, formatNumber, parseInputValue } from './index';
import { JestEnvironment } from '@jest/environment';


describe('formatNumber', () => {

    test('number', () => {
        expect(formatNumber(98.765)).toBe('98.765');
        expect(formatNumber(123)).toBe('123.000');
        expect(formatNumber(53.65)).toBe('53.650');
        expect(formatNumber(3.1)).toBe('3.100');
        expect(formatNumber(62.51243)).toBe('62.512');
    });
});


describe('parseInputValue', () => {

    test('valid values', () => {
        expect(parseInputValue('98.765')).toBe(98.765);
        expect(parseInputValue(98.765)).toBe(98.765);
        expect(parseInputValue('3.100')).toBe(3.1);
        expect(parseInputValue(3.100)).toBe(3.1);
        expect(parseInputValue('62.51243')).toBe(62.51243);
        expect(parseInputValue(62.51243)).toBe(62.51243);
    });


    test('invalid values', () => {
        const mustThrowWithString = () => parseInputValue('crash');
        const mustThrowWithNull = () => parseInputValue(null);
        const mustThrowWithUndefined = () => parseInputValue(undefined);
        const mustThrowWithTrue = () => parseInputValue(true);
        const mustThrowWithFalse = () => parseInputValue(false);
        const mustThrowWithObject = () => parseInputValue({ oops: 'death' });

        expect(mustThrowWithString).toThrow();
        expect(mustThrowWithNull).toThrow();
        expect(mustThrowWithUndefined).toThrow();
        expect(mustThrowWithTrue).toThrow();
        expect(mustThrowWithFalse).toThrow();
        expect(mustThrowWithObject).toThrow();
    });
});


describe('getParts', () => {

    test('valid numbers', () => {
        const sourceValues = [1, 2, 3, 4];
        const expectedValues = ['10.000', '20.000', '30.000', '40.000'];

        const parts = getParts(sourceValues);

        expect(parts).toBeDefined();
        expect(parts.length).toBe(sourceValues.length);

        let sum = 0;
        for (let valueIndex = 0; valueIndex < sourceValues.length; valueIndex++) {
            expect(parts[valueIndex]).toBe(expectedValues[valueIndex]);
            sum += parseFloat(parts[valueIndex]);
        }

        expect(sum).toBe(100);
    });


    test('valid strings', () => {
        const sourceValues = ['1.5', '3', '6', '1.5'];
        const expectedValues = ['12.500', '25.000', '50.000', '12.500'];

        const parts = getParts(sourceValues);

        expect(parts).toBeDefined();
        expect(parts.length).toBe(sourceValues.length);

        let sum = 0;
        for (let valueIndex = 0; valueIndex < sourceValues.length; valueIndex++) {
            expect(parts[valueIndex]).toBe(expectedValues[valueIndex]);
            sum += parseFloat(parts[valueIndex]);
        }

        expect(sum).toBe(100);
    });


    test('invalid values', () => {
        const mustThrowWithString = () => getParts([1, 'bomb', 3, 4]);
        const mustThrowWithNull = () => getParts([1, 2, null, 4]);
        const mustThrowWithUndefined = () => getParts([1, 2, undefined, 4]);
        const mustThrowWithTrue = () => getParts([1, 2, true, 4]);
        const mustThrowWithFalse = () => getParts([1, 2, false, 4]);
        const mustThrowWithObject = () => getParts([1, 2, { throw: 'exception' }, 4]);

        expect(mustThrowWithString).toThrow();
        expect(mustThrowWithNull).toThrow();
        expect(mustThrowWithUndefined).toThrow();
        expect(mustThrowWithTrue).toThrow();
        expect(mustThrowWithFalse).toThrow();
        expect(mustThrowWithObject).toThrow();
    });
});


const maxArrayLength = 3500000;
const bigData = Array(maxArrayLength).fill(1);

describe(`Big data (${maxArrayLength} records)`, () => {

    test(`Timeout 5000 ms (Jest default)`, (done) => {
        return new Promise(function(resolve) {
            getParts(bigData);
            resolve();            
        });
    });
});