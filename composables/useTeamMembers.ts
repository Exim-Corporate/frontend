import type { TeamMemberType } from '@/types/team';

export const useTeamMembers = () => {
  const teamMembers = ref<TeamMemberType[]>([
    {
      id: 1,
      name: 'Artem Shapovalov',
      nameKey: 'team.members.artem.name',
      role: 'CEO & Co-Founder',
      roleKey: 'team.members.artem.role',
      bio: 'Visionary leader with 10+ years of experience in tech talent optimization and business development.',
      bioKey: 'team.members.artem.bio',
      imageSrc: '/images/team/a.webp',
      socials: [],
    },
    {
      id: 2,
      name: 'Dmytro Lukianenko',
      nameKey: 'team.members.dmytro.name',
      role: 'CTO',
      roleKey: 'team.members.dmytro.role',
      bio: 'Technical innovator with deep expertise in software architecture and emerging technologies.',
      bioKey: 'team.members.dmytro.bio',
      imageSrc: '/images/team/b.webp',
      socials: [],
    },
  ]);

  return {
    teamMembers,
  };
};
