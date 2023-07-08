import { EmbedType, EmbedLayoutType } from "../../enums/Embed";

const getIframeEmbedCode = ({ width, height, formRef, isFullScreen }) => {
  if (!isFullScreen) {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Granularity</title>
          <style type="text/css">
            html,
            body {
              margin: 0;
              height: 100%;
              overflow: hidden;
            }
      
            iframe {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              border: 0;
            }
          </style>
        </head>
        <body>    
          <iframe
            width="${width}"
            height="${height}"
            frameborder="0"
            allow="camera; microphone; autoplay; encrypted-media;"
            src="${process.env.REACT_APP_APP_URL}/form/${formRef}"
          ></iframe>
        </body>
      </html>`;
  }

  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Granularity</title>
        <style type="text/css">
          html,
          body {
            margin: 0;
            height: 100%;
            overflow: hidden;
          }
    
          iframe {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            border: 0;
          }
        </style>
      </head>
      <body>    
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          allow="camera; microphone; autoplay; encrypted-media;"
          src="${process.env.REACT_APP_APP_URL}/form/${formRef}"
        ></iframe>
      </body>
    </html>`;
};

const getJavaScriptEmbedCode = ({
  layout,
  width,
  height,
  formRef,
  isFullScreen = false,
}) => {
  const mapper = {
    [EmbedLayoutType.STANDARD]: () => {
      if (!isFullScreen) {
        return `<script SameSite="None; Secure" src="${process.env.REACT_APP_EMBED_SCRIPT_URL}"></script>
<div id="granularity-container" style="width: ${width}; height: ${height}"></div>    
<script>
    Granularity.Container({
        containerId: "granularity-container",
        formId: "${formRef}",
    });
</script>`;
      }

      return `<script SameSite="None; Secure" src="${process.env.REACT_APP_EMBED_SCRIPT_URL}"></script>
<div id="granularity-container" style="width: 100%; height: 100vh"></div>
<script>
    Granularity.Container({
        containerId: "granularity-container",
        formId: "${formRef}",
    });
</script>`;
    },
    [EmbedLayoutType.POPUP]:
      () => `<script SameSite="None; Secure" src="${process.env.REACT_APP_EMBED_SCRIPT_URL}"></script>
<script>
    const granularity = Granularity.Popup({
        formId: "${formRef}",
        delay: 1000, // in milliseconds
        loadingBackgroundColor: "#ffffff",
    });
</script>

// You can open the pop up programatically with this commad:
// granularity.open();

// For example, here is a button element you can place in your HTML:
// <button onclick="function(){granularity.open();}">Open Form</button>`,
  };

  const applyMapper = mapper[layout];

  return applyMapper ? applyMapper() : null;
};

const getReactJSEmbedCode = ({
  layout,
  width,
  height,
  formRef,
  isFullScreen,
}) => {
  const mapper = {
    [EmbedLayoutType.STANDARD]: () => {
      if (!isFullScreen) {
        return `import React, { useEffect } from "react";
  const GranularityForm = () => {
    useEffect(() => {
        const loadGranularity = () =>
            new Promise((resolve) => {
                const existingScript = document.getElementById("granularity-embed-lib");
          
                if (!existingScript) {
                    const script = document.createElement("script");
          
                    script.src = "${process.env.REACT_APP_EMBED_SCRIPT_URL}";
                    script.id = "granularity-embed-lib";
          
                    document.body.appendChild(script);
          
                    script.onload = () => {
                        resolve();
                    };
                }
          
                if (existingScript) resolve();
        });
          
        loadGranularity().then(() => {
            // eslint-disable-next-line
            Granularity.Container({
            containerId: "granularity-container",
            formId: "${formRef}",
        });
    });
    }, []);
          
    return (
        <div
            id="granularity-container"
            style={{ width: "${width}", height: "${height}" }}
        />
    );
};
          
export default GranularityForm;`;
      }

      return `import React, { useEffect } from "react";
      const GranularityForm = () => {
        useEffect(() => {
          const loadGranularity = () =>
            new Promise((resolve) => {
              const existingScript = document.getElementById("granularity-embed-lib");
      
              if (!existingScript) {
                const script = document.createElement("script");
      
                script.src = "${process.env.REACT_APP_EMBED_SCRIPT_URL}";
                script.id = "granularity-embed-lib";
      
                document.body.appendChild(script);
      
                script.onload = () => {
                  resolve();
                };
              }
      
              if (existingScript) resolve();
            });
      
          loadGranularity().then(() => {
            // eslint-disable-next-line
            Granularity.Container({
              containerId: "granularity-container",
              formId: "${formRef}",
            });
          });
        }, []);
      
        return (
          <div
            id="granularity-container"
            style={{ width: "100%", height: "100vh" }}
          />
        );
      };
      
      export default GranularityForm;`;
    },
    [EmbedLayoutType.POPUP]: () => `import React, { useEffect } from "react";
    const GranularityForm = () => {
        useEffect(() => {
          const loadGranularity = () =>
            new Promise((resolve) => {
              const existingScript = document.getElementById("granularity-embed-lib");
      
              if (!existingScript) {
                const script = document.createElement("script");
      
                script.src = "${process.env.REACT_APP_EMBED_SCRIPT_URL}";
                script.id = "granularity-embed-lib";
      
                document.body.appendChild(script);
      
                script.onload = () => {
                  resolve();
                };
              }
      
              if (existingScript) resolve();
            });
      
          loadGranularity().then(() => {
            // eslint-disable-next-line            
            Granularity.Popup({
              formId: "${formRef}",
              delay: 1000, // in milliseconds
              loadingBackgroundColor: "#ffffff",
            });
          });
        }, []);
      
        return null;
      };
      
      export default GranularityForm;
      `,
  };

  const applyMapper = mapper[layout];

  return applyMapper ? applyMapper() : null;
};

export const getEmbedCode = ({
  type,
  layout,
  width,
  height,
  formRef,
  isFullScreen = false,
}) => {
  const mapper = {
    [EmbedType.IFRAME]: () =>
      getIframeEmbedCode({ width, height, formRef, isFullScreen }),
    [EmbedType.JAVASCRIPT]: () =>
      getJavaScriptEmbedCode({
        layout,
        width,
        height,
        formRef,
        isFullScreen,
      }),
    [EmbedType.REACTJS]: () =>
      getReactJSEmbedCode({
        layout,
        width,
        height,
        formRef,
        isFullScreen,
      }),
  };

  const applyMapper = mapper[type];

  return applyMapper ? applyMapper() : null;
};
