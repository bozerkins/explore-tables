declare const tests: Array<{
    name: string;
    fields: Array<{
        id: string;
        name: string;
    }>;
    rows: Array<any>;
    pivots: Array<string>;
    measures: Array<string>;
}>;
export default tests;
