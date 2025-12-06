'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function ConfigWatcher() {
  const router = useRouter();
  const [lastMtime, setLastMtime] = useState<number>(0);

  useEffect(() => {
    const checkConfig = async () => {
      try {
        const res = await fetch('/api/config/check');
        const data = await res.json();

        // If we have a previous mtime and it changed, refresh
        if (lastMtime !== 0 && data.mtime !== lastMtime) {
          console.log('Config changed, refreshing...');
          router.refresh();
        }
        // If we didn't have a config (mtime 0) and now we do (mtime > 0), refresh
        else if (lastMtime === 0 && data.mtime > 0) {
          console.log('Config created, refreshing...');
          router.refresh();
        }

        setLastMtime(data.mtime);
      } catch (e) {
        console.error(e);
      }
    };

    // Check immediately
    checkConfig();

    // Then poll every 2 seconds
    const interval = setInterval(checkConfig, 2000);
    return () => clearInterval(interval);
  }, [lastMtime, router]);

  return null;
}
