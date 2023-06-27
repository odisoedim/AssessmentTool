export enum GraphqlFrom {
  CMS = 'CMS',
  KH = 'KH',
}

export enum Service {
  CMS = 'CMS',
  ES = 'ES',
  AUTH0 = 'AUTH0',
  ACCOUNT = 'ACCOUNT',
  MIDDLEWARE = 'MIDDLEWARE',
}

export enum CaseSort {
  most_relevant,
  recently_added,
  recently_updated,
  most_popular,
}

export enum ENUM_QUESTION_TYPE {
  text = 'text',
  check = 'check',
  list = 'list',
}

export enum PROGRESS_BG_COLOR_TYPE {
  primary = 'primary',
  grey = 'grey',
}

export enum Completion {
  NotStart,
  Start,
  Finish,
  NotApplicable,
}

export enum AssessmentLevel {
  Tier1,
  Tier2,
  Tier3,
}

export enum ENUM_SUBSTRATEGY_QUESTION_TYPE {
  text = 'text',
  check = 'check',
  check_with_other = 'check_with_other',
  radio = 'radio',
  radio_with_other = 'radio_with_other',
}
