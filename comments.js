// Используем GitHub Issues для комментариев
const REPO = 'VexeraDubbing/VexeraDubbingTeam
    '; // Замените на ваш репозиторий

function loadComments() {
    fetch(`https://api.github.com/repos/${REPO}/issues`)
        .then(response => response.json())
        .then(issues => {
            const container = document.getElementById('comments-container');
            container.innerHTML = '';
            issues.forEach(issue => {
                const comment = document.createElement('div');
                comment.className = 'comment';
                comment.innerHTML = `
                    <strong>${issue.user.login}:</strong>
                    <p>${issue.body}</p>
                `;
                container.appendChild(comment);
            });
        });
}

function postComment() {
    const commentText = document.getElementById('comment-input').value;
    if (!commentText.trim()) return;

    fetch(`https://api.github.com/repos/${REPO}/issues`, {
        method: 'POST',
        headers: {
            'Authorization': 'token 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', // Замените на свой токен
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: 'Новый комментарий', body: commentText })
    })
    .then(() => {
        loadComments();
        document.getElementById('comment-input').value = '';
    });
}

// Загрузить комментарии при открытии страницы
if (document.getElementById('comments-container')) {
    loadComments();
}
