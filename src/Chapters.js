import React from 'react';
import Chapter from './Chapter';

function Chapters(props) {
  return props.chaptersData.map((chapter, i) => (
    <Chapter
      chapterData={chapter}
      handleChoice={props.handleChoice}
      chapterId={i}
      key={chapter.id}
    />
  ));
}

export default Chapters;
