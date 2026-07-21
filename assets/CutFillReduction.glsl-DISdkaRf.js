import{t as e}from"./NoParameters-XZJ-8n06.js";import{n as t,t as n}from"./glsl-D85RBwKC.js";import{t as r}from"./Texture2DPassUniform-CiCHIiok.js";import{t as i}from"./ScreenSpacePass.glsl-9L-_X5OK.js";import{t as a}from"./ShaderBuilder-8uuwgR05.js";var o=class extends e{};function s(e){let{reductionPass:o}=e,s=new a;return s.include(i),s.fragment.uniforms.add(new r(`cutFillDepthTexture`,e=>e.depthTexture)),s.fragment.main.add(t`
    ivec2 iuv = ivec2(gl_FragCoord.xy) * 2;

    vec2 t0 = texelFetch(cutFillDepthTexture, iuv + ivec2(0, 0), 0).rg;
    vec2 t1 = texelFetch(cutFillDepthTexture, iuv + ivec2(1, 0), 0).rg;
    vec2 t2 = texelFetch(cutFillDepthTexture, iuv + ivec2(0, 1), 0).rg;
    vec2 t3 = texelFetch(cutFillDepthTexture, iuv + ivec2(1, 1), 0).rg;

    ${n(o===0,`
        vec2 totalDepth = t0 + t1 + t2 + t3;

        fragColor = vec4(totalDepth, 0.0, 0.0);
      `)}

    ${n(o===1,`       
        float min01 = min(t0.r, t1.r);
        float minCoordsPacked01 = mix(t0.g, t1.g, float(t1.r < t0.r));

        float min23 = min(t2.r, t3.r);
        float minCoordsPacked23 = mix(t2.g, t3.g, float(t3.r < t2.r));

        float minValue = min(min01, min23);
        float minCoordsPacked = mix(minCoordsPacked01, minCoordsPacked23, float(min23 < min01));

        fragColor = vec4(minValue, minCoordsPacked, 0.0, 0.0);
      `)}

    ${n(o===2,`
        float max01 = max(t0.r, t1.r);
        float maxCoordsPacked01 = mix(t0.g, t1.g, float(t1.r > t0.r));

        float max23 = max(t2.r, t3.r);
        float maxCoordsPacked23 = mix(t2.g, t3.g, float(t3.r > t2.r));

        float maxValue = max(max01, max23);
        float maxCoordsPacked = mix(maxCoordsPacked01, maxCoordsPacked23, float(max23 > max01));

        fragColor = vec4(maxValue, maxCoordsPacked, 0.0, 0.0);
      `)}
  `),s}var c=Object.freeze(Object.defineProperty({__proto__:null,CutFillReductionParameters:o,build:s},Symbol.toStringTag,{value:`Module`}));export{s as n,c as r,o as t};