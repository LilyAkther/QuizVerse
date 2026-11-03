const currentUser = JSON.parse(
    localStorage.getItem('qv_currentUser') || 'null'
);

const users = JSON.parse(
    localStorage.getItem('qv_users') || '[]'
);

const results = JSON.parse(
    localStorage.getItem('qv_results') || '[]'
);

if (!currentUser || currentUser.role !== 'Student') {

    window.location.href = '../index.html';

} else {

    document.getElementById('userName').textContent =
        currentUser.name;

    document.getElementById('logoutBtn').addEventListener('click', function () {
        localStorage.removeItem('qv_currentUser');
        window.location.href = '../index.html';
    });

    let ranking = [];

    users.forEach(function (user) {

        if (user.role === 'Student') {

            let myResults = results.filter(function (result) {
                return result.email === user.email;
            });

            let bestScore = 0;

            if (myResults.length > 0) {
                bestScore = Math.max.apply(
                    null,
                    myResults.map(function (result) {
                        return Number(result.percent || 0);
                    })
                );
            }

            ranking.push({
                name: user.name,
                email: user.email,
                score: bestScore,
                attempts: myResults.length
            });
        }
    });

    ranking.sort(function (a, b) {
        return b.score - a.score;
    });

    const leaderboard = document.getElementById('leaderboard');

    if (ranking.length === 0) {

        leaderboard.innerHTML =
            '<div class="empty">No student records available.</div>';

    } else {

        let html = `
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Student Name</th>
                        <th>Attempts</th>
                        <th>Best Score</th>
                    </tr>
                </thead>
                <tbody>
        `;

        ranking.forEach(function (student, index) {

            let activeClass =
                student.email === currentUser.email
                    ? 'current-user'
                    : '';

            html += `
                <tr class="${activeClass}">
                    <td class="rank">#${index + 1}</td>
                    <td>${student.name}</td>
                    <td>${student.attempts}</td>
                    <td>${student.score}%</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        leaderboard.innerHTML = html;
    }
}