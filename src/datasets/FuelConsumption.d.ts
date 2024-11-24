import { Dimension, Measure } from './DataAggregator';
declare const converted: Array<Record<string, any>>;
declare const model: {
    fields: Dimension[];
    dimensions: Dimension[];
    measures: Measure[];
};
export { model, converted as dataset };
