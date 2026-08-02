export interface CRCompany {
  id: string;
  name: string;
  type: string; // Product Based, Service Based, Startup, etc.
  industry: string;
  headquarters: string;
  founded: string;
  size: string;
  hiringStatus: string;
  description: string;
  popularRoles: string[];
  technologies: string[];
}

export interface CRRole {
  id: string;
  title: string;
  description: string;
  skills: string[];
  demand: string; // High, Medium, Low
}
