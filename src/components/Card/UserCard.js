import React from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import { Card, CardImg, Button, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';

import Avatar from '../Avatar';

const UserCard = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  text,
  style = {},
  children,
  className,
  ...restProps
}) => {
  const classes = classNames('bg-gradient-theme', className);

  return (
    <Card style={{ maxWidth: '350px', marginLeft: style.marginLeft || 0}}>
      <CardImg
        top
        src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"
        alt="Card image cap"
        style={{ maxHeight: '270px'}}
      />
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {subtitle}
        </CardSubtitle>
        <CardText>
           {text}
        </CardText>
        <Button>Contact</Button>
      </CardBody>
    </Card>
  );
};

UserCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

UserCard.defaultProps = {
  avatarSize: 80,
};

export default UserCard;
