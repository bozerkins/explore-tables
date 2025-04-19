import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
    Table,
    TableContainer,
    TableRow,
    ColumnTitle,
    ColumnValue,
    PivotTitle,
    PivotValue,
    MeasureTitle,
    MeasureValue
} from '../../lib/PivotTable/TableParts/TableParts';

describe('TableParts', () => {
    describe('Table', () => {
        it('renders table with correct className', () => {
            const { container } = render(
                <Table>
                    <tbody>
                        <tr><td>Test Content</td></tr>
                    </tbody>
                </Table>
            );
            const table = container.querySelector('.explore-table');
            expect(table).toBeInTheDocument();
            expect(table).toHaveTextContent('Test Content');
        });
    });

    describe('TableContainer', () => {
        it('renders container with correct className', () => {
            const { container } = render(
                <TableContainer>
                    <Table>
                        <tbody>
                            <tr><td>Test Content</td></tr>
                        </tbody>
                    </Table>
                </TableContainer>
            );
            const tableContainer = container.querySelector('.explore-table-container');
            expect(tableContainer).toBeInTheDocument();
            expect(tableContainer).toHaveClass('explore-smooth-scroll');
            expect(tableContainer).toHaveTextContent('Test Content');
        });
    });

    describe('TableRow', () => {
        it('renders row with correct className', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <TableRow>
                            <td>Test Content</td>
                        </TableRow>
                    </tbody>
                </table>
            );
            const row = container.querySelector('.explore-table-row');
            expect(row).toBeInTheDocument();
            expect(row).toHaveTextContent('Test Content');
        });
    });

    describe('ColumnTitle', () => {
        it('renders normal column title', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <tr>
                            <ColumnTitle title="Test Title" colSpan={2} />
                        </tr>
                    </tbody>
                </table>
            );
            const cell = container.querySelector('.explore-column-title');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveTextContent('Test Title');
            expect(cell).toHaveAttribute('colspan', '2');
        });

        it('renders empty column title', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <tr>
                            <ColumnTitle title="Test Title" colSpan={2} empty={true} />
                        </tr>
                    </tbody>
                </table>
            );
            const cell = container.querySelector('.explore-column-title');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveClass('explore-empty-sign');
            expect(cell).toHaveAttribute('colspan', '2');
            expect(cell?.textContent).toBe('\u00A0');
        });
    });

    describe('ColumnValue', () => {
        it('renders normal column value', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <tr>
                            <ColumnValue value="Test Value" colSpan={2} />
                        </tr>
                    </tbody>
                </table>
            );
            const cell = container.querySelector('.explore-column-value');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveTextContent('Test Value');
            expect(cell).toHaveAttribute('colspan', '2');
        });

        it('renders empty column value', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <tr>
                            <ColumnValue value="Test Value" colSpan={2} empty={true} />
                        </tr>
                    </tbody>
                </table>
            );
            const cell = container.querySelector('.explore-column-value');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveClass('explore-empty-sign');
            expect(cell).toHaveAttribute('colspan', '2');
            expect(cell?.textContent).toBe('∅');
        });
    });

    describe('PivotTitle', () => {
        it('renders pivot title correctly', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <tr>
                            <PivotTitle title="Test Pivot" colSpan={2} />
                        </tr>
                    </tbody>
                </table>
            );
            const cell = container.querySelector('.explore-pivot-title');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveTextContent('Test Pivot');
            expect(cell).toHaveAttribute('colspan', '2');
        });
    });

    describe('PivotValue', () => {
        it('renders normal pivot value', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <tr>
                            <PivotValue value="Test Value" colSpan={2} />
                        </tr>
                    </tbody>
                </table>
            );
            const cell = container.querySelector('.explore-pivot-value');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveTextContent('Test Value');
            expect(cell).toHaveAttribute('colspan', '2');
        });

        it('renders empty pivot value', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <tr>
                            <PivotValue value="Test Value" colSpan={2} empty={true} />
                        </tr>
                    </tbody>
                </table>
            );
            const cell = container.querySelector('.explore-pivot-value');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveClass('explore-empty-sign');
            expect(cell).toHaveAttribute('colspan', '2');
            expect(cell?.textContent).toBe('∅');
        });
    });

    describe('MeasureTitle', () => {
        it('renders normal measure title', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <tr>
                            <MeasureTitle title="Test Measure" colSpan={2} />
                        </tr>
                    </tbody>
                </table>
            );
            const cell = container.querySelector('.explore-measure-title');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveTextContent('Test Measure');
            expect(cell).toHaveAttribute('colspan', '2');
        });

        it('renders empty measure title', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <tr>
                            <MeasureTitle title="Test Measure" colSpan={2} empty={true} />
                        </tr>
                    </tbody>
                </table>
            );
            const cell = container.querySelector('.explore-measure-title');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveClass('explore-empty-sign');
            expect(cell).toHaveAttribute('colspan', '2');
            expect(cell?.textContent).toBe('\u00A0');
        });
    });

    describe('MeasureValue', () => {
        it('renders normal measure value', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <tr>
                            <MeasureValue value="Test Value" colSpan={2} />
                        </tr>
                    </tbody>
                </table>
            );
            const cell = container.querySelector('.explore-measure-value');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveTextContent('Test Value');
            expect(cell).toHaveAttribute('colspan', '2');
        });

        it('renders empty measure value', () => {
            const { container } = render(
                <table>
                    <tbody>
                        <tr>
                            <MeasureValue value="Test Value" colSpan={2} empty={true} />
                        </tr>
                    </tbody>
                </table>
            );
            const cell = container.querySelector('.explore-measure-value');
            expect(cell).toBeInTheDocument();
            expect(cell).toHaveClass('explore-empty-sign');
            expect(cell).toHaveAttribute('colspan', '2');
            expect(cell?.textContent).toBe('∅');
        });
    });
});
