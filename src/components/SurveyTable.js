import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import PopupSnackbar from './PopupSnackbar';
import Loading from './Loading';
import HomeSurveyRowContainer from '../containers/HomeSurveyRowContainer';
import { withStyles } from 'material-ui/styles';
import { valFromLangObj } from 'utils';

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
  grow: {
    flex: 1,
  },
  actions: {
    color: theme.palette.common.lightBlack,
  }
});

function TableToolbar({classes, onAddClick}) {
  return (
    <Toolbar className={classes.root}>
      <Typography type="title">
        Surveys
      </Typography>
      <div className={classes.grow} />
      <div className={classes.actions}>
        <IconButton onClick={onAddClick}>
          <AddIcon />
        </IconButton>
      </div>
    </Toolbar>
  );
}

TableToolbar = withStyles(toolbarStyles)(TableToolbar);

function TableHeadRow({ columnData }) {
  return (
    <TableHead>
      <TableRow>
        {
          columnData.map(column => 
            <TableCell key={column.id}>
              {column.label}
            </TableCell>)
        }
      </TableRow>
    </TableHead>
  );
}

const styles = theme => ({
  root: {
    position: 'relative',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }
});

class SurveyTable extends Component {
  constructor(props) {
    super(props);

    this.state = { deleteDialogOpen: false, surveyToDelete: null };
    this.onDeleteSurvey = this.onDeleteSurvey.bind(this);
    this.deleteSurvey = this.deleteSurvey.bind(this);
    this.deleteDialogClose = this.deleteDialogClose.bind(this);
  }

  colData = [
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'langauges', label: 'Languages' },
    { id: 'actions', label: 'Actions' }
  ];

  componentDidMount() {
    this.props.fetchSurveyFeed();
  }

  onDeleteSurvey(id) {
    this.setState({
      deleteDialogOpen: true,
      surveyToDelete: id,
    });
  }

  deleteSurvey() {
    const id = this.state.surveyToDelete;
    if(id !== null) {
      this.props.deleteSurvey(id);
    }
    this.deleteDialogClose();
  }

  deleteDialogClose() {
    this.setState({
      deleteDialogOpen: false,
    });
  }

  render() {
    const { 
      classes, 
      surveys, 
      history, 
      deleteErrors, 
      isDeletingSurvey, 
      isFetching, 
      fetchErrors 
    } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <TableToolbar onAddClick={() => history.push('/surveys/new')} />
          <Table>
            <TableHeadRow columnData={this.colData} />
            <TableBody>
              { 
                !surveys.length &&
                <TableRow>
                  <TableCell>
                    {
                      !!fetchErrors &&
                      <Typography type="subheading">
                        Problem occurred fetching surveys.
                      </Typography>
                    }
                    {
                      !fetchErrors &&
                      <Typography type="subheading">
                        Surveys unavailable
                      </Typography>
                    }
                  </TableCell>
                </TableRow>
              }
              {
                surveys.map(({uuid: id, title, description, languages}) => 
                  <HomeSurveyRowContainer 
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    languages={languages}
                    onDeleteSurvey={this.onDeleteSurvey}
                  />)
              }
            </TableBody>
          </Table>
          <Dialog open={this.state.deleteDialogOpen} onRequestClose={this.deleteDialogClose}>
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to remove this survey?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.deleteSurvey}>
                Yes
              </Button>
              <Button onClick={this.deleteDialogClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <PopupSnackbar
            show={!!deleteErrors && !isDeletingSurvey}
            message="Problem occurred deleting survey"
            retryAction={this.deleteSurvey} />
          <PopupSnackbar
            show={!isFetching && !!fetchErrors}
            message="Problem occurred fetching surveys"
            retryAction={this.fetchFeed}
            />
          {
            (isDeletingSurvey || isFetching) &&
            <Loading />
          }
        </Paper>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(SurveyTable);