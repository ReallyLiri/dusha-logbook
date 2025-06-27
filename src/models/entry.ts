export type PainLocation = 'arm' | 'front' | 'back' | 'head' | 'foot';

export type PainDetails = {
  where: string;
  level: number;
};

export interface LogEntry {
  pain: {
    locations: {
      location: PainLocation;
      side: 'left' | 'right' | 'both';
    }[];
    detailsBefore: PainDetails[];
    detailsAfterTherapy: PainDetails[];
    detailsAfterTraining: PainDetails[];
  };
  nutrition: {
    breakfast: string | null;
    energyAfterBreakfast: number | null;
    lunch: string | null;
    energyAfterLunch: number | null;
    dinner: string | null;
    energyAfterDinner: number | null;
    between: string | null;
    water: number | null;
    tea: number | null;
    coffee: number | null;
    morningFormula: number | null;
    eveningFormula: number | null;
  };
  feelings: {
    therapy: string[];
    training: string[];
    meals: string[];
  };
}

export interface LogBook {
  entriesByDay: Record<string, LogEntry>;

  goals: string[];
  targets: {
    name: string;
    from: string;
    to: string;
  }[];
  motivation: string | null;
}
