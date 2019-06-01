import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        columns: [
            { name: 'ID', title: '#' },
            { name: 'Word', title: 'Word' },
            { name: 'Frequency', title: 'Frequency' },
          ],
        rows: []
        };
  }

componentWillReceiveProps(nextProps){
    if(nextProps.gridValuesTopNGrid !== this.props.gridValuesTopNGrid){
        // console.log(nextProps.gridValuesTopNGrid);
        // console.log(this.props.gridValuesTopNGrid);
        this.setState({rows: nextProps.gridValuesTopNGrid});
    }

}
  render() {
    //   console.log(this.props.gridValuesTopNGrid)
    const { rows, columns } = this.state;
    return (
        < Paper>
            <Grid
                rows={rows}
                columns={columns}
                >
            <Table />
            <TableHeaderRow />
            </Grid>
        </Paper>
    );
  }
}