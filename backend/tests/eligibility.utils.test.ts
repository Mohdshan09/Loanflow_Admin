import { describe, expect, it } from "vitest";
import { calculateAge } from "../src/eligibility/eligibility.utils.js";

describe("calculateAge", () => {
    const asOf = new Date("2026-09-18T12:00:00.000Z");

    it("does not count an age until the birthday has occurred", () => {
        expect(calculateAge(new Date("2008-09-19T00:00:00.000Z"), asOf)).toBe(17);
    });

    it("counts an age on the birthday", () => {
        expect(calculateAge(new Date("2008-09-18T00:00:00.000Z"), asOf)).toBe(18);
    });

    it("handles the upper boundary consistently", () => {
        expect(calculateAge(new Date("1926-09-18T00:00:00.000Z"), asOf)).toBe(100);
        expect(calculateAge(new Date("1925-09-18T00:00:00.000Z"), asOf)).toBe(101);
    });
});
