export default
  {
    "members": {
      "0": "Олег",
      "1": "Саша"
    },
    "accounts": { //Счета
      0: {
        "name": "main",
        "title": "Основной",
        "member": 0,
        // "transactions": {
        //   "income": [0, 11, 1],
        //   "costs": [0, 1, 2, 3, 4]
        // }
      },
      1: {
        "name": "second",
        "title": "Еще один",
        "member": 1,
        // "transactions": {
        //   "income": [],
        //   "costs": []
        // }
      },
      10: {
        "name": "savings",
        "title": "Сбережения",
        "member": 1,
        // "transactions": {
        //   "income": [],
        //   "costs": []
        // }
      }
    },
    "periods": {

    },
    "catigories": {
      "costs": {
        0: {
          "name": "credits",
          "title": "Кредиты"
        },
        1: {
          "name": "utilities",
          "title": "ЖКХ"
        },
        2: {
          "name": "personal",
          "title": "Личные"
        },
        3: {
          "name": "transport",
          "title": "Транспорт"
        },
        4: {
          "name": "food",
          "title": "Питание"
        },
        5: {
          "name": "household",
          "title": "Бытовые товары"
        },
        6: {
          "name": "others",
          "title": "Прочие"
        },
        7: {
          "name": "transferToAccount",
          "title": "Перевод на другой счет"
        }
      },
      "income": {
        0: {
          "name": "salary",
          "title": "ЗП"
        },
        1: {
          "name": "prepaidExpense",
          "title": "Аванс"
        },
        2: {
          "name": "other",
          "title": "Прочие"
        },
        10: {
          "name": "receiptWithYourAccount",
          "title": "Поступление с своего счета"
        },
        20: {
          "name": "receiptOther",
          "title": "Прочие поступление"
        }
      }
    },
    "costs": {
      "planned": [
        {
          "id": 0,
          "catigory": 3,
          "name": "Бензин",
          "amount": 1500.00,
          "paymentDeadline": "7", // Крайний день оплаты
          "create": "19.12.2019", // Дата создания
          "paid": ["7.01.2020", "7.02.2020"], // Когда был проведен ??
          "account": 0 // С какого счета по умолчанию списывать
        },
        {
          "id": 1,
          "catigory": 3,
          "name": "Бензин",
          "amount": 1500.00,
          "paymentDeadline": "23",
          "create": "19.12.2019",
          "paid": ["23.01.2020", "23.02.2020"],
          "account": 0
        },
        {
          "id": 3,
          "catigory": 0,
          "name": "Ипотека",
          "amount": 19000.00,
          "paymentDeadline": "20",
          "create": "19.12.2019",
          "paid": ["20.01.2020", "20.02.2020"],
          "account": 0
        }
      ],
      "perfect": {
        0: {
          "id": 0,
          "catigory": 3,
          "name": "Бензин",
          "amount": 1500.00,
          "committed": "17.12.2019",
          "account": 0,
          "plan": 0 //Относится к запланированному
        },
        1: {
          "id": 1,
          "catigory": 6,
          "name": "Подарки",
          "amount": 1500.00,
          "committed": "15.12.2019",
          "account": 0
        },
        2: {
          "id": 2,
          "catigory": 6,
          "name": "Расход 1",
          "amount": 500,
          "committed": "01.12.2019",
          "account": 0
        },
        3: {
          "id": 3,
          "catigory": 6,
          "name": "Расход 2",
          "amount": 500,
          "committed": "10.11.2019",
          "account": 0
        },
        4: {
          "id": 4,
          "catigory": 6,
          "name": "Расход 3",
          "amount": 500,
          "committed": "01.11.2019",
          "account": 0
        },
        5: {
          "id": 5,
          "catigory": 7,
          "name": "Перевод на сберегательный счет",
          "amount": 500,
          "committed": "10.11.2019",
          "account": 0,
          "to": 10,
        }
      },
    },
    "income": {
      "planned": [
        {
          "id": 0,
          "name": "Зарплата",
          "categories": 0,
          "planAvailableDay": "7",
          "amount": 34000.00,
          "member": 0,
          "factAvailable": ["07.12.2019"]
        },
        {
          "id": 1,
          "name": "Аванс",
          "categories": 0,
          "planAvailableDay": "23",
          "amount": 16000.00,
          "member": 0,
          "dates": ["23.12.2019"]
        }
      ],
      "perfect": {
        0: {
          "id": 0,
          "title": "Зарплата",
          "catigory": 0,
          "planAvailableDay": "7",
          "amount": 34000.00,
          "committed": "07.12.2019",
          "member": 0,
          "account": 0,
        },
        11: {
          "id": 11,
          "catigory": 6,
          "title": "Подарок",
          "amount": 10000.00,
          "committed": "19.12.2019",
          "member": 0,
          "account": 0,
        },
        1: {
          "id": 1,
          "title": "Аванс",
          "catigory": 0,
          "committed": "23.12.2019",
          "amount": 16000.00,
          "member": 0,
          "account": 0,
        },
        2: {
          "id": 2,
          "title": "Перевод",
          "catigory": 7,
          "amount": 500,
          "committed": "10.11.2019",
          "account": 10,
          "from": 0,
        }
      }
    },
    "saving": {
      "planned": {},
      "perfect": {},
    },
    "balance": {

    }
  }
