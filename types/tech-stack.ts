export interface TechStackTechnology {
  name: string;
  icon: string;
}

export interface TechStackRole {
  id: string;
  roleKey: string;
  technologies: TechStackTechnology[];
}

export interface TechStackSectionItem {
  id: string;
  sectionKey: string;
  roles: TechStackRole[];
}
