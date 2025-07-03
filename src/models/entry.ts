export type PainDetails = {
  where: string;
  level: number;
};

export interface LogEntry {
  pain: {
    locations: string[];
    detailsBefore: PainDetails[];
    detailsAfter: PainDetails[];
  };
  nutrition: {
    breakfast?: string;
    energyAfterBreakfast?: number;
    lunch?: string;
    energyAfterLunch?: number;
    dinner?: string;
    energyAfterDinner?: number;
    between?: string;
    water?: number;
    tea?: number;
    coffee?: number;
    morningFormula?: number;
    eveningFormula?: number;
  };
  feelings: {
    training?: string[];
    meals?: string[];
    general?: string[];
  };
  menstruation: {
    day?: number;
    numOfDays?: number;
    bloodColor?: string;
    lumps?: string;
    pain?: boolean;
    sticky?: boolean;
    afterwards?: string[];
  };
}

export interface LogBook {
  entriesByDay: Record<string, Partial<LogEntry>>;

  user: {
    uid: string;
    name: string;
    email: string;
  };

  motivationByMonth?: {
    [month: string]: {
      motivation: string;
      goals: string[];
      targets: {
        name: string;
        from: string;
        to: string;
      }[];
    };
  };
}
