var muBtn = document.getElementById('mu');
muBtn.onclick = main;
var isGameOver = false;

function main() {
    muBtn.disabled = true;
    new Promise(res => {
        document.querySelector('#audio').play();
        muBtn.style.opacity = 0;
        setTimeout(res, 1000);
    })
    .then(() => {
        return step(0, 'url(src/blood_1.png)');
    })
    .then(() => {
        return step(1, 'url(src/blood_1.png), url(src/blood_2.png)');
    })
    .then(() => {
        return step(2, '');
    })
    .then(() => {
        document.querySelector('#audio').pause();
        new Promise(res => {
            window.alert('もう…プー王子！お前の心に、じかに問い掛けることしかできなくなってしまった。\nもはやお前には心しか残っておらぬ。\n最後に心を奪いとるが、それだけはお前にも許せまい？')
            setTimeout(res, 500);
        }).then(() => {
            window.alert('はて…返事もできぬ？動くこともできぬのか？\nかなしいか。さみしいか。つらいか。せつないか。\n心を奪われたなら、悲しみさえも失うのだぞ。良いのか？！心を奪いとるぞ！')
            window.alert('プー！心をとるぞ！')
        });
        return new Promise((res) => {
            setTimeout(res, 3000);
        })
    })
    .then(() => {
        console.log('clear')
        gameOver(false);
    })
    .catch(() => {
        console.error('failure')
        gameOver(true);
    });
}


function gameOver(isFailure) {
    isGameOver = true;
    muBtn.style.opacity = 1;
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    document.querySelector('#audio').pause();
    if (isFailure) {
        muBtn.innerText = 'Failure';
    } else {
        muBtn.innerText = 'Success';
    }
}

/** show messages */
function step(i, backgroundImage) {
    const messages = [
        ['さてさてプー王子。私はお前の先祖の霊じゃ。\n試練の仕上げに、お前の足を折るが、よいな。', '足を失うが、よいな？'],
        ['はてさてプー王子。\n足も腕もなく、ここに転がりつづけるか。\nしからば、お前の耳をそぐ。\n耳をそいでもよいな？音を失うがよいな？', '耳をそいでもよいのだな？'],
        ['これはこれはプー王子。\n足、腕もなく音もなし。空に言葉をうかばせて…\n私はお前に問い掛けてみようぞ。\nお前のまなこをつぶすが…それもよしとするのか？\n暗闇の中に生きることをお前は望むのか？', 'まなこをつぶすぞ。よいな？']
    ];
    return new Promise((res, rej) => {
        window.alert(messages[i][0]);
        const status = window.confirm(messages[i][1]);

        if (status) {
            document.body.style.backgroundImage = backgroundImage;
            if (backgroundImage == '') {
                document.body.style.backgroundColor = '#222';
            }
            setTimeout(res, 1000);
        } else {
            rej();
        }
    });
}

/** shortcut to click muBtn */
window.onkeydown = (e) => {
    if (e.key === 'Enter' && !isGameOver) {
        muBtn.onclick();
    }
}