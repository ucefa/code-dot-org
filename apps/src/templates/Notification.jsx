import React, { PropTypes } from 'react';
import Radium from 'radium';
import color from "../util/color";
import FontAwesome from '@cdo/apps/templates/FontAwesome';
import ProgressButton from "./progress/ProgressButton";

const NotificationType = {
  information: 'information',
  success: 'success',
  failure: 'failure',
  warning: 'warning'
};

const styles = {
  main: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 3,
    height: 68,
    width: 900,
    backgroundColor: color.white
  },
  notice: {
    fontFamily: '"Gotham 4r", sans-serif',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: -0.2,
    marginLeft: 88,
    marginTop: 16,
    backgroundColor: color.white,
  },
  details: {
    fontFamily: 'Gotham-Book',
    fontSize: 12,
    lineHeight: 2.5,
    marginLeft: 88,
    marginBottom: 16,
    color: color.charcoal,
  },
  dismiss: {
    color: color.lighter_gray,
    float: 'right',
    marginTop: 16,
    marginRight: 14
  },
  iconBox: {
    width: 68,
    height: 68,
    backgroundColor: color.lightest_gray,
    float: 'left',
    textAlign: 'center',
  },
  icon: {
    color: color.white,
    fontSize: 34,
    lineHeight: 2
  },
  button: {
    float: 'right',
    marginRight: 14,
    marginTop: -63
  },
  colors: {
    [NotificationType.information]: {
      borderColor: color.redesign_teal,
      color: color.redesign_teal,
      backgroundColor: color.redesign_teal
    },
    [NotificationType.success]: {
      borderColor: color.redesign_green,
      color: color.redesign_green,
      backgroundColor: color.redesign_green
    },
    [NotificationType.failure]: {
      borderColor: color.redesign_red,
      color: color.redesign_red,
      backgroundColor: color.redesign_red
    },
    [NotificationType.warning]: {
      borderColor: color.redesign_yellow,
      color: color.redesign_yellow,
      backgroundColor: color.redesign_yellow
    },
  }
};

const Notification = React.createClass({
  propTypes: {
    type: PropTypes.oneOf(Object.keys(NotificationType)).isRequired,
    notice: React.PropTypes.string.isRequired,
    details: React.PropTypes.string.isRequired,
    buttonText: React.PropTypes.string,
    buttonLink: React.PropTypes.string,
    dismissible: React.PropTypes.bool.isRequired
  },

  getInitialState() {
   return {open: true};
  },

  renderXDismiss() {
    const { dismissible } = this.props;

    if (dismissible) {
      return (
        <FontAwesome
          icon="times"
          style={styles.dismiss}
          onClick={this.toggleContent}
        />
      );
    }
  },

  toggleContent() {
    this.setState({open: !this.state.open});
  },

  renderIcon() {
    const { type } = this.props;
    const icons = {
      information: 'info-circle',
      success: 'check-circle',
      failure: 'exclamation-triangle',
      warning: 'exclamation-triangle'
    };

    return (
      <div style={[styles.iconBox, styles.colors[type]]}>
        <FontAwesome icon={icons[type]} style={styles.icon}/>
      </div>
    );
  },

  renderButton() {
    const { buttonText, buttonLink } = this.props;
    if (buttonText) {
      return (
        <ProgressButton
          href={buttonLink}
          color="gray"
          text={buttonText}
          style={styles.button}
        />
      );
    }
  },

  render() {
    const { notice, details, type } = this.props;

    if (this.state.open) {
      return (
        <div style={[styles.colors[type], styles.main]}>
          {this.renderIcon()}
          {this.renderXDismiss()}
          <div style={[styles.colors[type], styles.notice]}>
            {notice}
          </div>
          <div style={styles.details}>
            {details}
          </div>
          {this.renderButton()}
        </div>
      );
    }
    return (
      <div/>
    );
  }
});

Notification.NotificationType = NotificationType;

export default Radium(Notification);
