export interface CaseStudyImpact {
  value: string;
  labelKey: string;
}

export interface CaseStudyItem {
  id: string;
  labelKey: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  impacts: CaseStudyImpact[];
}
