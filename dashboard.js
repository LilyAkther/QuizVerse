
const currentUser = JSON.parse(localStorage.getItem('user'));

function getResults() {
    return JSON.parse(localStorage.getItem('results')) || [];
}

function fmtDate(date) {
    return date ? new Date(date).toLocaleDateString() : '';
}

if (!currentUser) {
    window.location.href = 'login.html';
} else {
    document.getElementById('welcome').textContent =
        'Welcome back, ' + currentUser.name + '!';

    let mine = getResults().filter(function(r) {
        return r.email === currentUser.email;
    });

    document.getElementById('attempts').textContent = mine.length;

    document.getElementById('average').textContent =
        (mine.length
            ? Math.round(mine.reduce((s, r) => s + Number(r.percent), 0) / mine.length)
            : 0) + '%';

    document.getElementById('best').textContent =
        (mine.length
            ? Math.max(...mine.map(r => Number(r.percent)))
            : 0) + '%';

    document.getElementById('recent').innerHTML = mine.length
        ? mine.slice(-3).reverse().map(function(r) {
            return '<div class="rowline">' +
                '<span>' + r.title +
                '<br><small class="muted">' + fmtDate(r.date) +
                '</small></span>' +
                '<span class="pill">' + r.percent + '%</span>' +
                '</div>';
        }).join('')
        : '<div class="empty">No activity yet. Start your first quiz!</div>';
}
