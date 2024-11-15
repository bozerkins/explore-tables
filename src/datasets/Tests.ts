export default [
    {
        name: "Simple table",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [
            { one: "test", two: "blabla", three: 23 },
            { one: "test2", two: "bkla", three: 3 },
            { one: "test3", two: "yolo", three: 552 },
            { one: "test4", two: "kuku", three: 21 },
            { one: "test5", two: "yolo", three: 33 },
            { one: "test6", two: "miau", three: 112 },
        ],
        pivots: [],
        measures: ["three"],
    },
    {
        name: "Simple table - sorted",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [
            { one: "test", two: "blabla", three: 23 },
            { one: "test2", two: "bkla", three: 3 },
            { one: "test3", two: "yolo", three: 552 },
            { one: "test4", two: "kuku", three: 21 },
            { one: "test5", two: "yolo", three: 33 },
            { one: "test6", two: "miau", three: 112 },
        ],
        pivots: [],
        measures: ["three"],
        sorting: [{ name: "one", direction: "asc" }],
    },
    {
        name: "Simple table - sorted 2 fields",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [
            { one: "test", two: "blabla", three: 23 },
            { one: "test2", two: "bkla", three: 3 },
            { one: "test3", two: "yolo", three: 552 },
            { one: "test4", two: "kuku", three: 21 },
            { one: "test5", two: "yolo", three: 33 },
            { one: "test6", two: "miau", three: 112 },
        ],
        pivots: [],
        measures: ["three"],
        sorting: [
            { name: "one", direction: "asc" },
            { name: "two", direction: "desc" },
        ],
    },
    {
        name: "Simple table - sorted measures",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [
            { one: "test", two: "blabla", three: 23 },
            { one: "test2", two: "bkla", three: 3 },
            { one: "test3", two: "yolo", three: 552 },
            { one: "test4", two: "kuku", three: 21 },
            { one: "test5", two: "yolo", three: 33 },
            { one: "test6", two: "miau", three: 112 },
        ],
        pivots: [],
        measures: ["three"],
        sorting: [
            { name: "one", direction: "asc" },
            { name: "two", direction: "desc" },
            { name: "three", direction: "asc" },
        ],
    },
    {
        name: "Simple table - only measures",
        fields: [{ id: "three", name: "Three" }],
        rows: [{ three: 112 }],
        pivots: [],
        measures: ["three"],
    },
    {
        name: "Simple table - only measures, no data",
        fields: [{ id: "three", name: "Three" }],
        rows: [],
        pivots: [],
        measures: ["three"],
    },
    {
        name: "Simple table - no measures",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [
            { one: "test", two: "blabla", three: 23 },
            { one: "test2", two: "bkla", three: 3 },
            { one: "test3", two: "yolo", three: 552 },
            { one: "test4", two: "kuku", three: 21 },
            { one: "test5", two: "yolo", three: 33 },
            { one: "test6", two: "miau", three: 112 },
        ],
        pivots: [],
        measures: [],
    },
    {
        name: "Simple table - no rows",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [],
        pivots: [],
        measures: ["three"],
    },
    {
        name: "Simple table - no rows, no measures",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [],
        pivots: [],
        measures: [],
    },
    {
        name: "Pivot table",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [
            { one: "test", two: "blabla", three: 23 },
            { one: "test2", two: "bkla", three: 3 },
            { one: "test2", two: "yolo", three: 521 },
            { one: "test2", two: "miau", three: 5212 },
            { one: "test3", two: "yolo", three: 552 },
            { one: "test4", two: "kuku", three: 21 },
            { one: "test5", two: "yolo", three: 33 },
            { one: "test6", two: "yolo", three: 51 },
            { one: "test6", two: "miau", three: 112 },
        ],
        pivots: ["two"],
        measures: ["three"],
    },
    {
        name: "Pivot table - sorting",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [
            { one: "test", two: "blabla", three: 23 },
            { one: "test2", two: "bkla", three: 3 },
            { one: "test2", two: "yolo", three: 521 },
            { one: "test2", two: "miau", three: 5212 },
            { one: "test3", two: "yolo", three: 552 },
            { one: "test4", two: "kuku", three: 21 },
            { one: "test5", two: "yolo", three: 33 },
            { one: "test6", two: "yolo", three: 51 },
            { one: "test6", two: "miau", three: 112 },
        ],
        pivots: ["two"],
        measures: ["three"],
        sorting: [{ name: "two", direction: "desc" }],
    },
    {
        name: "Pivot table - sorting 2 columns",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [
            { one: "test", two: "blabla", three: 23 },
            { one: "test2", two: "bkla", three: 3 },
            { one: "test2", two: "yolo", three: 521 },
            { one: "test2", two: "miau", three: 5212 },
            { one: "test3", two: "yolo", three: 552 },
            { one: "test4", two: "kuku", three: 21 },
            { one: "test5", two: "yolo", three: 33 },
            { one: "test6", two: "yolo", three: 51 },
            { one: "test6", two: "miau", three: 112 },
        ],
        pivots: ["two"],
        measures: ["three"],
        sorting: [
            { name: "one", direction: "asc" },
            { name: "two", direction: "desc" },
        ],
    },
    {
        name: "Pivot table - sorting measures",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [
            { one: "test", two: "blabla", three: 23 },
            { one: "test2", two: "bkla", three: 3 },
            { one: "test2", two: "yolo", three: 521 },
            { one: "test2", two: "miau", three: 5212 },
            { one: "test3", two: "yolo", three: 552 },
            { one: "test4", two: "kuku", three: 21 },
            { one: "test5", two: "yolo", three: 33 },
            { one: "test6", two: "yolo", three: 51 },
            { one: "test6", two: "miau", three: 112 },
        ],
        pivots: ["two"],
        measures: ["three"],
        sorting: [
            { name: "one", direction: "asc" },
            { name: "two", direction: "desc" },
            { name: "three", direction: "asc" },
        ],
    },
    {
        name: "Pivot table - no columns",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [
            { one: "test", two: "blabla", three: 23 },
            { one: "test2", two: "bkla", three: 3 },
            { one: "test2", two: "yolo", three: 521 },
            { one: "test2", two: "miau", three: 521 },
            { one: "test3", two: "yolo", three: 552 },
            { one: "test4", two: "kuku", three: 21 },
            { one: "test5", two: "yolo", three: 33 },
            { one: "test6", two: "yolo", three: 51 },
            { one: "test6", two: "miau", three: 112 },
        ],
        pivots: ["one", "two"],
        measures: ["three"],
    },
    {
        name: "Pivot table - no columns",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }, { id: "four", name: "Four", }],
        rows: [
            { one: "test", two: "blabla", three: 23, four: 512 },
            { one: "test2", two: "bkla", three: 3, four: 214 },
            { one: "test2", two: "yolo", three: 521, four: 512 },
            { one: "test2", two: "miau", three: 521, four: 33 },
            { one: "test3", two: "yolo", three: 552, four: 512 },
            { one: "test4", two: "kuku", three: 21, four: 512 },
            { one: "test5", two: "yolo", three: 33, four: 421 },
            { one: "test6", two: "yolo", three: 51, four: 11 },
            { one: "test6", two: "miau", three: 112, four: 512 },
        ],
        pivots: ["one", "two"],
        measures: ["three", "four"],
    },
    {
        name: "Pivot table - no measures",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }, { id: "four", name: "Four", }],
        rows: [
            { one: "test", two: "blabla", three: 23, four: 512 },
            { one: "test2", two: "bkla", three: 3, four: 214 },
            { one: "test2", two: "yolo", three: 521, four: 512 },
            { one: "test2", two: "miau", three: 521, four: 33 },
            { one: "test3", two: "yolo", three: 552, four: 512 },
            { one: "test4", two: "kuku", three: 21, four: 512 },
            { one: "test5", two: "yolo", three: 33, four: 421 },
            { one: "test6", two: "yolo", three: 51, four: 11 },
            { one: "test6", two: "miau", three: 112, four: 512 },
        ],
        pivots: ["one", "two"],
        measures: [],
    },
    {
        name: "Pivot table - no columns, no measures",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [
            { one: "test", two: "blabla", three: 23 },
            { one: "test2", two: "bkla", three: 3 },
            { one: "test2", two: "yolo", three: 521 },
            { one: "test2", two: "miau", three: 521 },
            { one: "test3", two: "yolo", three: 552 },
            { one: "test4", two: "kuku", three: 21 },
            { one: "test5", two: "yolo", three: 33 },
            { one: "test6", two: "yolo", three: 51 },
            { one: "test6", two: "miau", three: 112 },
        ],
        pivots: ["one", "two", "three"],
        measures: [],
    },
    {
        name: "Pivot table - no rows",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [],
        pivots: ["two"],
        measures: ["three"],
    },
    {
        name: "Pivot table - no rows, no measures",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [],
        pivots: ["two"],
        measures: [],
    },
    {
        name: "Pivot table - no rows, no measures, no columns",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [],
        pivots: ["one", "two", "three"],
        measures: [],
    },
    {
        name: "Pivot table - no rows, no columns",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }],
        rows: [],
        pivots: ["one", "two"],
        measures: ["three"],
    },
    {
        name: "Pivot table - no rows, no columns",
        fields: [{ id: "one", name: "One" }, { id: "two", name: "Two" }, { id: "three", name: "Three" }, { id: "four", name: "Four", }],
        rows: [],
        pivots: ["one", "two"],
        measures: ["three", "four"],
    },
];