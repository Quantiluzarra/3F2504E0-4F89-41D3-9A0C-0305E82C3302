// game.js

// 1. Данные карт (в реальном проекте приходят с сервера)
const cardDatabase = {
    'card001': { id: 'card001', name: 'Самурай Кеншин', rarity: 'common', attack: 5, health: 10, cost: 3, image: 'img/kenjin.png', description: 'Быстрый удар'},
    'card002': { id: 'card002', name: 'Дракон Огня', rarity: 'rare', attack: 8, health: 12, cost: 5, image: 'img/firedragon.png', description: 'Огненное дыхание'},
    'card003': { id: 'card003', name: 'Императрица Лотоса', rarity: 'legendary', attack: 6, health: 15, cost: 7, image: 'img/empress.png', description: 'Лечение союзников'},
    // ... другие карты
};

// 2. Инвентарь игрока (тоже обычно на сервере)
let playerInventory = ['card001', 'card001', 'card002']; // ID карт, которые есть у игрока

// 3. Логика отображения карт (очень упрощенно)
function displayHand() {
    const handElement = document.querySelector('.player-hand');
    handElement.innerHTML = ''; // Очистить руку
    // Логика получения карт для текущей руки
    // ...
    // Пример добавления карты в руку
    const cardData = cardDatabase['card001'];
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', cardData.rarity);
    cardDiv.innerHTML = `
        <strong>${cardData.name}</strong>
        <img src="${cardData.image}" alt="${cardData.name}" style="width:80%; height:auto;">
        <div>ATK: ${cardData.attack} / HP: ${cardData.health}</div>
        <small>${cardData.description}</small>
    `;
    // Добавить обработчик клика/перетаскивания
    cardDiv.addEventListener('click', () => playCard(cardData.id));
    handElement.appendChild(cardDiv);
}

function playCard(cardId) {
    console.log('Играем карту:', cardId);
    // Здесь будет сложная логика проверки маны,
    // перемещения карты на поле, отправки хода на сервер и т.д.
}

// 4. Логика для экрана статистики (используя Chart.js)
function showStatsScreen() {
    // Показать экран статистики, скрыть другие
    document.getElementById('screen-battle').style.display = 'none';
    document.querySelector('.stats-screen').style.display = 'block';

    // Получить данные для графика (например, с сервера)
    const statsData = {
        wins: [1, 3, 4, 6, 8], // Побед за последние 5 дней/игр
        losses: [2, 1, 3, 2, 1] // Поражений
    };

    const ctx = document.getElementById('statsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line', // Линейный график
        data: {
            labels: ['День 1', 'День 2', 'День 3', 'День 4', 'День 5'], // Оси X
            datasets: [{
                label: 'Победы',
                data: statsData.wins,
                borderColor: 'rgb(75, 192, 192)', // Зеленый цвет
                tension: 0.1
            }, {
                label: 'Поражения',
                data: statsData.losses,
                borderColor: 'rgb(255, 99, 132)', // Красный цвет
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Позволяет графику занимать всю высоту контейнера
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Инициализация игры (например, показать начальный экран)
// displayHand(); // Отобразить начальную руку (если начинаем с боя)
// showStatsScreen(); // Пример вызова экрана статистики
