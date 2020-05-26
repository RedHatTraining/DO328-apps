import React from 'react';
import { Chart, ChartAxis, ChartGroup, ChartLine, ChartScatter, ChartThemeColor, ChartVoronoiContainer } from '@patternfly/react-charts';

export default class ScatterLineChart extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            width: 0,
            series: "",
        };
        this.handleResize = () => {
            if (this.containerRef.current && this.containerRef.current.clientWidth) {
                this.setState({ width: this.containerRef.current.clientWidth });
            }
        };

    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const { width } = this.state;

        var conv = []
        var maxYAxis = 0

        this.props.data.forEach(e => {
            var floatValue = parseFloat(e.value);
            if(floatValue > maxYAxis) {
                maxYAxis = floatValue 
            }

            const date = new Date(e.date)
            const dateString = `${date.getDate()}/${date.getMonth() + 1}`
            conv.unshift({
                name: this.props.target,
                x: dateString,
                y: floatValue
            })
        });

        const series = [
            {
                datapoints: conv,
                legendItem: { name: 'Conversion' }
            }
        ];

        return (
            <div ref={this.containerRef}>
                <div style={{ height: '275px' }}>
                    <Chart
                        ariaDesc="Exchange rate for given currency"
                        ariaTitle="Exchange Rate Graph"
                        containerComponent={
                            <ChartVoronoiContainer
                                labels={({ datum }) => datum.childName.includes('line-') ? `${datum.name}: ${datum.y}` : null}
                                constrainToVisibleArea
                            />
                        }
                        legendData={series.map(s => s.legendItem)}
                        legendPosition="bottom-left"
                        height={275}
                        maxDomain={{ y: maxYAxis + 0.2 }}
                        minDomain={{ y: 0 }}
                        padding={{
                            bottom: 75, // Adjusted to accommodate legend
                            left: 50,
                            right: 50,
                            top: 50
                        }}
                        themeColor={ChartThemeColor.blue}
                        width={width}
                    >
                        <ChartAxis tickValues={[2, 3, 4]} />
                        <ChartAxis dependentAxis showGrid tickValues={[2, 5, 8]} />
                        <ChartGroup>
                            {series.map((s, idx) => {
                                return (
                                    <ChartScatter
                                        data={s.datapoints}
                                        key={'scatter-' + idx}
                                        name={'scatter-' + idx}
                                    />
                                );
                            })}
                        </ChartGroup>
                        <ChartGroup>
                            {series.map((s, idx) => {
                                return (
                                    <ChartLine
                                        key={'line-' + idx}
                                        name={'line-' + idx}
                                        data={s.datapoints}
                                    />
                                );
                            })}
                        </ChartGroup>
                    </Chart>
                </div>
            </div>
        );
    }
}
