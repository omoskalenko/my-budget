export const DATE_LOCAL = {
  lang: {
    placeholder: "Выберите Дату",
    rangePlaceholder: ["Дата начала", "Дата конца"],
    today: "Сегодня",
    now: "Сейчас",
    backToToday: "Сегодня",
    ok: "Ok",
    clear: "Очистить",
    month: "Месяц",
    year: "Год",
    timeSelect: "Выберите время",
    dateSelect: "Выберите дату",
    monthSelect: "Выберите месяц",
    yearSelect: "Выберите год",
    decadeSelect: "Выберите десятилетие",
    yearFormat: "YYYY",
    dateFormat: "DD.MM.YYYY",
    dayFormat: "D",
    dateTimeFormat: "DD.MM.YYYY HH:mm:ss",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "Предыдущий месяц (PageUp)",
    nextMonth: "В следующем месяце (PageDown)",
    previousYear: "В прошлом году (Control + left)",
    nextYear: "В следующем году (Control + right)",
    previousDecade: "Последнее десятилетие",
    nextDecade: "Следующее десятилетие",
    previousCentury: "В прошлом веке",
    nextCentury: "В следующем веке",
    format: {
      eras: ['v. Chr.', 'n. Chr.'],
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      shortMonths: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sept',
        'Okt', 'Nov', 'Dez'],
      weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag',
        'Samstag'],
      shortWeekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      veryShortWeekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      ampms: ['AM', 'PM'],
      datePatterns: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'd.M.yy'],
      timePatterns: ['k:mm:ss \'GMT\'Z', 'k:mm:ss', 'k:mm:ss', 'k:mm'],
      dateTimePattern: '{date} {time}',
    }
  },
  timePickerLocale: {
    placeholder: "Выберите время"
  },
  dateFormat: "DD.MM.YYYY",
  dateTimeFormat: "DD.MM.YYYY HH:mm:ss",
  weekFormat: "YYYY-wo",
  monthFormat: "MM.YYYY",
  format: {
    eras: ['v. Chr.', 'n. Chr.'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
      'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    shortMonths: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sept',
      'Okt', 'Nov', 'Dez'],
    weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag',
      'Samstag'],
    shortWeekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    veryShortWeekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    ampms: ['AM', 'PM'],
    datePatterns: ['EEEE, d MMMM yyyy', 'd MMMM yyyy', 'd MMM yyyy', 'd.M.yy'],
    timePatterns: ['k:mm:ss \'GMT\'Z', 'k:mm:ss', 'k:mm:ss', 'k:mm'],
    dateTimePattern: '{date} {time}',
  }
};

export const TRANSACTIONS_TYPES = {
  COSTS: 'costs',
  INCOMES: 'incomes'
}

export const TRANSACTIONS_STATUSES = {
  COMMITTED: 'committed',
  PLANNED: 'planned'
}

export const TRANSACTIONS_TITLES = {
  INCOMES: {
    COMMITTED: {
      ADD: {
        title: 'Добавить доход',
        name: {
          label: '',
          message: '',
          placeholder: 'Комментарий',
        },
        account: {
          label: 'Счет',
          message: 'Выберите счет зачисления!',
          placeholder: 'Счет',
        },
        amount: {
          label: '',
          message: 'Введите сумму дохода!',
          placeholder: 'Сумма',
        },
        commit: {
          label: 'Дата совершения платежа',
          message: 'Выберите дату!',
          placeholder: '',
        },
        category: {
          label: '',
          message: 'Выберите категорию!',
          placeholder: 'Категория',
        },
      }
    },
    PLANNED: {
      ADD: {
        title: 'Добавить планируемый доход',
        name: {
          label: '',
          message: '',
          placeholder: 'Комментарий',
        },
        account: {
          label: 'Счет',
          message: 'Выберите счет зачисления!',
          placeholder: 'Счет',
        },
        amount: {
          label: '',
          message: 'Введите сумму дохода!',
          placeholder: 'Сумма',
        },
        committed: {
          label: '',
          message: '',
          placeholder: '',
        },
        start: {
          label: 'Дата первого платежа',
          message: 'Выберите дату!',
          placeholder: '',
        },
        periodicity: {
          label: '',
          message: 'Выберите периодичность!',
          placeholder: 'Периодичность',
        },
        category: {
          label: '',
          message: 'Выберите категорию!',
          placeholder: 'Категория',
        },
      }
    }
  },
  COSTS: {
    COMMITTED: {
      ADD: {
        title: 'Добавить расход',
        name: {
          label: '',
          message: '',
          placeholder: 'На что совершен расход?',
        },
        account: {
          label: 'Счет',
          message: 'Выберите счет списания!',
          placeholder: 'Счет',
        },
        amount: {
          label: '',
          message: 'Введите сумму расхода!',
          placeholder: 'Сумма',
        },
        commit: {
          label: 'Дата совершения платежа',
          message: 'Выберите дату!',
          placeholder: '',
        },
        category: {
          label: '',
          message: 'Выберите категорию!',
          placeholder: 'Категория',
        },
      }
    },
    PLANNED: {
      ADD: {
        title: 'Добавить планируемый расход',
        name: {
          label: '',
          message: '',
          placeholder: 'На что совершен расход?',
        },
        account: {
          label: 'Счет',
          message: 'Выберите счет списания!',
          placeholder: 'Счет',
        },
        amount: {
          label: '',
          message: 'Введите сумму расхода!',
          placeholder: 'Сумма',
        },
        committed: {
          label: '',
          message: '',
          placeholder: 'Исполненные платежи',
        },
        start: {
          label: 'Дата первого платежа',
          message: 'Выберите дату!',
          placeholder: 'Дата начала',
        },
        periodicity: {
          label: '',
          message: 'Выберите периодичность!',
          placeholder: 'Периодичность',
        },
        category: {
          label: '',
          message: 'Выберите категорию!',
          placeholder: 'Категория',
        },
      }
    }
  }
}


