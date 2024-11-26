document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');
    const userForm = document.getElementById('userForm');
    const homeScreen = document.getElementById('homeScreen');
    const forgotPassword = document.getElementById('forgotPassword');
    const createAccount = document.getElementById('createAccount');
    const main = document.getElementById('main');
    const userGreeting = document.getElementById('userGreeting');

    startBtn.addEventListener('click', function() {
        popup.classList.add('active');
    });

    closeBtn.addEventListener('click', function() {
        popup.classList.remove('active');
    });

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        popup.classList.remove('active');
        main.classList.add('hidden');
        homeScreen.classList.remove('hidden');
        userGreeting.textContent = username;
    });

    forgotPassword.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Password reset functionality will be implemented soon.');
    });

    createAccount.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Account creation functionality will be implemented soon.');
    });

    const langBtns = document.querySelectorAll('.langBtn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert(`${this.textContent.trim()} quiz coming soon!`);
        });
    });
});
// Add this after your existing code
const quizManager = new QuizManager();

document.querySelectorAll('.langBtn').forEach(btn => {
    btn.addEventListener('click', function() {
        const language = this.textContent.trim();
        document.querySelector('.difficulty-select').classList.remove('hidden');
        
        // Store selected language
        localStorage.setItem('selectedLanguage', language);
    });
});

document.querySelectorAll('.levelBtn').forEach(btn => {
    btn.addEventListener('click', async function() {
        const level = this.dataset.level;
        const language = localStorage.getItem('selectedLanguage');
        
        document.querySelector('.difficulty-select').classList.add('hidden');
        document.getElementById('quizScreen').classList.remove('hidden');
        
        await quizManager.startQuiz(language, level);
    });
});
