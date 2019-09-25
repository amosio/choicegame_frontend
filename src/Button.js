import React from 'react';

function Button(props) {
  return (
    <button
      disabled={props.transitionData.disabled}
      onClick={props.handleChoice}
      data-to-id={props.transitionData.to_id}
      className="button is-link"
      data-index={props.chapterId}
    >
      {props.transitionData ? props.transitionData.name : '...'}
    </button>
  );
}

export default Button;
