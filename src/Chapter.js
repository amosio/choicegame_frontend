import React, { Fragment } from 'react';
import Buttons from './Buttons';
function Chapter(props) {
  return (
    <Fragment>
      <section className="hero is-small is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{props.chapterData.stateData.name}</h1>
            <h2 className="subtitle">{props.chapterData.stateData.content}</h2>
          </div>
        </div>
        <div
          style={{ marginTop: 'bottom', padding: '1rem' }}
          className="container"
        >
          <div className="buttons is-centered">
            <Buttons
              chapterData={props.chapterData}
              handleChoice={props.handleChoice}
              chapterId={props.chapterId}
            />
          </div>
        </div>
      </section>
      <br />
    </Fragment>
  );
}

export default Chapter;
