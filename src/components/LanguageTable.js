import React from 'react';
import Paper from 'material-ui/Paper';
import Table, { TableBody } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import TableToolbar from './table/TableToolbar';
import AddLanguageRowContainer from '../containers/AddLanguageRowContainer';
import LanguageRowContainer from '../containers/LanguageRowContainer';

const styles = theme => ({
  root: {
    position: 'relative',
    overflowX: 'auto',
  }
})

function LanguageTable({ classes, languages }) {
  return (
    <div>
      <Paper className={classes.root}>
        <TableToolbar title="Languages" />
        <Table>
          <TableBody>
            <AddLanguageRowContainer />
            {
              languages.map((language) =>
                <LanguageRowContainer
                  key={language.uuid} 
                  language={language} />)
            }
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(LanguageTable);