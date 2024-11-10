interface TableRow {
    one: string;
    two: string;
    three: string;
    four: string;
    five: number;
    six: number;
}

function generateRandomDataset(count: number = 50): TableRow[] {
    // Sample values for each column
    const oneValues = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'omega', 'sigma', 'theta'];
    // const twoValues = ['blabla', 'yolo', 'miau', 'kuku', 'wow', 'awesome', 'cool', 'nice'];
    const twoValues = ['blabla', 'yolo',];
    const fourValues = ['blabla', 'olala', 'hello', 'world', 'test', 'data', 'random'];
    const fiveValues = ['blabla', 'value1', 'value2', 'value3', 'value4', 'value5'];

    const getRandomElement = <T>(arr: T[]): T =>
        arr[Math.floor(Math.random() * arr.length)];

    const dimensions = [... new Set(Array.from({ length: count }, (_) => (
        `${getRandomElement(oneValues)}|${getRandomElement(twoValues)}|${getRandomElement(fourValues)}|${getRandomElement(fiveValues)}`
    )))];

    return dimensions.map(dimension => {
        const [one, two, three, four] = dimension.split("|");
        return {
            one,
            two,
            three,
            four,
            five: Math.floor(Math.random() * 100),
            six: Math.floor(Math.random() * 100),
        }
    });
}

export { generateRandomDataset };