import type { TeamMemberType } from '@/types/team';

export const useTeamMembers = () => {
  const teamMembers = ref<TeamMemberType[]>([
    {
      id: 1,
      name: 'Artem Shapovalov',
      nameKey: 'team.members.john.name',
      role: 'CEO & Co-Founder',
      roleKey: 'team.members.john.role',
      bio: 'Visionary leader with 10+ years of experience in tech talent optimization and business development.',
      bioKey: 'team.members.john.bio',
      imageSrc: '/images/team/a.webp',
      socials: [
        {
          type: 'LinkedIn',
          icon: 'linkedin',
          url: '#',
        },
        {
          type: 'Twitter',
          icon: 'twitter',
          url: '#',
        },
      ],
    },
    // {
    //   id: 3,
    //   name: 'Oleksandr Shapovalov',
    //   nameKey: 'team.members.michael.name',
    //   role: 'Co-Founder & Chief of Finance',
    //   roleKey: 'team.members.michael.role',
    //   bio: 'Strategic financial leader ensuring sustainable growth and operational excellence.',
    //   bioKey: 'team.members.michael.bio',
    //   imageSrc: '/images/team/secret.jpg',
    //   socials: [
    //     {
    //       type: 'LinkedIn',
    //       icon: 'linkedin',
    //       url: '#',
    //     },
    //     {
    //       type: 'Email',
    //       icon: 'envelope',
    //       url: '#',
    //     },
    //   ],
    // },
    {
      id: 2,
      name: 'Dmytro Lukianenko',
      nameKey: 'team.members.sarah.name',
      role: 'CTO',
      roleKey: 'team.members.sarah.role',
      bio: 'Technical innovator with deep expertise in software architecture and emerging technologies.',
      bioKey: 'team.members.sarah.bio',
      imageSrc: '/images/team/b.webp',
      socials: [
        {
          type: 'LinkedIn',
          icon: 'linkedin',
          url: '#',
        },
        {
          type: 'GitHub',
          icon: 'github',
          url: '#',
        },
      ],
    },
  ]);

  return {
    teamMembers,
  };
};
