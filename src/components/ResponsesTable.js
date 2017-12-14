import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import { MenuItem } from "material-ui/Menu";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Table, { TableBody, TableRow, TableCell } from "material-ui/Table";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import DescriptionIcon from "material-ui-icons/Description";
import FileDownloadIcon from "material-ui-icons/FileDownload";
import AnswerValue from "./AnswerValue";
import CollapsedMenu from "./CollapsedMenu";
import OverlayLoading from "./OverlayLoading";
import ResponseAnswerContainer from "../containers/ResponseAnswerContainer";
import TableHeadRow from "./table/TableHeadRow";
import TableFootRow from "./table/TableFootRow";
import { valFromLangObj } from "../utils";

const styles = theme => ({
  root: {
    position: "relative",
    overflowX: "auto"
  },
  table: {
    minWidth: 800
  },
  loadMoreBtn: {
    display: "block",
    margin: "0 auto"
  },
  spacer: {
    flex: 1
  },
  headerIcon: {
    color: theme.palette.common.lightBlack
  },
  title: {
    paddingLeft: theme.spacing.unit * 2
  }
});

class ResponsesTable extends Component {
  render() {
    const {
      classes,
      survey,
      fetchingSurvey,
      columnQuestions,
      responses,
      fetchingResponses,
      hasMore,
      onFetchMore,
      downloadResponses
    } = this.props;
    const columns = columnQuestions.map((question, i) => ({
      id: `${i}`,
      label: valFromLangObj(question.title)
    }));

    return (
      <Paper className={classes.root}>
        <AppBar position="static" color="default" elevation={2}>
          <Toolbar>
            <DescriptionIcon className={classes.headerIcon} />
            <Typography
              type="title"
              color="secondary"
              className={classes.title}
            >
              {!!survey && valFromLangObj(survey.title)}
            </Typography>
            <div className={classes.spacer} />
            <CollapsedMenu
              render={handleMenuClose => {
                return [
                  <MenuItem
                    onClick={() => {
                      downloadResponses("csv");
                      handleMenuClose();
                    }}
                  >
                    <IconButton>
                      <FileDownloadIcon />
                    </IconButton>
                    Download responses (.csv)
                  </MenuItem>,
                  <MenuItem
                    onClick={() => {
                      downloadResponses("xlsx");
                      handleMenuClose();
                    }}
                  >
                    <IconButton>
                      <FileDownloadIcon />
                    </IconButton>
                    Download responses (.xlsx)
                  </MenuItem>
                ];
              }}
            />
          </Toolbar>
        </AppBar>
        {!!survey && (
          <div>
            <Table className={classes.table}>
              <TableHeadRow columns={columns} />
              <TableBody>
                {!responses.length && (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <Typography type="subheading" align="center">
                        Responses unavailable
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                {responses.map(response => (
                  <TableRow key={response.uuid} hover>
                    {columnQuestions.map(q => (
                      <ResponseAnswerContainer
                        key={q.uuid}
                        responseId={response.uuid}
                        questionId={q.uuid}
                        render={({ answer }) => (
                          <TableCell>
                            <AnswerValue
                              question={q}
                              value={answer.answer}
                              textFormat={true}
                            />
                          </TableCell>
                        )}
                      />
                    ))}
                  </TableRow>
                ))}
              </TableBody>
              {!fetchingResponses &&
                hasMore && (
                  <TableFootRow>
                    <Button
                      className={classes.loadMoreBtn}
                      raised
                      color="accent"
                      onClick={onFetchMore}
                    >
                      Load More
                    </Button>
                  </TableFootRow>
                )}
            </Table>
          </div>
        )}
        {(fetchingSurvey || fetchingResponses) && <OverlayLoading />}
      </Paper>
    );
  }
}

export default withStyles(styles)(ResponsesTable);
