import React from 'react';
import PropTypes from "prop-types";

const Segundero = props => {
  const digits = String(props.seconds).padStart(6, '0').split('');

  return (
    <div className="navbar gap-2 bg-black p-3 rounded">
      <div className="bg-dark text-white p-3 rounded">
        <i className="fa-regular fa-clock" style={{paddingTop:".85rem"}}></i>
      </div>
      {digits.map((digit, i) => (
        <div key={i} className="bg-dark text-white p-3 fs-3 rounded">
          {digit}
        </div>
      ))}
    </div>
  );
};
Segundero.propTypes = {
    seconds: PropTypes.number
};
export default Segundero;
