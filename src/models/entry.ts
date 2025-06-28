export type PainDetails = {
  where: string;
  level: number;
};

export interface LogEntry {
  pain: {
    locations: string[];
    detailsBefore: PainDetails[];
    detailsAfterTherapy: PainDetails[];
    detailsAfterTraining: PainDetails[];
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
    training?: string;
    meals?: string;
    general?: string;
  };
}

export interface LogBook {
  entriesByDay: Record<string, Partial<LogEntry>>;

  goals: string[];
  targets: {
    name: string;
    from: string;
    to: string;
  }[];
  motivation?: string;
}
