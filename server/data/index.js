module.exports = {
  members: {
    "0": "Олег",
    "1": "Саша"
  },
  accounts: {
    //Счета
    0: {
      name: "main",
      title: "Основной",
      member: 0
    },
    1: {
      name: "second",
      title: "Еще один",
      member: 1
    },
    10: {
      name: "savings",
      title: "Сбережения",
      member: 1
    }
  },
  periods: {},
  categories: {
    costs: {
      0: {
        name: "credits",
        title: "Кредиты"
      },
      1: {
        name: "utilities",
        title: "ЖКХ"
      },
      2: {
        name: "personal",
        title: "Личные"
      },
      3: {
        name: "transport",
        title: "Транспорт"
      },
      4: {
        name: "food",
        title: "Питание"
      },
      5: {
        name: "household",
        title: "Бытовые товары"
      },
      6: {
        name: "others",
        title: "Прочие"
      },
      7: {
        name: "transferToAccount",
        title: "Перевод на другой счет"
      }
    },
    incomes: {
      0: {
        name: "salary",
        title: "ЗП"
      },
      1: {
        name: "prepaidExpense",
        title: "Аванс"
      },
      2: {
        name: "other",
        title: "Прочие"
      },
      10: {
        name: "receiptWithYourAccount",
        title: "Поступление с своего счета"
      },
      20: {
        name: "receiptOther",
        title: "Прочие поступление"
      }
    }
  },
  costs: {
    planned: {
      0: {
        id: 0,
        account: 0, // С какого счета по умолчанию списывать
        category: 3,
        name: "Бензин",
        amount: 1500.0,
        start: '2019-12-07T11:00:09.296Z', // Крайний день оплаты/дата начала платежа
        committed: ["7.01.2020", "7.02.2020"], // Когда был проведен ??
        periodicity: 'monthly',
        create: "19.12.2019", // Дата создания - добавится бд
      },
      1: {
        id: 1,
        account: 0,
        category: 3,
        name: "Бензин",
        amount: 1500.0,
        start: '2019-12-23T11:00:09.296Z',
        committed: ["23.01.2020", "23.02.2020"],
        periodicity: 'monthly',
        create: "19.12.2019",
      },
      1: {
        id: 1,
        account: 0,
        category: 3,
        name: "Проезд",
        amount: 150,
        start: '2019-12-01T11:00:09.296Z',
        committed: ["23.01.2020", "23.02.2020"],
        periodicity: 'daily',
        create: "19.12.2019",
      },
      3: {
        id: 3,
        account: 0,
        category: 0,
        name: "Ипотека",
        amount: 19000.0,
        start: '2019-12-20T11:00:09.296Z',
        committed: ["20.01.2020", "20.02.2020"],
        periodicity: 'monthly',
        create: "19.12.2019",
      }
  },
    committed: {
      0: {
        id: 0,
        category: 3,
        name: "Бензин",
        amount: 1500.0,
        commit: '2019-12-22T19:41:05.221Z',
        account: 0,
        plan: 0 //Относится к запланированному
      },
      1: {
        id: 1,
        category: 3,
        name: "Не бензин",
        amount: 7.0,
        commit: '2019-12-05T19:41:05.221Z',
        account: 0,
        plan: 0 //Относится к запланированному
      },
      2: {
        id: 2,
        category: 3,
        name: "Паравоз",
        amount: 25000.0,
        commit: '2019-11-25T19:41:05.221Z',
        account: 0,
        plan: 0 //Относится к запланированному
      },
    }
  },
  incomes: {
    planned: {
      0: {
        id: 0,
        name: "Зарплата",
        category: 0,
        start: '2019-12-07T11:00:09.296Z',
        amount: 34000.0,
        committed: ["07.12.2019"],
        member: 0,
      },
      1: {
        id: 1,
        name: "Аванс",
        category: 0,
        start: '2019-12-23T11:00:09.296Z',
        amount: 16000.0,
        committed: ["23.12.2019"],
        member: 0,
      }
    },
    committed: {
      0: {
        id: 0,
        title: "Зарплата",
        category: 0,
        planAvailableDay: "7",
        amount: 100000.0,
        commit: '2019-12-07T19:41:05.221Z',
        member: 0,
        account: 0
      },
      11: {
        id: 11,
        title: "Подарок",
        category: 2,
        amount: 10000.0,
        commit: '2019-12-19T19:41:05.221Z',
        member: 0,
        account: 0
      },
      1: {
        id: 1,
        title: "Аванс",
        category: 1,
        commit: '2019-12-23T19:41:05.221Z',
        amount: 50000.0,
        member: 0,
        account: 0
      },
      2: {
        id: 2,
        title: "Перевод",
        category: 10,
        amount: 500,
        commit: '2019-12-10T19:41:05.221Z',
        account: 10,
        from: 0
      }
    }
  },
  saving: {
    planned: {},
    perfect: {}
  },
  balance: {}
};
