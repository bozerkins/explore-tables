import { Dimension, Measure } from './DataAggregator';
import dataset from './FuelConsumption.json'

// Source: https://open.canada.ca/data/en/dataset/98f1a129-f628-4ce4-b24d-6f16bf24dd64/resource/42495676-28b7-40f3-b0e0-3d7fe005ca56
const converted: Array<Record<string, any>> = [];
dataset.records.forEach(record => {
    const convertedRecord: Record<string, any> = {};
    dataset.fields.forEach((field: any, index) => {
        convertedRecord[field.id] = record[index];
    });
    converted.push(convertedRecord);
});

const model: { fields: Dimension[], dimensions: Dimension[], measures: Measure[] } = {
    fields: dataset.fields,
    dimensions: [
        {
            "id": "model_year",
            "name": "Model year",
            "type": "text"
        },
        {
            "id": "vehicle_class",
            "name": "Vehicle class",
            "type": "text"
        },
        {
            "id": "cylinders",
            "name": "Cylinders",
            "type": "text"
        },
        {
            "id": "transmission",
            "name": "Transmission",
            "type": "text"
        },
        {
            "id": "fuel_type",
            "name": "Fuel type",
            "type": "text"
        },
        {
            "id": "model",
            "name": "Model",
            "type": "text"
        },
        {
            "id": "make",
            "name": "Make",
            "type": "text"
        },
        {
            "id": "engine_size",
            "name": "Engine size (L)",
            "type": "text"
        },
    ],
    measures: [
        {
            "id": "number_of_records",
            "name": "Count",
            "aggregate": "count"
        },
        {
            "id": "avg_city_consumption",
            "name": "Avg City (L/100 km)",
            "aggregate": "avg",
            "field": "city_litter_per_100_km"
        },
        {
            "id": "avg_highway_consumption",
            "name": "Avg Highway (L/100 km)",
            "aggregate": "avg",
            "field": "highway_litter_per_100_km"
        },
        {
            "id": "avg_combined_consumption",
            "name": "Avg Combined (L/100 km)",
            "aggregate": "avg",
            "field": "combined_litter_per_100_km"
        },
        {
            "id": "avg_combined_mpg",
            "name": "Avg MPG",
            "aggregate": "avg",
            "field": "combined_mpg"
        },
        {
            "id": "avg_co2_emissions",
            "name": "Avg CO2 (g/km)",
            "aggregate": "avg",
            "field": "co2_emissions_g_per_km"
        },
        {
            "id": "max_city_consumption",
            "name": "Max City (L/100 km)",
            "aggregate": "max",
            "field": "city_litter_per_100_km"
        },
        {
            "id": "min_city_consumption",
            "name": "Min City (L/100 km)",
            "aggregate": "min",
            "field": "city_litter_per_100_km"
        },
        {
            "id": "avg_engine_size",
            "name": "Avg Engine (L)",
            "aggregate": "avg",
            "field": "engine_size"
        }

    ]
};

export { model, converted as dataset };