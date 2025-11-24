# Vocabulary Quiz Generator

A web-based application for generating vocabulary quizzes, created for a university Software Engineering course project. Users can test their knowledge using pre-defined vocabulary levels or by providing their own custom word lists.

## Features

- **Two Quiz Modes:**
    - **Level Mode:** Choose from 12 pre-defined vocabulary levels of increasing difficulty.
    - **Custom Mode:** Input your own vocabulary list (in `word:definition` format) to generate a personalized quiz.
- **Multiple Choice Questions:** Each question is presented with four randomized choices.
- **Instant Feedback:** See immediately if your answer was correct or incorrect.
- **Score Tracking:** View your total score at the end of each quiz.
- **Local History:** Your quiz history (mode, score, date) is saved automatically in your browser's Local Storage for you to track your progress.

## How to Run

This is a simple client-side web application built with HTML, CSS, and vanilla JavaScript. No installation or build process is required.

1.  Clone this repository to your local machine.
2.  Navigate to the `04_Implementation/src/` directory.
3.  Open the `index.html` file in your web browser.

That's it! The application should now be running.

## Project Structure

The repository is organized into folders corresponding to the Software Development Life Cycle (SDLC) phases.

```
Vocabulary-Quiz-Generator/
├── 01_Requirements/      # Project scope and user stories
├── 02_UX_UI_Design/      # Design rationale and prototypes
├── 03_System_Design/     # Technology stack and architecture
├── 04_Implementation/    # Source code for the application
│   └── src/
│       ├── index.html    # Main HTML file
│       ├── style.css     # Stylesheet
│       ├── levels.js     # Pre-defined vocabulary data
│       └── script.js     # Application logic
├── 05_Testing/           # Test cases and evidence
├── 06_Deployment_Review/ # User manual and final review documents
├── .gitignore
└── README.md             # This file
```
