import React from "react";
import { compose } from "redux";
import { withRouter } from "react-router";
import IconButton from "material-ui/IconButton";
import { withStyles } from "material-ui/styles";
import { TableRow, TableCell } from "material-ui/Table";
import Tooltip from "material-ui/Tooltip";
import CreateIcon from "material-ui-icons/Create";
import DeleteIcon from "material-ui-icons/Delete";
import PublishIcon from "material-ui-icons/Publish";
import ResponseIcon from "material-ui-icons/AssignmentInd";
import OverlayLoading from "./OverlayLoading";
import { valFromLangObj } from "utils";

const styles = theme => ({
  actions: {
    position: "relative"
  },
  loadingSpinner: {
    width: `${theme.spacing.unit * 2}px !important`,
    height: `${theme.spacing.unit * 2}px !important`
  }
});

function HomeSurveyRow({
  survey,
  languages,
  history,
  onDeleteSurvey,
  isUpdating,
  classes,
  publish
}) {
  const { uuid: id, active, title, description } = survey;
  const languagesStr = languages.slice(1).reduce((langText, lang, i) => {
    return `${langText}, ${lang.name}`;
  }, languages[0].name);
  return (
    <TableRow hover>
      <TableCell>{valFromLangObj(title)}</TableCell>
      <TableCell>{`${valFromLangObj(description).substr(0, 20)}...`}</TableCell>
      <TableCell>
        <span>{languagesStr}</span>
      </TableCell>
      <TableCell className={classes.actions}>
        {active && (
          <Tooltip title="View responses" placement="bottom">
            <IconButton
              onClick={() => history.push(`/surveys/responses/${id}`)}
            >
              <ResponseIcon />
            </IconButton>
          </Tooltip>
        )}
        {!active && (
          <Tooltip title="Publish survey" placement="bottom">
            <IconButton onClick={publish}>
              <PublishIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Edit survey" placement="bottom">
          <IconButton onClick={() => history.push(`/surveys/edit/${id}`)}>
            <CreateIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete survey" placement="bottom">
          <IconButton onClick={() => onDeleteSurvey(id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        {isUpdating && (
          <OverlayLoading classes={{ spinner: classes.loadingSpinner }} />
        )}
      </TableCell>
    </TableRow>
  );
}

export default compose(withRouter, withStyles(styles))(HomeSurveyRow);
