
import { useEffect } from 'react';
import { config } from '../config/env';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  className?: string;
}

const AdSense = ({ 
  adSlot, 
  adFormat = "auto", 
  adLayout = "", 
  className = "w-full" 
}: AdSenseProps) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={config.adsense.clientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense;
