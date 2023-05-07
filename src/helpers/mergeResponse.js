export default function mergeResponse(questions, answers) {
  const newArray = [];
  questions.map((question) => {
    let newQuestion = Object.assign({}, question);
    if (answers.length !== 0) {
      const valueAnswer = answers.find(
        (answer) => answer.question_id == question.id
      );
      if (valueAnswer) {
        newQuestion.isDone = true;
        newQuestion.origin_answer = valueAnswer;
        return newArray.push(newQuestion);
      } else {
        newQuestion.isDone = false;
        newQuestion.origin_answer = {
          survey_passing_id: 1,
          question_id: question.id,
          feedback: "",
          answer_data: question.type.name === "Multi Rating" ? [] : {},
        };
      }
      return newArray.push(newQuestion);
    } else {
      newQuestion.isDone = false;
      newQuestion.origin_answer = {
        survey_passing_id: 1,
        question_id: question.id,
        feedback: "",
        answer_data: question.type.name === "Multi Rating" ? [] : {},
      };
      return newArray.push(newQuestion);
    }
  });
  return newArray;
}
