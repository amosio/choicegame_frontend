import React from 'react';

function Error(props) {
  return (
    <article className="message is-danger">
      <div className="message-header">
        <p>{props.error.error}</p>
      </div>
      <details style={{ whiteSpace: 'pre-wrap' }}>
        <div className="message-body">{props.error.errorInfo}</div>
      </details>
    </article>
  );
}

export default Error;
