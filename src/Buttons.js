import React from 'react';
import Button from './Button';

function Buttons(props) {
  return props.chapterData
    ? props.chapterData.transitionData.map(transition => (
        <Button
          transitionData={transition}
          handleChoice={props.handleChoice}
          chapterId={props.chapterId}
          key={transition._id}
        />
      ))
    : '';
}

export default Buttons;
