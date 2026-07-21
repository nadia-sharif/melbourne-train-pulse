import{t as e}from"./NoParameters-XZJ-8n06.js";import{n as t,t as n}from"./glsl-D85RBwKC.js";import{t as r}from"./Texture2DPassUniform-CiCHIiok.js";import{t as i}from"./ScreenSpacePass.glsl-9L-_X5OK.js";import{t as a}from"./ShaderBuilder-8uuwgR05.js";import{t as o}from"./EmissionDimming.glsl-BXZlyzId.js";var s=class extends e{};function c(e){let s=new a;s.include(i);let{hasEmission:c}=e,l=s.fragment;return c&&l.include(o,e),l.uniforms.add(new r(`colorTexture`,e=>e.color),new r(`splatOutputColor`,e=>e.splatColor)),c&&l.uniforms.add(new r(`emissionTexture`,e=>e.emission)),s.outputs.add(`fragColor`,`vec4`,0),c&&s.outputs.add(`fragEmission`,`vec4`,1),s.fragment.main.add(t`
      vec4 color = texture(colorTexture, uv);
      vec4 splatColor = texture(splatOutputColor, uv);

      fragColor = splatColor + color * (1.0 - splatColor.a);
      ${n(c,t`
          vec4 emission = texture(emissionTexture, uv);
          float srcAlpha = splatColor.a;

          if (srcAlpha == 0.0) {
            fragEmission = emission;
            return;
          }

          vec3 oitDimming = emissionDimming(splatColor.rgb, 1.0 - srcAlpha);
          float opaqueSuppression = smoothstep(0.95, 1.0, srcAlpha);
          vec3 dimming = mix(oitDimming, vec3(0.0), opaqueSuppression);

          fragEmission = vec4(emission.rgb * dimming, emission.a);
        `)}
    `),s}var l=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:s,build:c},Symbol.toStringTag,{value:`Module`}));export{l as n,c as r,s as t};