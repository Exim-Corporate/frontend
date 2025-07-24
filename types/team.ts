export interface SocialMedia {
  type: string;
  icon: string;
  url: string;
}

export interface TeamMemberType {
  id: number;
  name: string;
  nameKey?: string; // Ключ перевода для имени
  role: string;
  roleKey?: string; // Ключ перевода для должности
  bio: string;
  bioKey?: string; // Ключ перевода для биографии
  imageSrc: string;
  socials: SocialMedia[];
}
