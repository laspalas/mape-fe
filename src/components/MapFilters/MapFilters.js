import React, { useState } from 'react';
import Popover from 'react-popover';
import { Button } from 'reactstrap';
import data from '../../assets/data.json';
import { KibsForm } from './KibsForm';
import { SingleForm } from './SingleForm';

const ContentSingle = ({ onChange, values }) => (
  <div
    style={{
      width: '30rem',
      height: '20rem',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100000,
      padding: '1.6rem',
      background: 'white',
      borderRadius: '4px',
      boxShadow:
        '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
    }}
  >
    <SingleForm onChange={onChange} values={values} />
  </div>
);

const ContentKibs = ({ values, onChange }) => (
  <div
    style={{
      width: '30rem',
      minHeight: '20rem',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100000,
      padding: '1.6rem',
      background: 'white',
      borderRadius: '4px',
      boxShadow:
        '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
    }}
  >
    <KibsForm values={values} onChange={onChange} />
  </div>
);

const MapFilters = ({ isSingle, onChange, values }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const _onChange = values => {
    onChange && onChange(values);
    setIsPopoverOpen(false);
  };

  return (
    <Popover
      style={{ zIndex: 100000 }}
      onOuterAction={() => {
        setIsPopoverOpen(false);
      }}
      place="below"
      isOpen={isPopoverOpen}
      body={
        isSingle ? (
          <ContentSingle values={values} onChange={_onChange} />
        ) : (
          <ContentKibs values={values} onChange={_onChange} />
        )
      }
    >
      <Button
        style={{
          position: 'absolute',
          zIndex: 10000,
          top: '25px',
          left: isSingle ? '80px' : '270px',
        }}
        color="primary"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        {isSingle ? 'Prikaz po indikatoru' : 'Prikaz po kibsu'}
      </Button>
    </Popover>
  );
};

export { MapFilters };
