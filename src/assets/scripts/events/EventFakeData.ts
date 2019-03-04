const eventsTypes:string[] = ['transaction', 'news'];
const transactionsCurrency: string[] = ['RUB', 'USD', 'EURO'];
const transactionsAuthors: string[] = ['OOO "Молоко"', 'ИП "Иванов"', 'OAO "Мегафон"'];
const transactionsDescriptions: string[] = ['Списание задолженности', 'Пополнение баланса', 'Кредитная карта'];
const transactionsMoves: string[] = ['positive', 'negative'];
const newsHeads: string[] = ['Новая версия программы', 'Новый технический директор', 'Подведены итоги голосования'];
const newsMessages: string[] = ['У нас вышла новая версия программы', 'У нас новый технический директор', 'Наконецто подведены итоги голосования'];

const events:object[] = [];
for(let i = 0; i < 10; i++){
    const type = eventsTypes[getRandomInRange(0,1)];
    const date = new Date(getRandomInRange(2017,2018), getRandomInRange(0,11), getRandomInRange(0,30));
    if(type === 'transaction'){
        events.push({
            type: type,
            content: {
                summ: getRandomInRange(100,1000),
                currency: transactionsCurrency[getRandomInRange(0,2)],
                author: transactionsAuthors[getRandomInRange(0,2)],
                description: transactionsDescriptions[getRandomInRange(0,2)],
                move: transactionsMoves[getRandomInRange(0,1)],
            },
            date: date.toLocaleDateString(),
        });
    } else if (type === 'news'){
        events.push({
            type: type,
            content: {
                head: newsHeads[getRandomInRange(0,2)],
                message: newsMessages[getRandomInRange(0,2)]
            },
            date: date.toLocaleDateString(),
        });
    }
}

function getRandomInRange(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default events;