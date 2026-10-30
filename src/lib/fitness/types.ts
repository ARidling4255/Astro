export type Effort = "easy" | "just-right" | "hard";

export type ContextId = "poor-sleep" | "wine";

export type ClassKind = "strength" | "cardio";

export type HistoryFilter = ClassKind | "mixed";

export type Unit = "lb" | "in";

export type Movement = {
  id: string;
  name: string;
  aliases: string[];
  heardAs?: string;
  unit: Unit;
  increment: number;
  order: number;
};

export type SessionLog = {
  id: string;
  date: string;
  movementId: string;
  classKind: ClassKind;
  value: number;
  effort: Effort;
  context?: ContextId;
  note?: string;
  setAside: boolean;
};

export type GoalKind = "load" | "milestone" | "endurance" | "calories";

export type Goal = {
  id: string;
  title: string;
  kind: GoalKind;
  movementId?: string;
  target?: number;
  progress?: number;
};

export type Sex = "female" | "male" | "unspecified";

export type Profile = {
  sex: Sex | null;
  age: number | null;
  weightLb: number | null;
  heightIn: number | null;
  classMinutes: number;
};
export type Recovery = {
  dropBpm: number;
  previousDrop: number;
  previousWhen: string;
  highZoneMin: number;
  note: string;
};

export type DraftLine = {
  key: string;
  movementId: string;
  value: number;
  effort: Effort;
  context?: ContextId;
  effortWord?: string;
};

export type Draft = {
  date: string;
  classKind: ClassKind;
  transcript: string;
  lines: DraftLine[];
  phase: "review" | "compose";
  editing: boolean;
  savedTick: number;
  datePinned: boolean;
  error?: string;
};
