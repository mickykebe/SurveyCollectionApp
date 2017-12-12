import React, { Component } from "react";
import Content from "./Content";
import { withStyles } from "material-ui/styles";
import Table from "material-ui/Table";
import ResponsesContainer from "../containers/ResponsesContainer";

const styles = theme => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing.unit * 2,
    overflowX: "auto"
  },
  table: {
    minWidth: 800
  }
});

class ResponsesTable extends Component {
  render() {
    <ResponsesContainer
      render={props => {
        <Content>
          <div className={classes.root}>
            <Table className={classes.table} />
          </div>
        </Content>;
      }}
    />;
  }
}

export default withStyles(styles)(ResponsesTable);
