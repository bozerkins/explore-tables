import { Dimension, Measure } from './DataAggregator';
import dataset from './FuelConsumption.json'

// TODO: Create examples with this dataset. It looks super cool
// Source: https://open.canada.ca/data/en/dataset/98f1a129-f628-4ce4-b24d-6f16bf24dd64/resource/42495676-28b7-40f3-b0e0-3d7fe005ca56
const converted: Array<Record<string, any>> = [];
dataset.records.forEach(record => {
    const convertedRecord: Record<string, any> = {};
    dataset.fields.forEach((field: any, index) => {
        convertedRecord[field.id] = record[index];
    });
    converted.push(convertedRecord);
});

const model: { dimensions: Dimension[], measures: Measure[] } = {
    dimensions: dataset.fields,
    measures: [
        {
            "id": "number_of_records",
            "name": "Number of Records",
            "aggregate": "count"
        },
    ],
}

export { model, converted as dataset };