document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const screens = document.querySelectorAll('.screen');
    const startAppBtn = document.getElementById('start-app-btn');
    const historyScreen = document.getElementById('history-screen');
    const levelModeBtn = document.getElementById('level-mode-btn');
    const customModeBtn = document.getElementById('custom-mode-btn');
    const historyBtn = document.getElementById('history-btn');
    const backBtns = document.querySelectorAll('.back-btn');
    const backBtnWelcome = document.querySelector('.back-btn-welcome');
    const restartBtn = document.getElementById('restart-btn');
    
    // Custom Mode Elements
    const customWordInput = document.getElementById('custom-word-input');
    const addWordBtn = document.getElementById('add-word-btn');
    const customListContainer = document.getElementById('custom-list-container');
    const startCustomQuizBtn = document.getElementById('start-custom-quiz-btn');

    // Quiz Screen Elements
    const questionTitle = document.getElementById('question-title');
    const questionWord = document.getElementById('question-word');
    const choicesContainer = document.getElementById('choices-container');
    const feedback = document.getElementById('feedback');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const progressBar = document.getElementById('progress-bar');
    const imageContainer = document.getElementById('image-container');

    // Result Screen Elements
    const resultTitle = document.getElementById('result-title');
    const resultScore = document.getElementById('result-score');
    
    // History Elements
    const fullHistoryContainer = document.getElementById('full-history-container');
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    
    const levelButtonsContainer = document.getElementById('level-buttons');

    // --- State ---
    let vocabulary = [];
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let currentMode = '';
    let answeredQuestions = [];
    let customVocabularyList = [];

    // --- Functions ---
    
    function showScreen(screenId) {
        const currentScreen = document.querySelector('.screen.active');
        const nextScreen = document.getElementById(screenId);

        if (currentScreen && nextScreen && currentScreen !== nextScreen) {
            currentScreen.classList.add('exiting');
            const handleTransitionEnd = () => {
                currentScreen.classList.remove('active', 'exiting');
                void nextScreen.offsetWidth; 
                nextScreen.classList.add('active');
                currentScreen.removeEventListener('transitionend', handleTransitionEnd);
            };
            currentScreen.addEventListener('transitionend', handleTransitionEnd);
        } else if (!currentScreen && nextScreen) {
            nextScreen.classList.add('active');
        } else if (currentScreen && !nextScreen) {
            currentScreen.classList.remove('active');
        }
    }

    function showHistoryModal() {
        displayHistory();
        historyScreen.classList.add('active');
    }

    function hideHistoryModal() {
        historyScreen.classList.remove('active');
    }
    
    function generateImage(text) {
        const encodedText = encodeURIComponent(text);
        return `https://via.placeholder.com/400x300/1f2937/e5e7eb?text=${encodedText}`;
    }

    function startQuiz(vocabList, mode) {
        if (vocabList.length < 4) {
            alert('Please provide at least 4 vocabulary words to start the quiz.');
            return;
        }
        vocabulary = vocabList;
        const shuffled = [...vocabulary].sort(() => 0.5 - Math.random());
        currentQuestions = mode === 'Custom' ? shuffled : shuffled.slice(0, 30);
        
        currentQuestionIndex = 0;
        score = 0;
        currentMode = mode;
        answeredQuestions = [];

        updateProgressBar();
        showScreen('quiz-screen');
        displayQuestion();
    }
    
    function updateProgressBar() {
        if(currentQuestions.length === 0) {
            progressBar.style.width = '0%';
            return;
        }
        const progress = (currentQuestionIndex / currentQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function displayQuestion() {
        if (currentQuestionIndex >= currentQuestions.length) {
            showResults();
            return;
        }
        updateProgressBar();
        feedback.textContent = '';
        feedback.className = 'feedback';
        nextQuestionBtn.style.display = 'none';
        
        const question = currentQuestions[currentQuestionIndex];
        const correctAnswer = question.definition;

        imageContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = generateImage(question.word);
        img.alt = `Image for ${question.word}`;
        img.onerror = () => { imageContainer.innerHTML = `<div class="placeholder-image">Image for ${question.word}</div>`; };
        imageContainer.appendChild(img);

        const wrongAnswers = vocabulary.filter(item => item.definition !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, 3).map(item => item.definition);
        const choices = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());

        questionTitle.textContent = `Question ${currentQuestionIndex + 1}/${currentQuestions.length}`;
        questionWord.textContent = question.word;

        choicesContainer.innerHTML = '';
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'btn';
            button.textContent = choice;
            button.addEventListener('click', () => handleChoice(choice, correctAnswer, button));
            choicesContainer.appendChild(button);
        });
    }

    function handleChoice(selectedChoice, correctChoice, button) {
        const choiceButtons = choicesContainer.querySelectorAll('.btn');
        choiceButtons.forEach(btn => btn.disabled = true);

        const isCorrect = selectedChoice === correctChoice;
        if (isCorrect) {
            score++;
            feedback.textContent = 'Correct!';
            feedback.className = 'feedback correct';
            button.style.backgroundColor = 'var(--success-color)';
            button.style.borderColor = 'var(--success-color)';
        } else {
            feedback.textContent = 'Incorrect!';
            feedback.className = 'feedback incorrect';
            button.style.backgroundColor = 'var(--error-color)';
            button.style.borderColor = 'var(--error-color)';
            choiceButtons.forEach(btn => {
                if (btn.textContent === correctChoice) {
                    btn.style.backgroundColor = 'var(--success-color)';
                    btn.style.borderColor = 'var(--success-color)';
                }
            });
        }
        
        answeredQuestions.push({
            word: currentQuestions[currentQuestionIndex].word,
            choices: Array.from(choiceButtons).map(b => b.textContent),
            selectedAnswer: selectedChoice,
            correctAnswer: correctChoice
        });

        nextQuestionBtn.style.display = 'flex';
    }

    function showResults() {
        progressBar.style.width = '100%';
        const totalQuestions = currentQuestions.length;
        resultTitle.textContent = `Quiz Complete!`;
        resultScore.textContent = `You scored ${score} out of ${totalQuestions}.`;

        const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
        const newHistoryEntry = {
            mode: currentMode,
            score: `${score}/${totalQuestions}`,
            date: new Date().toISOString(),
            answeredQuestions: answeredQuestions
        };
        history.push(newHistoryEntry);
        localStorage.setItem('quizHistory', JSON.stringify(history));
        showScreen('result-screen');
    }

    function resetQuizState() {
        currentQuestions = [];
        currentQuestionIndex = 0;
        score = 0;
        updateProgressBar();
    }

    function saveAndExit() {
        if (currentQuestions.length > 0 && currentQuestionIndex > 0) {
            const totalQuestions = currentQuestions.length;
            const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
            const newHistoryEntry = { mode: currentMode, score: `${score}/${currentQuestionIndex} (Incomplete)`, date: new Date().toISOString(), answeredQuestions };
            history.push(newHistoryEntry);
            localStorage.setItem('quizHistory', JSON.stringify(history));
        }
        resetQuizState();
        showScreen('mode-screen');
    }

    function displayHistory() {
        const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
        if (history.length === 0) {
            fullHistoryContainer.innerHTML = '<p style="text-align: center; margin-top: 2rem;">No history yet. Play a game!</p>';
            return;
        }
        const table = document.createElement('table');
        table.innerHTML = `<thead><tr><th>Date</th><th>Mode</th><th>Score</th></tr></thead>
            <tbody>
                ${history.sort((a, b) => new Date(b.date) - new Date(a.date)).map(entry => `
                    <tr><td>${new Date(entry.date).toLocaleString()}</td><td>${entry.mode}</td><td>${entry.score}</td></tr>`).join('')}
            </tbody>`;
        fullHistoryContainer.innerHTML = '';
        fullHistoryContainer.appendChild(table);
    }
    
    function populateLevels() {
        if (!levelButtonsContainer) return;
        levelButtonsContainer.innerHTML = '';
        quizLevels.forEach(levelData => {
            const button = document.createElement('button');
            button.className = 'btn';
            button.textContent = levelData.name;
            button.addEventListener('click', () => { startQuiz(levelData.vocab, levelData.name); });
            levelButtonsContainer.appendChild(button);
        });
    }

    // --- New Custom Mode Functions ---
    function renderCustomList() {
        customListContainer.innerHTML = ''; // Clear current list
        if (customVocabularyList.length === 0) {
            customListContainer.innerHTML = `<p id="custom-list-placeholder">Your words will appear here. Add at least 4 to start.</p>`;
        } else {
            customVocabularyList.forEach((item, index) => {
                const listItem = document.createElement('div');
                listItem.className = 'custom-list-item';
                listItem.innerHTML = `
                    <div class="custom-list-item-text">
                        <span class="word">${item.word}:</span>
                        <span class="def">${item.definition}</span>
                    </div>
                    <button class="remove-word-btn" data-index="${index}">&times;</button>
                `;
                customListContainer.appendChild(listItem);
            });
        }
        // Update button state
        startCustomQuizBtn.disabled = customVocabularyList.length < 4;
    }

    async function translateAndAddWord() {
        const word = customWordInput.value.trim();
        if (!word) {
            alert('Please enter a word.');
            return;
        }

        addWordBtn.disabled = true;
        addWordBtn.textContent = 'Translating...';

        // Detect if the input is Thai to set the correct language pair for translation
        const isInputThai = /[\u0E00-\u0E7F]/.test(word);
        const langpair = isInputThai ? 'th|en' : 'en|th';

        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${langpair}`);
            const data = await response.json();
            
            if (data.responseStatus !== 200) {
                 throw new Error(data.responseDetails);
            }

            const translatedText = data.responseData.translatedText;

            // The quiz structure is always English word with other language definition.
            const quizWord = isInputThai ? translatedText : word;
            const quizDefinition = isInputThai ? word : translatedText;

            customVocabularyList.push({ word: quizWord, definition: quizDefinition });
            customWordInput.value = '';
            customWordInput.focus();
            renderCustomList();
        } catch (error) {
            console.error('Translation error:', error);
            alert('Could not translate the word. Please try again or enter the definition manually.');
        } finally {
            addWordBtn.disabled = false;
            addWordBtn.textContent = 'Translate and Add';
        }
    }

    function handleRemoveWord(e) {
        if (e.target.classList.contains('remove-word-btn')) {
            const indexToRemove = parseInt(e.target.dataset.index, 10);
            customVocabularyList.splice(indexToRemove, 1);
            renderCustomList();
        }
    }

    // --- Event Listeners ---
    levelModeBtn.addEventListener('click', () => showScreen('level-screen'));
    customModeBtn.addEventListener('click', () => {
        customVocabularyList = [];
        renderCustomList();
        showScreen('custom-screen');
    });
    historyBtn.addEventListener('click', showHistoryModal);

    addWordBtn.addEventListener('click', translateAndAddWord);
    customListContainer.addEventListener('click', handleRemoveWord);
    customWordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            translateAndAddWord();
        }
    });
    startCustomQuizBtn.addEventListener('click', () => {
        if (customVocabularyList.length >= 4) {
            startQuiz(customVocabularyList, 'Custom');
        }
    });


    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        displayQuestion();
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
             if (!btn.closest('#mode-screen')) { showScreen('mode-screen'); }
        });
    });

    const historyBackBtn = historyScreen.querySelector('.back-btn-modal');
    if(historyBackBtn) {
        historyBackBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hideHistoryModal();
        });
    }

    restartBtn.addEventListener('click', () => {
        resetQuizState();
        showScreen('mode-screen');
    });

    backToHomeBtn.addEventListener('click', saveAndExit);

    clearHistoryBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
            localStorage.removeItem('quizHistory');
            displayHistory();
        }
    });

    // --- Initial Setup ---
    populateLevels();
    const modeScreen = document.getElementById('mode-screen');
    screens.forEach(s => {
        s.classList.remove('active', 'exiting');
        s.style.transition = 'none';
    });
    modeScreen.classList.add('active');
    setTimeout(() => {
        screens.forEach(s => { s.style.transition = ''; });
    }, 10);
});
