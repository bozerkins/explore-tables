import PivotTableMatrix from '../lib/PivotTable/PivotTableMatrix';

const rows = [
    { category: 'Furniture', product: 'Chair', region: 'North', sales: 100 },
    { category: 'Furniture', product: 'Table', region: 'North', sales: 250 },
    { category: 'Electronics', product: 'Phone', region: 'South', sales: 300 },
    { category: 'Electronics', product: 'Laptop', region: 'South', sales: 1200 },
];

const rowsArrayBased = [
    ['Furniture', 'Chair', 'North', 100],
    ['Furniture', 'Table', 'North', 250],
    ['Electronics', 'Phone', 'South', 300],
    ['Electronics', 'Laptop', 'South', 1200],
]

const fields = [
    { id: 'category', name: 'Category' },
    { id: 'product', name: 'Product' },
    { id: 'region', name: 'Region' },
    { id: 'sales', name: 'Sales' }
];
const dimensions = ['category', 'product'];
const measures = ['sales'];
const pivots = ['region'];

describe('PivotTableMatrix', () => {
    it(`detects type of payload properly`, () => {
        expect(() => {
            PivotTableMatrix.createFromPayload({ rows: {} as any, fields }, { dimensions, measures, pivots });
        }).toThrow(`Property "rows" must be an array of elements`);
    })
    it(`creates matrix correctly with array of objects`, () => {
        const matrix = PivotTableMatrix.createFromPayload({ rows, fields }, { dimensions, measures, pivots });
        expect(matrix.measures).toEqual(measures);
        expect(matrix.columns).toEqual(dimensions);
        expect(matrix.pivots).toEqual(pivots);
        for (let field of fields) {
            expect(matrix.fieldMap.get(field.id)).toBe(field.name);
        }

        const expectedValueMapTree = [
            {
                columnValueMap: new Map([
                    ['category', 'Furniture'],
                    ['product', 'Chair']
                ]),
                children: [
                    {
                        pivotValueMap: new Map([
                            ['region', 'North']
                        ]),
                        measureValueMap: new Map([
                            ['sales', 100]
                        ])
                    },
                    {
                        pivotValueMap: new Map([
                            ['region', 'South']
                        ]),
                        measureValueMap: new Map([
                            ['sales', null]
                        ])
                    }
                ]
            },
            {
                columnValueMap: new Map([
                    ['category', 'Furniture'],
                    ['product', 'Table']
                ]),
                children: [
                    {
                        pivotValueMap: new Map([
                            ['region', 'North']
                        ]),
                        measureValueMap: new Map([
                            ['sales', 250]
                        ])
                    },
                    {
                        pivotValueMap: new Map([
                            ['region', 'South']
                        ]),
                        measureValueMap: new Map([
                            ['sales', null]
                        ])
                    }
                ]
            },
            {
                columnValueMap: new Map([
                    ['category', 'Electronics'],
                    ['product', 'Phone']
                ]),
                children: [
                    {
                        pivotValueMap: new Map([
                            ['region', 'North']
                        ]),
                        measureValueMap: new Map([
                            ['sales', null]
                        ])
                    },
                    {
                        pivotValueMap: new Map([
                            ['region', 'South']
                        ]),
                        measureValueMap: new Map([
                            ['sales', 300]
                        ])
                    }
                ]
            },
            {
                columnValueMap: new Map([
                    ['category', 'Electronics'],
                    ['product', 'Laptop']
                ]),
                children: [
                    {
                        pivotValueMap: new Map([
                            ['region', 'North']
                        ]),
                        measureValueMap: new Map([
                            ['sales', null]
                        ])
                    },
                    {
                        pivotValueMap: new Map([
                            ['region', 'South']
                        ]),
                        measureValueMap: new Map([
                            ['sales', 1200]
                        ])
                    }
                ]
            }
        ];
        expect(matrix.valueMapTree).toEqual(expectedValueMapTree);

        const expectedColumnValueMap = [
            {
                hash: 'Furniture|Chair',
                valueMap: new Map([
                    ['category', 'Furniture'],
                    ['product', 'Chair']
                ])
            },
            {
                hash: 'Furniture|Table',
                valueMap: new Map([
                    ['category', 'Furniture'],
                    ['product', 'Table']
                ])
            },
            {
                hash: 'Electronics|Phone',
                valueMap: new Map([
                    ['category', 'Electronics'],
                    ['product', 'Phone']
                ])
            },
            {
                hash: 'Electronics|Laptop',
                valueMap: new Map([
                    ['category', 'Electronics'],
                    ['product', 'Laptop']
                ])
            }
        ];
        expect(matrix.columnValueMap).toEqual(expectedColumnValueMap);

        const expectedPivotValueMap = [
            {
                hash: 'North',
                valueMap: new Map([
                    ['region', 'North']
                ])
            },
            {
                hash: 'South',
                valueMap: new Map([
                    ['region', 'South']
                ])
            }
        ];
        expect(matrix.pivotValueMap).toEqual(expectedPivotValueMap);
    });

    it(`creates matrix correctly with array of arrays`, () => {
        const matrix = PivotTableMatrix.createFromPayload({ rows: rowsArrayBased, fields }, { dimensions, measures, pivots });
        expect(matrix.measures).toEqual(measures);
        expect(matrix.columns).toEqual(dimensions);
        expect(matrix.pivots).toEqual(pivots);
        for (let field of fields) {
            expect(matrix.fieldMap.get(field.id)).toBe(field.name);
        }

        const expectedValueMapTree = [
            {
                columnValueMap: new Map([
                    ['category', 'Furniture'],
                    ['product', 'Chair']
                ]),
                children: [
                    {
                        pivotValueMap: new Map([
                            ['region', 'North']
                        ]),
                        measureValueMap: new Map([
                            ['sales', 100]
                        ])
                    },
                    {
                        pivotValueMap: new Map([
                            ['region', 'South']
                        ]),
                        measureValueMap: new Map([
                            ['sales', null]
                        ])
                    }
                ]
            },
            {
                columnValueMap: new Map([
                    ['category', 'Furniture'],
                    ['product', 'Table']
                ]),
                children: [
                    {
                        pivotValueMap: new Map([
                            ['region', 'North']
                        ]),
                        measureValueMap: new Map([
                            ['sales', 250]
                        ])
                    },
                    {
                        pivotValueMap: new Map([
                            ['region', 'South']
                        ]),
                        measureValueMap: new Map([
                            ['sales', null]
                        ])
                    }
                ]
            },
            {
                columnValueMap: new Map([
                    ['category', 'Electronics'],
                    ['product', 'Phone']
                ]),
                children: [
                    {
                        pivotValueMap: new Map([
                            ['region', 'North']
                        ]),
                        measureValueMap: new Map([
                            ['sales', null]
                        ])
                    },
                    {
                        pivotValueMap: new Map([
                            ['region', 'South']
                        ]),
                        measureValueMap: new Map([
                            ['sales', 300]
                        ])
                    }
                ]
            },
            {
                columnValueMap: new Map([
                    ['category', 'Electronics'],
                    ['product', 'Laptop']
                ]),
                children: [
                    {
                        pivotValueMap: new Map([
                            ['region', 'North']
                        ]),
                        measureValueMap: new Map([
                            ['sales', null]
                        ])
                    },
                    {
                        pivotValueMap: new Map([
                            ['region', 'South']
                        ]),
                        measureValueMap: new Map([
                            ['sales', 1200]
                        ])
                    }
                ]
            }
        ];
        expect(matrix.valueMapTree).toEqual(expectedValueMapTree);

        const expectedColumnValueMap = [
            {
                hash: 'Furniture|Chair',
                valueMap: new Map([
                    ['category', 'Furniture'],
                    ['product', 'Chair']
                ])
            },
            {
                hash: 'Furniture|Table',
                valueMap: new Map([
                    ['category', 'Furniture'],
                    ['product', 'Table']
                ])
            },
            {
                hash: 'Electronics|Phone',
                valueMap: new Map([
                    ['category', 'Electronics'],
                    ['product', 'Phone']
                ])
            },
            {
                hash: 'Electronics|Laptop',
                valueMap: new Map([
                    ['category', 'Electronics'],
                    ['product', 'Laptop']
                ])
            }
        ];
        expect(matrix.columnValueMap).toEqual(expectedColumnValueMap);

        const expectedPivotValueMap = [
            {
                hash: 'North',
                valueMap: new Map([
                    ['region', 'North']
                ])
            },
            {
                hash: 'South',
                valueMap: new Map([
                    ['region', 'South']
                ])
            }
        ];
        expect(matrix.pivotValueMap).toEqual(expectedPivotValueMap);
    });
});