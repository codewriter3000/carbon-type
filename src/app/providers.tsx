'use client';

import { Theme } from '@carbon/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Theme theme="white">{children}</Theme>;
}
