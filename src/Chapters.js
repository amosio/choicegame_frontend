import React from 'react';
import Chapter from './Chapter';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './chapters-transition.css';

function Chapters(props) {
  return (
    <TransitionGroup className='chapters-list'>
      {props.chaptersData.map((chapter, i) => (
        <CSSTransition key={chapter.id} timeout={500} classNames="fade">
          <Chapter
            chapterData={chapter}
            handleChoice={props.handleChoice}
            chapterId={i}
            key={chapter.id}
          />
        </CSSTransition>))}
    </TransitionGroup>
  );
}

export default Chapters;
