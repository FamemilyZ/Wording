# User Manual for Vocabulary Quiz Generator

Welcome to the **Vocabulary Quiz Generator**! This guide will walk you through how to use this modern, animated application to test and improve your vocabulary skills.

## 1. Getting Started

To run the application, simply open the `index.html` file located in the `04_Implementation/src/` folder in any modern web browser (like Chrome, Firefox, or Edge).

## 2. Main Menu

Upon opening the application, you will be greeted by an animated start screen with three main options:

*   **Level Mode**: Play with predefined vocabulary sets categorized by difficulty.
*   **Custom Mode**: Create your own quiz by providing a list of words and their definitions.
*   **View History**: See the scores and details of all your past quizzes.

## 3. How to Play in Level Mode

1.  **Choose a Level**: Click the **"Level Mode"** button. You will slide to a new screen showing a grid of all available levels.
2.  **Start the Quiz**: Click on any level button (e.g., "Level 1 (Beginner)") to begin the quiz. Each level consists of 30 questions.

## 4. How to Play in Custom Mode

The new Custom Mode makes it much easier to build your own vocabulary quiz without formatting errors.

1.  **Navigate to Custom Mode**: Click the **"Custom Mode"** button from the main menu.

2.  **Add Words One by One**: Instead of a large text box, you will see two input fields: "Enter a word" and "Enter the definition".
    *   Type your word in the first field.
    *   Type its definition in the second field.
    *   Click the **"Add Word"** button.

3.  **Manage Your List**:
    *   As you add words, they will appear in a list below the input form.
    *   If you make a mistake, simply click the **red '×' button** next to any word in the list to remove it.

4.  **Start the Quiz**:
    *   The **"Start Quiz"** button will be disabled until you have added at least **4 word pairs** to your list.
    *   Once you have 4 or more words, the button will become active. Click it to begin your custom quiz. The quiz will then follow the same rules as Level Mode.

## 5. The Quiz Screen

The quiz screen is designed to be engaging and informative.

*   **Progress Bar**: At the top, a progress bar shows how far you are in the current quiz.
*   **Image**: On the left, an image related to the vocabulary word is displayed to help with visual association. (Currently uses placeholder images).
*   **Question**: On the right, the vocabulary word is shown prominently.
*   **Choices**: Below the word, four multiple-choice options (definitions) are presented. Click on the definition you believe is correct.

### Answering and Feedback

*   Once you select an answer, all choices will be disabled.
*   **Correct Answer**: The feedback text will turn green and say "Correct!", and your chosen answer will be highlighted in green.
*   **Incorrect Answer**: The feedback text will turn red and say "Incorrect!". Your incorrect choice will be highlighted in red, and the correct answer will be shown in green.
*   Click the **"Next"** button to proceed to the next question.
*   You can click **"Exit Quiz"** at any time to end the quiz and save your partial progress.

## 6. Result Screen

After the final question, you will be taken to the Result screen. This screen displays:
*   A congratulatory message.
*   Your final score (e.g., "You scored 25 out of 30").
*   A "Back to Home" button to return to the main menu.

## 7. Viewing History

1.  **Open History**: From the main menu, click the **"View History"** button.
2.  **View Scores**: A modal window will appear, showing a table of all your past quizzes, including the date, mode, and score. The most recent quizzes are at the top.
3.  **Clear History**: You can click the **"Clear All History"** button to permanently delete all saved scores.
4.  **Close**: Click the "Close" button or the "X" in the corner to return to the main menu.

---
Enjoy improving your vocabulary!