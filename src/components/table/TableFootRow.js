import React from 'react';
import { 
  TableFooter,
  TableRow,
  TableCell,
} from 'material-ui/Table';

function TableFootRow({ classes, children }) {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={9000}>
          {children}
        </TableCell>
      </TableRow>
    </TableFooter>
  )
};

export default TableFootRow;