import React, { useEffect, useRef, memo } from 'react';
import { useParams } from 'react-router-dom';
function TradingViewWidget({symbol}) {
    
    const container = useRef();
    const name = useParams()
    {console.log('symbol:',symbol)}
  useEffect(
    () => {
        
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${symbol}",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "2",
          "locale": "en",
          "enable_publishing": true,
          "withdateranges": true,
          "range": "1D",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": false,
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

export default memo(TradingViewWidget);
