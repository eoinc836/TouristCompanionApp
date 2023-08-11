import React, { useEffect } from 'react';

const ZapierEmbed = ({ pageId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js';
    
    document.body.appendChild(script);

    const zapierElement = document.createElement('zapier-interfaces-page-embed');
    zapierElement.setAttribute('page-id', pageId);
    zapierElement.setAttribute('no-background', 'true');
    zapierElement.style.maxWidth = '500px';
    zapierElement.style.height = '600px';
    //zapierElement.style.background = 'transparent';

    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.bottom = '0';
    wrapper.style.right = '0';
    wrapper.style.margin = '0px'; 
    wrapper.style.width = '500px'; 
    wrapper.style.height = '600px'

    wrapper.appendChild(zapierElement);

    const container = document.getElementById('zapier-container');
    container.appendChild(wrapper);

    return () => {
      document.body.removeChild(script);
      container.removeChild(wrapper);
    };
  }, [pageId]);

  return <div id="zapier-container" />;
};

export default ZapierEmbed;
