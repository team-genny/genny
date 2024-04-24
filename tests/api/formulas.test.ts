import { compileFormula } from "../../src/common/formulas/compiler";
import { parseFormula } from "../../src/common/formulas/parser";

describe("Parser", () => {
  it("parses string literal", () => {
    const expected = {
      kind: "str",
      value: "foo"
    }
    const actual = parseFormula(`"foo"`)
    expect(actual).toStrictEqual(expected)
  })
  
  it("parses number literal", () => {
    const expected = {
      kind: "num",
      value: 42
    }
    const actual = parseFormula(`42`)
    expect(actual).toStrictEqual(expected)
  })
  
  it("parses boolean literal", () => {
    const expected = {
      kind: "bool",
      value: true
    }
    const actual = parseFormula(`true`)
    expect(actual).toStrictEqual(expected)
  })

  it("parses function call", () => {
    const expected = {
      kind: "func",
      name: "ISO_DATE",
      args: [
        { kind: "str", value: "1950-01-01" },
        { kind: "func", name: "NOW", args: [] },
      ]
    }
    const actual = parseFormula(`ISO_DATE("1950-01-01", NOW())`)
    expect(actual).toStrictEqual(expected)
  })
})

describe("Compiler", () => {
  it("compiles a nullary function", () => {
    const formula = compileFormula("NOW()")
    // We ignore the milliseconds because timing
    const expected = new Date().toISOString().slice(0, 19);
    const actual = formula({ row: 0, fields: new Map() }).slice(0, 19)
    expect(actual).toStrictEqual(expected);
  })
})
