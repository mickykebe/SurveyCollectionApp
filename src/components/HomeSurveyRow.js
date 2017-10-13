import React from 'react';
import { withRouter } from 'react-router';
import { TableRow, TableCell } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import CreateIcon from 'material-ui-icons/Create';
import DeleteIcon from 'material-ui-icons/Delete';
import ResponseIcon from 'material-ui-icons/AssignmentInd';
import { valFromLangObj } from 'utils';

function HomeSurveyRow({ id, title, description, languages, history, onDeleteSurvey }) {
  const languagesStr = languages.slice(1).reduce((langText, lang, i) => {
    return `${langText}, ${lang.name}`;
  }, languages[0].name);
  return (
    <TableRow
      hover>
      <TableCell>{valFromLangObj(title)}</TableCell>
      <TableCell>{`${valFromLangObj(description).substr(0, 20)}...`}</TableCell>
      <TableCell>
        <span>
          {languagesStr}
        </span>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => history.push(`/surveys/responses/${id}`)}>
          <ResponseIcon />
        </IconButton>
        <IconButton onClick={() => history.push(`/surveys/edit/${id}`)}>
          <CreateIcon />
        </IconButton>
        <IconButton onClick={() => onDeleteSurvey(id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default withRouter(HomeSurveyRow);