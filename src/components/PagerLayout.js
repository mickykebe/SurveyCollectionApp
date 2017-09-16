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

function PagerLayout({ classes, onPrev, onNext, children }) {
  return (
    <div className={classes.root}>
      {
        !!onPrev &&
        <Button className={classes.directionButton} onClick={onPrev}>
          <LeftArrowIcon />
        </Button>
      }
      {
        !onPrev &&
        <div className={classes.buttonPlaceholder} />
      }
      <div className={classes.content}>
        {children}
      </div>
      {
        !!onNext &&
        <Button className={classes.directionButton} onClick={onNext}>
          <RightArrowIcon />
        </Button>
      }
      {
        !onNext &&
        <div className={classes.buttonPlaceholder} />
      }
    </div>
  )
}

export default withStyles(styles)(PagerLayout);