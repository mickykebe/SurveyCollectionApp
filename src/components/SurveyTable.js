import React, { Component } from "react";
import Table, { TableBody, TableRow, TableCell } from "material-ui/Table";
import Typography from "material-ui/Typography";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import PopupSnackbar from "./PopupSnackbar";
import OverlayLoading from "./OverlayLoading";
import TableHeadRow from "./table/TableHeadRow";
import TableFootRow from "./table/TableFootRow";
import HomeSurveyRowContainer from "../containers/HomeSurveyRowContainer";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing.unit * 2,
    overflowX: "auto"
  },
  table: {
    minWidth: 800
  },
  loadMoreBtn: {
    display: "block",
    margin: "0 auto"
  }
});

class SurveyTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteDialogOpen: false,
      surveyToDelete: null,
      isDeletingSurvey: false,
      deleteErrors: null
    };
    this.onDeleteSurvey = this.onDeleteSurvey.bind(this);
    this.deleteSurvey = this.deleteSurvey.bind(this);
    this.deleteDialogClose = this.deleteDialogClose.bind(this);
  }

  columns = [
    { id: "title", label: "Title" },
    { id: "description", label: "Description" },
    { id: "langauges", label: "Languages" },
    { id: "actions", label: "Actions" }
  ];

  componentDidMount() {
    this.props.fetchSurveyFeed();
  }

  onDeleteSurvey(id) {
    this.setState({
      deleteDialogOpen: true,
      surveyToDelete: id
    });
  }

  deleteSurvey() {
    const id = this.state.surveyToDelete;
    if (id !== null) {
      this.setState({
        isDeletingSurvey: true
      });

      this.props
        .deleteSurvey(id)
        .then(() =>
          this.setState({ isDeletingSurvey: false, surveyToDelete: null })
        )
        .catch(() =>
          this.setState({ isDeletingSurvey: false, deleteErrors: true })
        );
    }
    this.deleteDialogClose();
  }

  deleteDialogClose() {
    this.setState({
      deleteDialogOpen: false
    });
  }

  render() {
    const { classes, surveys, isFetching, fetchErrors, next } = this.props;
    const { isDeletingSurvey, deleteErrors } = this.state;

    return (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHeadRow columns={this.columns} />
          <TableBody>
            {!surveys.length && (
              <TableRow>
                <TableCell colSpan={this.columns.length}>
                  {!!fetchErrors && (
                    <Typography type="subheading" align="center">
                      Problem occurred fetching surveys.
                    </Typography>
                  )}
                  {!fetchErrors && (
                    <Typography type="subheading" align="center">
                      Surveys unavailable
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            )}
            {surveys.map(survey => (
              <HomeSurveyRowContainer
                key={survey.uuid}
                survey={survey}
                onDeleteSurvey={this.onDeleteSurvey}
              />
            ))}
          </TableBody>
          {!isFetching &&
            !!next && (
              <TableFootRow>
                <Button
                  className={classes.loadMoreBtn}
                  raised
                  color="accent"
                  onClick={this.props.fetchSurveyFeed}
                >
                  Load More
                </Button>
              </TableFootRow>
            )}
        </Table>
        {(isDeletingSurvey || isFetching) && <OverlayLoading />}
        <Dialog
          open={this.state.deleteDialogOpen}
          onRequestClose={this.deleteDialogClose}
        >
          <DialogTitle>Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this survey?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.deleteSurvey}>Yes</Button>
            <Button onClick={this.deleteDialogClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <PopupSnackbar
          show={!!deleteErrors && !isDeletingSurvey}
          message="Problem occurred deleting survey"
          retryAction={this.deleteSurvey}
        />
        <PopupSnackbar
          show={!isFetching && !!fetchErrors}
          message="Problem occurred fetching surveys"
          retryAction={this.props.fetchSurveyFeed}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SurveyTable);
