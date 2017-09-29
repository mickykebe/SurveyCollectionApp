import React from 'react';
import Paper from 'material-ui/Paper';
import Table, { TableBody } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import TableToolbar from './table/TableToolbar';
import TableHeadRow from './table/TableHeadRow';
import AddLanguageRowContainer from '../containers/AddLanguageRowContainer';
import LanguageRow from './LanguageRow';

const styles = theme => ({
  root: {
    position: 'relative',
    overflowX: 'auto',
  }
})

function LanguageTable({ classes, languages }) {
  const columns = [
    { id: 'code', label: 'Code'},
    { id: 'name', label: 'Name'},
    { id: 'actions', label: 'Actions'},
  ];
  return (
    <div>
      <Paper className={classes.root}>
        <TableToolbar title="Languages" />
        <Table>
          <TableBody>
            <AddLanguageRowContainer />
            {
              languages.map(({ uuid: id, code, name}) =>
                <LanguageRow
                  key={id} 
                  id={id}
                  code={code}
                  name={name} />)
            }
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(LanguageTable);