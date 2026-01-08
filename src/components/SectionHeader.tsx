import { Stack, Typography } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <Stack spacing={1} alignItems={align === 'center' ? 'center' : 'flex-start'}>
      {eyebrow ? (
        <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.2em' }}>
          {eyebrow}
        </Typography>
      ) : null}
      <Typography variant="h2">{title}</Typography>
      {subtitle ? (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
          {subtitle}
        </Typography>
      ) : null}
    </Stack>
  );
}
