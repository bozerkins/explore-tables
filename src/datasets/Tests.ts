const tests: Array<{
    name: string,
    fields: Array<{
        id: string,
        name: string
    }>,
    rows: Array<any>,
    pivots: Array<string>,
    measures: Array<string>
}> = [
        {
            name: "Basic table",
            fields: [
                { id: "product", name: "Product" },
                { id: "region", name: "Region" },
                { id: "revenue", name: "Revenue" }
            ],
            rows: [
                { product: "Laptop Pro", region: "North America", revenue: 125000 },
                { product: "Tablet Air", region: "Europe", revenue: 85000 },
                { product: "SmartPhone X", region: "Asia Pacific", revenue: 95000 },
                { product: "Laptop Pro", region: "Europe", revenue: 115000 },
                { product: "SmartPhone X", region: "North America", revenue: 78000 },
                { product: "Tablet Air", region: "Asia Pacific", revenue: 66000 },
            ],
            pivots: [],
            measures: ["revenue"],
        },
        {
            name: "Basic table - only measures",
            fields: [
                { id: "total_revenue", name: "Total Revenue" }
            ],
            rows: [
                { total_revenue: 564000 }
            ],
            pivots: [],
            measures: ["total_revenue"],
        },
        {
            name: "Basic table - only measures, no data",
            fields: [
                { id: "total_revenue", name: "Total Revenue" }
            ],
            rows: [],
            pivots: [],
            measures: ["total_revenue"],
        },
        {
            name: "Basic table - no measures",
            fields: [
                { id: "product", name: "Product" },
                { id: "category", name: "Category" },
                { id: "quantity", name: "Quantity" }
            ],
            rows: [
                { product: "Laptop Pro", category: "Electronics", quantity: 230 },
                { product: "Tablet Air", category: "Electronics", quantity: 340 },
                { product: "SmartPhone X", category: "Mobile", quantity: 475 },
                { product: "Laptop Pro", category: "Electronics", quantity: 250 },
                { product: "SmartPhone X", category: "Mobile", quantity: 390 },
                { product: "Tablet Air", category: "Electronics", quantity: 264 },
            ],
            pivots: [],
            measures: [],
        },
        {
            name: "Basic table - no rows",
            fields: [
                { id: "product", name: "Product" },
                { id: "category", name: "Category" },
                { id: "quantity", name: "Quantity" }
            ],
            rows: [],
            pivots: [],
            measures: ["quantity"],
        },
        {
            name: "Basic table - no rows, no measures",
            fields: [
                { id: "product", name: "Product" },
                { id: "category", name: "Category" },
                { id: "quantity", name: "Quantity" }
            ],
            rows: [],
            pivots: [],
            measures: [],
        },
        {
            name: "Pivot table",
            fields: [
                { id: "product", name: "Product" },
                { id: "region", name: "Region" },
                { id: "quantity", name: "Quantity" }
            ],
            rows: [
                { product: "Laptop Pro", region: "North America", quantity: 230 },
                { product: "Tablet Air", region: "Europe", quantity: 340 },
                { product: "SmartPhone X", region: "Asia Pacific", quantity: 475 },
                { product: "Laptop Pro", region: "Europe", quantity: 250 },
                { product: "SmartPhone X", region: "North America", quantity: 390 },
                { product: "Tablet Air", region: "Asia Pacific", quantity: 264 },
                { product: "SmartPhone X", region: "Europe", quantity: 521 },
                { product: "Laptop Pro", region: "Asia Pacific", quantity: 552 },
                { product: "Tablet Air", region: "North America", quantity: 321 },
            ],
            pivots: ["region"],
            measures: ["quantity"],
        },
        {
            name: "Pivot table - no columns",
            fields: [
                { id: "product", name: "Product" },
                { id: "region", name: "Region" },
                { id: "quantity", name: "Quantity" }
            ],
            rows: [
                { product: "Laptop Pro", region: "North America", quantity: 230 },
                { product: "Tablet Air", region: "Europe", quantity: 340 },
                { product: "SmartPhone X", region: "Asia Pacific", quantity: 475 },
                { product: "Laptop Pro", region: "Europe", quantity: 250 },
                { product: "SmartPhone X", region: "North America", quantity: 390 },
                { product: "Tablet Air", region: "Asia Pacific", quantity: 264 },
                { product: "SmartPhone X", region: "Europe", quantity: 521 },
                { product: "Laptop Pro", region: "Asia Pacific", quantity: 552 },
                { product: "Tablet Air", region: "North America", quantity: 321 },
            ],
            pivots: ["product", "region"],
            measures: ["quantity"],
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
            name: "Pivot table - multiple measures",
            fields: [
                { id: "product", name: "Product" },
                { id: "region", name: "Region" },
                { id: "quantity", name: "Quantity" },
                { id: "revenue", name: "Revenue" }
            ],
            rows: [
                { product: "Laptop Pro", region: "North America", quantity: 230, revenue: 345000 },
                { product: "Tablet Air", region: "Europe", quantity: 340, revenue: 238000 },
                { product: "SmartPhone X", region: "Asia Pacific", quantity: 475, revenue: 332500 },
                { product: "Laptop Pro", region: "Europe", quantity: 250, revenue: 375000 },
                { product: "SmartPhone X", region: "North America", quantity: 390, revenue: 273000 },
                { product: "Tablet Air", region: "Asia Pacific", quantity: 264, revenue: 184800 },
                { product: "SmartPhone X", region: "Europe", quantity: 521, revenue: 364700 },
                { product: "Laptop Pro", region: "Asia Pacific", quantity: 552, revenue: 828000 },
                { product: "Tablet Air", region: "North America", quantity: 321, revenue: 224700 },
            ],
            pivots: ["product", "region"],
            measures: ["quantity", "revenue"],
        },
        {
            name: "Pivot table - no measures",
            fields: [
                { id: "product", name: "Product" },
                { id: "region", name: "Region" },
                { id: "quantity", name: "Quantity" },
                { id: "revenue", name: "Revenue" }
            ],
            rows: [
                { product: "Laptop Pro", region: "North America", quantity: 230, revenue: 345000 },
                { product: "Tablet Air", region: "Europe", quantity: 340, revenue: 238000 },
                { product: "SmartPhone X", region: "Asia Pacific", quantity: 475, revenue: 332500 },
                { product: "Laptop Pro", region: "Europe", quantity: 250, revenue: 375000 },
                { product: "SmartPhone X", region: "North America", quantity: 390, revenue: 273000 },
                { product: "Tablet Air", region: "Asia Pacific", quantity: 264, revenue: 184800 },
                { product: "SmartPhone X", region: "Europe", quantity: 521, revenue: 364700 },
                { product: "Laptop Pro", region: "Asia Pacific", quantity: 552, revenue: 828000 },
                { product: "Tablet Air", region: "North America", quantity: 321, revenue: 224700 },
            ],
            pivots: ["product", "region"],
            measures: [],
        },
        {
            name: "Pivot table - no columns, no measures",
            fields: [
                { id: "product", name: "Product" },
                { id: "region", name: "Region" },
                { id: "sales", name: "Sales" }
            ],
            rows: [
                { product: "Laptop", region: "North", sales: 230 },
                { product: "Desktop", region: "South", sales: 310 },
                { product: "Desktop", region: "East", sales: 521 },
                { product: "Desktop", region: "West", sales: 521 },
                { product: "Tablet", region: "East", sales: 552 },
                { product: "Phone", region: "Central", sales: 210 },
                { product: "Monitor", region: "East", sales: 330 },
                { product: "Printer", region: "East", sales: 510 },
                { product: "Printer", region: "West", sales: 412 },
            ],
            pivots: ["product", "region", "sales"],
            measures: [],
        },
        {
            name: "Pivot table - no rows",
            fields: [
                { id: "product", name: "Product" },
                { id: "region", name: "Region" },
                { id: "sales", name: "Sales" }
            ],
            rows: [],
            pivots: ["region"],
            measures: ["sales"],
        },
        {
            name: "Pivot table - no rows, no measures",
            fields: [
                { id: "product", name: "Product" },
                { id: "region", name: "Region" },
                { id: "sales", name: "Sales" }
            ],
            rows: [],
            pivots: ["region"],
            measures: [],
        },
        {
            name: "Pivot table - no rows, no measures, no columns",
            fields: [
                { id: "product", name: "Product" },
                { id: "region", name: "Region" },
                { id: "sales", name: "Sales" }
            ],
            rows: [],
            pivots: ["product", "region", "sales"],
            measures: [],
        },
        {
            name: "Pivot table - no rows, no columns",
            fields: [
                { id: "product", name: "Product" },
                { id: "region", name: "Region" },
                { id: "sales", name: "Sales" }
            ],
            rows: [],
            pivots: ["product", "region"],
            measures: ["sales"],
        },
        {
            name: "Pivot table - no rows, no columns",
            fields: [
                { id: "product", name: "Product" },
                { id: "region", name: "Region" },
                { id: "sales", name: "Sales" },
                { id: "units", name: "Units" }
            ],
            rows: [],
            pivots: ["product", "region"],
            measures: ["sales", "units"],
        },
    ];

export default tests;