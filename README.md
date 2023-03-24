# Quizzer

  Quizzer is an application that runs in your browser to test your knowledge of predefined questions.

  - can mix multiple topics
  - can keep score of correct answered questions
  - will show correct answer when submitting wrong one (at next questions as previous response)
  - can reveal all current answers (right and wrong)

## Planned Features

  - score storage
  - multiple choice answers
  - topic specific statistics
  - select multiple files
      -  management for multiple file 
      choose how many questions to display per page 
      [ex. 
      'X' random questions from all files or 
      'Y' questions from each file/topic]


## Installation

  Quizzer is user friendly and only requires a browser to start once you've downloaded the files.
  But you will need at least one valid JSON file with a set of predefined questions and answers to actually populate the quizz.

## Running Quizzer

  Open the index.html file. (double click it, just like your browser icon)
  
  Next just follow the instructions (Start App - Choose file(s) - Start Quiz  - and now you can test your knowledge.)

  [The app requires a file, or more, as source text used to generate the questions and answers it displays. 
  The files need a question and answers structure organised as a valid JSON (as this is a simple, common format)

  There are a few such files, valid and ready for use, inside the quizzer_json folder. Feel free to take them on as practice.]


## App walkthrough - quick presentation

  After clicking Start quiz random question(s) will be chosen. The corresponding question(s) text and possible answers will be displayed. The answers are multiple select checkboxes so that users can check/uncheck them.

  After that we have 4 options / buttons

  1. Submit answer(s) - checks if selected asnwer(s) are right/wrong, updates score, moves on to next randomly selected question

  2. Check answer(s) - higlights selected answer(s) accordingly, right=green, wrong=pink, impacts score negatively (considered same as a submit but without moving to the next question)

  3. Reveal all answers - highlights all answer(s), green=right, pink=wrong

  4. Skip question - moves to next random question without affecting score

  Under these buttons we have the score tracker (session based)
  (counts submitted correct answers [and checked one] out of max correct answers)
  [Example: if a question has 3 correct answers ]
  And the feedback meesage that logs the correct answer{s) if we submitted wrong answer(s) to the previous question

  If you want to reset your score, you have to start over. Refresh page and select again the source file(s).
