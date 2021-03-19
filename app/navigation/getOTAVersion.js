import { useEffect, useState } from 'react';
import codePush from 'react-native-code-push';

async function getOTAVersion() {
  try {
    const update = await codePush.getUpdateMetadata();

    return update ? update.label : null;
  } catch (error) {
    return null;
  }
}

export function useOTAVersion() {
  // const [appVersion, setAppVersion] = useState(DeviceInfo.getReadableVersion());
  const [appVersion, setAppVersion] = useState(null);

  useEffect(() => {
    getOTAVersion().then((OTAVersion) => {
      if (OTAVersion) {
        setAppVersion(`${OTAVersion}`);
      }
    });
  }, []);

  return { appVersion };
}
