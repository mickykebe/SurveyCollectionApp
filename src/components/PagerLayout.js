import React from 'react';
import Button from 'material-ui/Button';
import LeftArrowIcon from 'material-ui-icons/KeyboardArrowLeft';
import RightArrowIcon from 'material-ui-icons/KeyboardArrowRight';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flex: 1,
    minHeight: '200px',
  },
  directionButton: {
    color: theme.palette.common.lightBlack,
  },
  buttonPlaceholder: {
    width: '88px',
  }
});

function PagerLayout({ classes, hasPrev, hasNext, onPrev, onNext, children }) {
  return (
    <div className={classes.root}>
      {
        hasPrev &&
        <Button className={classes.directionButton} onClick={onPrev}>
          <LeftArrowIcon />
        </Button>
      }
      {
        !hasPrev &&
        <div className={classes.buttonPlaceholder} />
      }
      <div className={classes.content}>
        {children}
      </div>
      {
        hasNext &&
        <Button className={classes.directionButton} onClick={onNext}>
          <RightArrowIcon />
        </Button>
      }
      {
        !hasNext &&
        <div className={classes.buttonPlaceholder} />
      }
    </div>
  )
}

export default withStyles(styles)(PagerLayout);