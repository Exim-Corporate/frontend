<template>
  <div
    data-aos="zoom-in"
    data-aos-duration="600"
    class="team-member group"
  >
    <div class="card-container pt-16 pb-6 px-4">
      <!-- Фото: всегда scale-115, фиксированная высота, object-cover -->
      <div
        class="absolute -top-24 left-1/2 -translate-x-1/2 w-44 h-64 md:w-48 md:h-72 z-20 drop-shadow-2xl"
      >
        <NuxtImg
          :src="member.imageSrc"
          :alt="member.name"
          class="w-full h-full object-cover rounded-2xl photo-minimal-border scale-115 transition-all duration-500"
          quality="90"
          format="webp"
          loading="lazy"
          placeholder
        />
      </div>
      <div
        class="photo-section pt-0 relative z-0"
        style="height: 120px; overflow: visible"
      />
      <div class="content-section pt-8">
        <div class="member-info">
          <h3 class="member-name">{{ $t(member.nameKey as string) }}</h3>
          <div class="member-role">{{ $t(member.roleKey as string) }}</div>
        </div>
        <p class="member-bio">{{ $t(member.bioKey as string) }}</p>
      </div>
      <div class="card-decorations">
        <div class="geometric-shape shape-1" />
        <div class="geometric-shape shape-2" />
        <div class="geometric-shape shape-3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TeamMemberType } from '@/types/team';

defineProps<{
  member: TeamMemberType;
}>();
</script>

<style scoped>
.team-member {
  height: 100%;
  perspective: 1200px;
}

.card-container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: visible;
  background: rgba(15, 23, 42, 0.6);
  /* backdrop-filter: blur(12px); */
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.08) inset;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  min-height: 380px;
  max-width: 450px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 768px) {
  .card-container {
    min-height: 380px;
    max-width: 450px;
    min-width: 350px;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 767px) {
  .card-container {
    min-width: 260px;
    max-width: 450px;
    width: 100%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}

.photo-3d {
  /* убраны transition и transform, только фиксированный размер */
}

/* Секция с фотографией - занимает всю ширину */
.photo-section {
  position: relative;
  /* width: 100%; */
  height: 120px;
  overflow: visible;
  /* теперь overflow: visible, чтобы фото выглядывало */
}

/* .member-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
} */

.photo-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(15, 23, 42, 0.95) 100%);
  z-index: 2;
}

/* Секция с контентом */
.content-section {
  position: relative;
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  z-index: 3;
  padding-top: 2rem;
}

/* Информация о члене команды */
.member-info {
  margin-bottom: 1.5rem;
}

/* Имя члена команды */
.member-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  position: relative;
  background: linear-gradient(135deg, #4ca1ff, #af55ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.01em;
}

/* Должность */
.member-role {
  display: inline-flex;
  font-size: 0.95rem;
  color: #fff;
  margin-bottom: 1.5rem;
  padding: 0.4rem 1.2rem;
  background: rgba(76, 161, 255, 0.12);
  border-radius: 30px;
  border: 1px solid rgba(76, 161, 255, 0.2);
  /* backdrop-filter: blur(8px); */
}

/* Биография */
.member-bio {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  flex-grow: 1;
  position: relative;
  padding-left: 1.25rem;
}

.member-bio::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: linear-gradient(to bottom, #4ca1ff, #af55ff);
  border-radius: 3px;
}

/* Социальные сети */
.social-links {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  color: white;
  transition: all 0.3s ease;
  /* backdrop-filter: blur(5px); */
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.social-btn:hover {
  background: rgba(76, 161, 255, 0.2);
  transform: translateY(-3px) scale(1.05);
  color: #4ca1ff;
  box-shadow: 0 10px 25px -10px rgba(76, 161, 255, 0.5);
}

/* Декоративные элементы */
.card-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.geometric-shape {
  position: absolute;
  background: linear-gradient(135deg, #4ca1ff, #af55ff);
  opacity: 0.07;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.shape-1 {
  top: -30px;
  right: -30px;
  width: 120px;
  height: 120px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

.shape-2 {
  bottom: 10%;
  left: -30px;
  width: 80px;
  height: 80px;
  border-radius: 64% 36% 27% 73% / 55% 58% 42% 45%;
}

.shape-3 {
  top: 50%;
  right: -15px;
  width: 40px;
  height: 40px;
  border-radius: 37% 63% 56% 44% / 49% 56% 44% 51%;
}

/* Эффекты при наведении */
.team-member:hover .card-container {
  transform: translateY(-12px) scale(1.03) rotateX(4deg);
  box-shadow:
    0 30px 60px -15px #4ca1ff99,
    0 0 0 1px #af55ff33 inset;
}

.team-member:hover .photo-3d {
  transform: scale(1.18) rotateX(8deg) translateY(-8px);
  box-shadow:
    0 12px 48px 0 #4ca1ffcc,
    0 0 0 4px #af55ff33;
  z-index: 30;
}

.team-member:hover .shape-1 {
  transform: rotate(15deg) scale(1.1);
  opacity: 0.13;
}

.team-member:hover .shape-2 {
  transform: rotate(-10deg) translateY(10px);
  opacity: 0.16;
}

.team-member:hover .shape-3 {
  opacity: 0.18;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .card-container {
    min-height: 320px;
    max-width: 450px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .photo-section {
    height: 90px;
  }

  .content-section {
    padding: 1.5rem;
  }

  .member-name {
    font-size: 1.5rem;
  }
}

/* Адаптивный дизайн для более крупных экранов */
@media (min-width: 1280px) {
  .card-container {
    border-radius: 32px;
  }

  .photo-section {
    height: 400px;
  }
}

.photo-minimal-border {
  /* border-width: 2.5px; */
  border-style: solid;
  /* border-image: linear-gradient(120deg, #4ca1ff 10%, transparent 40%, #af55ff 90%) 2; */
  background-clip: padding-box;
}
</style>
