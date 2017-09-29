import React from 'react';
import IconButton from 'material-ui/IconButton';
import { TableRow, TableCell } from 'material-ui/Table';
import CreateIcon from 'material-ui-icons/Create';

function LanguageRow({ id, code, name }) {
  return (
    <TableRow>
      <TableCell>
        {code}
      </TableCell>
      <TableCell>
        {name}
      </TableCell>
      <TableCell>
        {/*<IconButton>
          <CreateIcon />
        </IconButton>*/}
      </TableCell>
    </TableRow>
  );
}

export default LanguageRow;