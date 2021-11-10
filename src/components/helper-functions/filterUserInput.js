export function filterUserInput(userInput, cardData) {
  if (userInput === '') {
    return cardData;
  }
  return cardData.filter((cardData) =>
    cardData.title.toLowerCase().includes(userInput.toLowerCase())
  );
}
