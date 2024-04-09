export type EventsList = {
  [key: string]: any;
  types?: { [key: string]: number };
  themes?: { [key: string]: number };
  title?: string | null;
  startDate?: string;
  endDate?: string;
  program?: string;
  repetition?: number;
  attendees: number;
  theme?: string;
  type?: string;
  targetAudience?: string;
  Organizer?: string;
  femaleAttendees: number;
  maleAttendees: number;
  nonBinaryAttendees: number;
  undisclosedAttendees: number;
  heardThroughTwitter: number;
  heardThroughFacebook: number;
  heardThroughInstagram: number;
  heardThroughMastodon: number;
  heardThroughNewsletter: number;
  heardThroughWeb: number;
  heardThroughSigns: number;
  heardThroughOther: number;
};
export interface DataProps {
  data: EventsList | { [key: string]: number };
  title?: string;
  initialTotals?: EventsList;
  onTotalsChange?: (newTotals: EventsList) => void;
  totals?: EventsList;
  types?: { [key: string]: number };
  themes?: { [key: string]: number };
}

export interface EventData {
  Twitter: number;
  Facebook: number | undefined;
  Instagram: number | undefined;
  Mastodon: number | undefined;
  Newsletter: number | undefined;
  Web: number | undefined;
  Signs: number | undefined;
  Other: number | undefined;
}
export interface PieData {
  Homes: number;
  Dones: number;
  NoBinaries: number;
  NoResponde: number;
}
