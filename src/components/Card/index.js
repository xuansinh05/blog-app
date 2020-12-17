import React from 'react';
import moment from 'moment';

import './styles.scss';

const Card = ({ data }) => {
  return (
    <div className="card">
      <div
        className="image"
        style={{ backgroundImage: `url(${data.image})` }}
      />
      <div className="flex-col p-2">
        <div className="flex-row justify-content-between py-2">
          <span>Life style </span>
          <span className="text-grey font-size-14">
            {moment(data.createdAt).format('LL')}
          </span>
        </div>
        <div className="text-blue">{data.title}</div>
        <div className="text-content">{data.content}</div>
      </div>
    </div>
  );
};

export default Card;
