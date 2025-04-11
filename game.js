// game.js
document.addEventListener('DOMContentLoaded', () => {
    // Элементы DOM
    const playerArena = document.getElementById('player-arena');
    const opponentArena = document.getElementById('opponent-arena');
    const inventoryEl = document.getElementById('inventory');
    const fightBtn = document.getElementById('fight-btn');
    const menuBtn = document.getElementById('menu-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const statsBtn = document.getElementById('stats-btn');
    const menuModal = document.getElementById('menu-modal');
    const settingsModal = document.getElementById('settings-modal');
    const statsModal = document.getElementById('stats-modal');
    const closeButtons = document.querySelectorAll('.modal-content button');

    // Классы
    class Card {
        constructor(name, rarity, power, image) {
            this.name = name;
            this.rarity = rarity;
            this.power = power;
            this.image = image;
        }

        render(container) {
            const cardEl = document.createElement('div');
            cardEl.classList.add('card', this.rarity);
            cardEl.style.backgroundImage = `url(${this.image})`;
            cardEl.dataset.power = this.power;
            cardEl.addEventListener('click', () => this.moveToArena(cardEl));
            container.appendChild(cardEl);
            return cardEl;
        }

        moveToArena(cardEl) {
            if (playerArena.children.length < 3 && cardEl.parentElement === inventoryEl) {
                playerArena.appendChild(cardEl);
            }
        }
    }

    class Player {
        constructor(name) {
            this.name = name;
            this.cards = [];
            this.wins = 0;
            this.losses = 0;
            this.draws = 0;
        }

        addCard(card) {
            this.cards.push(card);
            card.render(inventoryEl);
        }
    }

    // Инициализация игрока
    const player = new Player('Игрок');
    const opponentCards = [
        new Card('Воин Тени', 'rare', 20, 'shadow-warrior.jpg'),
        new Card('Дракон Огня', 'epic', 35, 'fire-dragon.jpg'),
    ];

    // Пример карт
    player.addCard(new Card('Самурай', 'common', 10, 'samurai.jpg'));
    player.addCard(new Card('Ниндзя', 'rare', 15, 'ninja.jpg'));
    player.addCard(new Card('Феникс', 'legendary', 50, 'phoenix.jpg'));
    player.addCard(new Card('Монах', 'epic', 30, 'monk.jpg'));

    opponentCards.forEach(card => card.render(opponentArena));

    // Механика боя
    fightBtn.addEventListener('click', () => {
        const playerPower = Array.from(playerArena.children).reduce((sum, card) => sum + parseInt(card.dataset.power), 0);
        const opponentPower = Array.from(opponentArena.children).reduce((sum, card) => sum + parseInt(card.dataset.power), 0);

        if (playerPower > opponentPower) {
            player.wins++;
            alert('Победа!');
        } else if (playerPower < opponentPower) {
            player.losses++;
            alert('Поражение!');
        } else {
            player.draws++;
            alert('Ничья!');
        }
    });

    // Управление модальными окнами
    menuBtn.addEventListener('click', () => menuModal.style.display = 'block');
    settingsBtn.addEventListener('click', () => settingsModal.style.display = 'block');
    statsBtn.addEventListener('click', () => {
        statsModal.style.display = 'block';
        drawStatsChart(player);
    });

    closeButtons.forEach(btn => btn.addEventListener('click', () => btn.closest('.modal').style.display = 'none'));

    // График статистики
    function drawStatsChart(player) {
        const ctx = document.getElementById('stats-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Победы', 'Поражения', 'Ничьи'],
                datasets: [{
                    label: 'Результаты',
                    data: [player.wins, player.losses, player.draws],
                    borderColor: ['green', 'red', 'blue'],
                    fill: false,
                }]
            },
            options: {
                scales: { y: { beginAtZero: true } }
            }
        });
    }
});
