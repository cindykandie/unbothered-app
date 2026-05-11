export function getGreeting(name: string): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return `Good morning, ${name} ☁️`;
  if (hour >= 12 && hour < 17) return `Good afternoon, ${name}`;
  return `Good evening, ${name}`;
}

export function getDateLabel(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}
